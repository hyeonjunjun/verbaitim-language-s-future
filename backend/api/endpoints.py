"""
VerbAItim API — Phonetic Pipeline Endpoints
=============================================
/transcribe   — audio file → IPA segments (Allosaurus or Mock)
/health       — liveness probe with model/conversion status

Audio pipeline:
  1. Receive any browser audio (WebM/Opus, MP4, WAV, MP3 …)
  2. Convert → 16kHz mono WAV (what Allosaurus needs)
  3. Run VAD (webrtcvad) to split at silence → timed segments
  4. Run Allosaurus on each segment chunk
  5. Return structured SegmentResult list
"""

from __future__ import annotations

import os
import io
import wave
import struct
import logging
import tempfile
import shutil
from pathlib import Path
from typing import Optional, List

from fastapi import APIRouter, File, UploadFile, HTTPException, Query
from pydantic import BaseModel

log = logging.getLogger("verbaitim")
logging.basicConfig(level=logging.INFO)

# ── Optional dependency flags ──────────────────────────────────────────
_HAS_PYDUB    = False
_HAS_WEBRTCVAD = False
_HAS_ALLOSAURUS = False

try:
    from pydub import AudioSegment
    _HAS_PYDUB = True
    log.info("pydub  ✓")
except ImportError:
    log.warning("pydub not installed — audio conversion unavailable")

try:
    import webrtcvad
    _HAS_WEBRTCVAD = True
    log.info("webrtcvad  ✓")
except ImportError:
    log.warning("webrtcvad not installed — will use equal-length chunking instead")

# ── Recognizer singleton ───────────────────────────────────────────────
_recognizer = None

class MockRecognizer:
    """
    Realistic mock for when Allosaurus/Torch are not installed.
    Returns language-specific sample segments with timestamps.
    """
    SEGMENT_SETS = {
        "que": [
            {"start_time": 0.8,  "end_time": 3.2,  "ipa": "qʰu.t͡ʃu.pa.sa.pa.ni",            "meaning": "I am working (hard).",          "speaker": "SP_01", "confidence": 0.96},
            {"start_time": 4.0,  "end_time": 7.1,  "ipa": "ˈno.qa.qa ˈka.ni",                 "meaning": "I want to go.",                  "speaker": "SP_01", "confidence": 0.93},
            {"start_time": 8.2,  "end_time": 11.5, "ipa": "ˈaj.ˈma.ra ˈri.ma.ni",             "meaning": "I speak Aymara.",                "speaker": "SP_02", "confidence": 0.88},
        ],
        "mri": [
            {"start_time": 1.0,  "end_time": 4.5,  "ipa": "tā.ne.nu.i.ā.raŋ.i",              "meaning": "Tāne of the great heavens.",      "speaker": "SP_01", "confidence": 0.97},
            {"start_time": 5.2,  "end_time": 8.8,  "ipa": "kia.ˈo.ra.ˈta.tou",               "meaning": "Greetings to us all.",            "speaker": "SP_01", "confidence": 0.95},
            {"start_time": 9.5,  "end_time": 13.0, "ipa": "ko.ˈwai.ˈto.ku.ˈi.ŋo.a",          "meaning": "What is your name?",             "speaker": "SP_02", "confidence": 0.91},
        ],
        "lkt": [
            {"start_time": 1.2,  "end_time": 3.8,  "ipa": "haʊ miˈtakuˌjepi",                 "meaning": "Hello, my relatives.",           "speaker": "SP_01", "confidence": 0.98},
            {"start_time": 4.5,  "end_time": 8.2,  "ipa": "tʃʰãˈte waˈʃteja naˈpetʃʰijuˌzape","meaning": "I shake your hands with a good heart.", "speaker": "SP_02", "confidence": 0.92},
            {"start_time": 9.0,  "end_time": 12.4, "ipa": "ˈtokʃa aˈkʰe wãˈtʃʰijãkĩ kte",    "meaning": "I will see you again soon.",     "speaker": "SP_01", "confidence": 0.95},
        ],
        "ipa": [
            {"start_time": 0.5,  "end_time": 3.0,  "ipa": "pʰə.ˈneɪ.tɪk ˈtræn.skrɪp.ʃən",    "meaning": "Phonetic transcription.",        "speaker": "SP_01", "confidence": 0.97},
            {"start_time": 3.8,  "end_time": 7.2,  "ipa": "ˈɪn.tə.ˈnæ.ʃə.nəl ˈfə.ˈnɛ.tɪk",   "meaning": "International Phonetic Alphabet.", "speaker": "SP_01", "confidence": 0.94},
            {"start_time": 8.0,  "end_time": 11.5, "ipa": "ˈlæŋ.ɡwɪdʒ ˌdɒ.kjʊ.mɛn.ˈteɪ.ʃən", "meaning": "Language documentation.",        "speaker": "SP_02", "confidence": 0.91},
        ],
    }

    def recognize(self, file_path: str, language: str) -> dict:
        segs = self.SEGMENT_SETS.get(language, self.SEGMENT_SETS["ipa"])
        return {"ipa": segs[0]["ipa"], "meaning": segs[0]["meaning"], "segments": segs}


def _get_recognizer():
    global _recognizer, _HAS_ALLOSAURUS
    if _recognizer is None:
        try:
            from allosaurus.app import read_recognizer
            _recognizer = read_recognizer("uni2005")
            _HAS_ALLOSAURUS = True
            log.info("Allosaurus uni2005 loaded  ✓")
        except Exception as exc:
            log.warning(f"Allosaurus unavailable ({exc}) — using MockRecognizer")
            _recognizer = MockRecognizer()
    return _recognizer


# ── Audio helpers ──────────────────────────────────────────────────────

def convert_to_wav(src_path: str, dst_path: str) -> None:
    """
    Convert any browser audio (WebM, MP4, OGG, MP3 …) to 16kHz mono WAV.
    Requires pydub (and ffmpeg on PATH).
    """
    audio = AudioSegment.from_file(src_path)
    audio = audio.set_frame_rate(16000).set_channels(1).set_sample_width(2)
    audio.export(dst_path, format="wav")
    log.info(f"Converted {src_path} → {dst_path} ({len(audio)/1000:.1f}s)")


# ── VAD-based segmentation ─────────────────────────────────────────────

def _read_wav_frames(wav_path: str):
    """Return (sample_rate, pcm_bytes) from a 16kHz mono 16-bit WAV."""
    with wave.open(wav_path, "rb") as wf:
        assert wf.getnchannels() == 1, "WAV must be mono"
        assert wf.getsampwidth() == 2, "WAV must be 16-bit"
        rate = wf.getframerate()
        frames = wf.readframes(wf.getnframes())
    return rate, frames


def segment_by_vad(wav_path: str, aggressiveness: int = 2) -> List[dict]:
    """
    Use webrtcvad to detect speech frames and return
    [{start_time, end_time, audio_bytes}, …] tuples.

    aggressiveness: 0 (least) … 3 (most aggressive filtering)
    """
    vad = webrtcvad.Vad(aggressiveness)
    rate, pcm = _read_wav_frames(wav_path)

    # webrtcvad works on 10/20/30 ms frames
    frame_ms  = 30
    frame_bytes = int(rate * frame_ms / 1000) * 2  # 16-bit = 2 bytes / sample

    segments = []
    in_speech = False
    seg_start = 0.0
    seg_pcm   = b""
    offset    = 0

    while offset + frame_bytes <= len(pcm):
        frame = pcm[offset: offset + frame_bytes]
        is_speech = vad.is_speech(frame, rate)
        timestamp = offset / (rate * 2)  # seconds

        if is_speech and not in_speech:
            in_speech  = True
            seg_start  = timestamp
            seg_pcm    = frame
        elif is_speech and in_speech:
            seg_pcm += frame
        elif not is_speech and in_speech:
            # End of a speech segment — only keep if long enough (>200 ms)
            seg_end = timestamp
            if seg_end - seg_start > 0.2:
                segments.append({
                    "start_time": round(seg_start, 3),
                    "end_time":   round(seg_end,   3),
                    "pcm":        seg_pcm,
                    "rate":       rate,
                })
            in_speech = False
            seg_pcm   = b""

        offset += frame_bytes

    # Catch any trailing speech
    if in_speech and seg_pcm:
        seg_end = len(pcm) / (rate * 2)
        segments.append({
            "start_time": round(seg_start, 3),
            "end_time":   round(seg_end,   3),
            "pcm":        seg_pcm,
            "rate":       rate,
        })

    return segments


def segment_by_chunks(wav_path: str, chunk_s: float = 4.0) -> List[dict]:
    """
    Fallback when webrtcvad is not installed.
    Splits audio into equal-length chunks.
    """
    rate, pcm = _read_wav_frames(wav_path)
    chunk_bytes = int(rate * chunk_s) * 2
    total_s     = len(pcm) / (rate * 2)
    chunks = []
    offset = 0
    while offset < len(pcm):
        chunk = pcm[offset: offset + chunk_bytes]
        start = offset / (rate * 2)
        end   = min(start + chunk_s, total_s)
        chunks.append({
            "start_time": round(start, 3),
            "end_time":   round(end,   3),
            "pcm":        chunk,
            "rate":       rate,
        })
        offset += chunk_bytes
    return chunks


def _write_segment_wav(seg: dict, path: str) -> None:
    """Write a VAD segment's PCM bytes to a WAV file."""
    with wave.open(path, "wb") as wf:
        wf.setnchannels(1)
        wf.setsampwidth(2)
        wf.setframerate(seg["rate"])
        wf.writeframes(seg["pcm"])


# ── Allosaurus helpers ─────────────────────────────────────────────────

def _run_allosaurus_on_file(recognizer, wav_path: str, language: str) -> str:
    """
    Allosaurus read_recognizer returns a string of space-separated phonemes.
    Pass emit_frame_state=True isn't in all versions, so we call .recognize().
    """
    result = recognizer.recognize(wav_path, language)
    # Some versions return str directly, some via attribute
    if hasattr(result, "text"):
        return result.text
    return str(result)


def transcribe_with_allosaurus(wav_path: str, language: str) -> List[dict]:
    """
    Full pipeline: VAD segmentation → Allosaurus per segment.
    Returns list of segment dicts compatible with SegmentResult.
    """
    recognizer = _get_recognizer()

    # If mock recognizer, skip the real pipeline
    if isinstance(recognizer, MockRecognizer):
        return recognizer.recognize(wav_path, language).get("segments", [])

    # Real Allosaurus pipeline
    segments_raw = (
        segment_by_vad(wav_path)
        if _HAS_WEBRTCVAD
        else segment_by_chunks(wav_path)
    )

    if not segments_raw:
        log.warning("VAD found no speech segments. Falling back to full-file transcription.")
        ipa = _run_allosaurus_on_file(recognizer, wav_path, language)
        return [{
            "start_time": 0.0,
            "end_time":   0.0,
            "ipa":        ipa,
            "meaning":    "",
            "speaker":    "SP_01",
            "confidence": 0.9,
        }]

    results = []
    for i, seg in enumerate(segments_raw):
        with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as tf:
            seg_path = tf.name
        try:
            _write_segment_wav(seg, seg_path)
            ipa = _run_allosaurus_on_file(recognizer, seg_path, language)
            results.append({
                "start_time": seg["start_time"],
                "end_time":   seg["end_time"],
                "ipa":        ipa.strip(),
                "meaning":    "",           # user fills this in the editor
                "speaker":    f"SP_{(i % 2) + 1:02d}",
                "confidence": 0.88 + min(0.1, i * 0.01),  # placeholder
            })
        except Exception as exc:
            log.error(f"Allosaurus failed on segment {i}: {exc}")
        finally:
            if os.path.exists(seg_path):
                os.unlink(seg_path)

    return results


# ── Router ────────────────────────────────────────────────────────────
router = APIRouter(tags=["phonetics"])


# ── Response Schemas ──────────────────────────────────────────────────

class SegmentResult(BaseModel):
    start_time: float
    end_time:   float
    ipa:        str
    meaning:    str
    speaker:    str
    confidence: float

class TranscriptionResult(BaseModel):
    ipa:      str
    meaning:  str
    language: str
    model:    str = "uni2005"
    segments: List[SegmentResult] = []

class HealthStatus(BaseModel):
    status:      str
    model_loaded: bool
    mode:        str
    conversion:  str   # "pydub+ffmpeg" | "unavailable"
    vad:         str   # "webrtcvad" | "chunked"


# ── /transcribe ───────────────────────────────────────────────────────

@router.post("/transcribe", response_model=TranscriptionResult)
async def transcribe_audio(
    file: UploadFile = File(..., description="Audio file (any browser format)"),
    language: Optional[str] = Query(
        default="ipa",
        description="ISO 639-3 language code or 'ipa' for universal.",
    ),
):
    """
    Accept a browser audio file (WebM, MP4, OGG, WAV …), convert it to
    16kHz mono WAV, run VAD segmentation, and transcribe each segment with
    Allosaurus.  Falls back to MockRecognizer if Allosaurus is not installed.
    Falls back to chunked segmentation if webrtcvad is not installed.
    """
    suffix = Path(file.filename or "audio.webm").suffix or ".webm"
    raw_path = wav_path = None

    try:
        # 1. Save the raw upload
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(await file.read())
            raw_path = tmp.name

        # 2. Convert to 16kHz mono WAV (required by Allosaurus + webrtcvad)
        if _HAS_PYDUB:
            with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmpwav:
                wav_path = tmpwav.name
            convert_to_wav(raw_path, wav_path)
        else:
            # No pydub — hope it's already a compatible WAV
            wav_path = raw_path
            log.warning("pydub not available — skipping format conversion. "
                        "Results may be inaccurate if the file is not already WAV.")

        # 3. Transcribe (VAD + Allosaurus, or Mock)
        seg_dicts = transcribe_with_allosaurus(wav_path, language)

        segments = [SegmentResult(**s) for s in seg_dicts]
        first_ipa = segments[0].ipa if segments else ""

        recognizer = _get_recognizer()
        model_name = "uni2005" if _HAS_ALLOSAURUS else "MockRecognizer (Lite)"

        return TranscriptionResult(
            ipa      = first_ipa,
            meaning  = segments[0].meaning if segments else "",
            language = language,
            model    = model_name,
            segments = segments,
        )

    except Exception as exc:
        log.exception("Transcription failed")
        raise HTTPException(status_code=500, detail=str(exc))

    finally:
        for p in [raw_path, wav_path]:
            if p and p != raw_path and os.path.exists(p):
                os.unlink(p)
        if raw_path and os.path.exists(raw_path):
            os.unlink(raw_path)


# ── /health ───────────────────────────────────────────────────────────

@router.get("/health", response_model=HealthStatus)
async def health():
    """Liveness and capability probe."""
    reco = _get_recognizer()
    loaded = _HAS_ALLOSAURUS and not isinstance(reco, MockRecognizer)
    return HealthStatus(
        status       = "ok",
        model_loaded = loaded,
        mode         = "Full (Allosaurus)" if loaded else "Lite (Mock)",
        conversion   = "pydub+ffmpeg" if _HAS_PYDUB else "unavailable",
        vad          = "webrtcvad" if _HAS_WEBRTCVAD else "chunked",
    )

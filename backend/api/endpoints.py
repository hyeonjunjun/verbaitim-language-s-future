"""
VerbAItim API — Phonetic Pipeline Endpoints
=============================================
/transcribe   — audio file → IPA phoneme string (Allosaurus or Mock)
/health       — lightweight liveness probe
"""

from __future__ import annotations

import os
import tempfile
import logging
from typing import Optional, List

from fastapi import APIRouter, File, UploadFile, HTTPException, Query
from pydantic import BaseModel

# ── Lazy-loaded model singleton / Mock Fallback ────────────────────────
_recognizer = None

class MockRecognizer:
    """Fallback for Lite Mode without Allosaurus/Torch.
    
    Returns multi-segment mock data to simulate real transcription
    of a multi-utterance recording.
    """
    SEGMENT_SETS = {
        "que": [
            {"start_time": 0.8, "end_time": 3.2, "ipa": "qʰu.t͡ʃu.pa.sa.pa.ni", "meaning": "I am working (hard).", "speaker": "SP_01", "confidence": 0.96},
            {"start_time": 4.0, "end_time": 7.1, "ipa": "ˈno.qa.qa ˈka.ni", "meaning": "I want to go.", "speaker": "SP_01", "confidence": 0.93},
            {"start_time": 8.2, "end_time": 11.5, "ipa": "ˈaj.ˈma.ra ˈri.ma.ni", "meaning": "I speak Aymara.", "speaker": "SP_02", "confidence": 0.88},
        ],
        "mri": [
            {"start_time": 1.0, "end_time": 4.5, "ipa": "tā.ne.nu.i.ā.raŋ.i", "meaning": "Tāne of the great heavens.", "speaker": "SP_01", "confidence": 0.97},
            {"start_time": 5.2, "end_time": 8.8, "ipa": "kia.ˈo.ra.ˈta.tou", "meaning": "Greetings to us all.", "speaker": "SP_01", "confidence": 0.95},
            {"start_time": 9.5, "end_time": 13.0, "ipa": "ko.ˈwai.ˈto.ku.ˈi.ŋo.a", "meaning": "What is your name?", "speaker": "SP_02", "confidence": 0.91},
        ],
        "lkt": [
            {"start_time": 1.2, "end_time": 3.8, "ipa": "haʊ miˈtakuˌjepi", "meaning": "Hello, my relatives.", "speaker": "SP_01", "confidence": 0.98},
            {"start_time": 4.5, "end_time": 8.2, "ipa": "tʃʰãˈte waˈʃteja naˈpetʃʰijuˌzape", "meaning": "I shake your hands with a good heart.", "speaker": "SP_02", "confidence": 0.92},
            {"start_time": 9.0, "end_time": 12.4, "ipa": "ˈtokʃa aˈkʰe wãˈtʃʰijãkĩ kte", "meaning": "I will see you again soon.", "speaker": "SP_01", "confidence": 0.95},
            {"start_time": 13.1, "end_time": 15.6, "ipa": "piˈla.ma.ja.je.lo", "meaning": "Thank you.", "speaker": "SP_01", "confidence": 0.99},
        ],
        "ipa": [
            {"start_time": 0.5, "end_time": 3.0, "ipa": "pʰə.ˈneɪ.tɪk ˈtræn.skrɪp.ʃən", "meaning": "Phonetic transcription.", "speaker": "SP_01", "confidence": 0.97},
            {"start_time": 3.8, "end_time": 7.2, "ipa": "ˈɪn.tə.ˈnæ.ʃə.nəl ˈfə.ˈnɛ.tɪk ˈæl.fə.bɛt", "meaning": "International Phonetic Alphabet.", "speaker": "SP_01", "confidence": 0.94},
            {"start_time": 8.0, "end_time": 11.5, "ipa": "ˈlæŋ.ɡwɪdʒ ˌdɒ.kjʊ.mɛn.ˈteɪ.ʃən", "meaning": "Language documentation.", "speaker": "SP_02", "confidence": 0.91},
        ],
    }

    def recognize(self, file_path: str, language: str) -> dict:
        segments = self.SEGMENT_SETS.get(language, self.SEGMENT_SETS["ipa"])
        return {
            "ipa": segments[0]["ipa"],
            "meaning": segments[0]["meaning"],
            "segments": segments,
        }

def _get_recognizer():
    """
    Load Allosaurus if available, else fall back to MockRecognizer.
    """
    global _recognizer
    if _recognizer is None:
        try:
            logging.info("Attempting to load Allosaurus uni2005 model …")
            from allosaurus.app import read_recognizer
            _recognizer = read_recognizer("uni2005")
            logging.info("Allosaurus model loaded ✓")
        except (ImportError, Exception):
            logging.warning("Allosaurus/Torch not found. Initializing MockRecognizer (Lite Mode).")
            _recognizer = MockRecognizer()
    return _recognizer


# ── Router ────────────────────────────────────────────────────────────
router = APIRouter(tags=["phonetics"])


# ── Response Schemas ──────────────────────────────────────────────────

class SegmentResult(BaseModel):
    """A single annotated segment within a recording."""
    start_time: float
    end_time: float
    ipa: str
    meaning: str
    speaker: str
    confidence: float

class TranscriptionResult(BaseModel):
    """Returned by /transcribe."""
    ipa: str
    meaning: str
    language: str
    model: str = "uni2005 (or mock)"
    segments: List[SegmentResult] = []


class HealthStatus(BaseModel):
    """Returned by /health."""
    status: str
    model_loaded: bool
    mode: str


# ── Endpoints ─────────────────────────────────────────────────────────

@router.post("/transcribe", response_model=TranscriptionResult)
async def transcribe_audio(
    file: UploadFile = File(..., description="Audio file (wav, mp3, ogg, flac)"),
    language: Optional[str] = Query(
        default="ipa",
        description="ISO 639-3 language code or 'ipa' for universal."
    ),
):
    """
    Accept an audio file upload and return the IPA phoneme transcription.
    In Lite mode, returns realistic multi-segment mock data.
    """
    # ── Validate MIME loosely ─────────────────────────────────────────
    allowed = {"audio/", "application/octet-stream", "video/"}
    content_type = file.content_type or ""
    if not any(content_type.startswith(a) for a in allowed):
        raise HTTPException(
            status_code=415,
            detail=f"Unsupported media type: {content_type}. "
                   f"Send an audio file (wav, mp3, ogg, flac)."
        )

    # ── Write to a temp file (Allosaurus needs a file path) ───────────
    suffix = os.path.splitext(file.filename or ".wav")[1]
    try:
        with tempfile.NamedTemporaryFile(delete=False, suffix=suffix) as tmp:
            tmp.write(await file.read())
            tmp_path = tmp.name

        recognizer = _get_recognizer()
        result = recognizer.recognize(tmp_path, language)

        # Handle both real Allosaurus (returns str) and Mock (returns dict)
        if isinstance(result, str):
            return TranscriptionResult(
                ipa=result, 
                meaning="Meaning annotation pending.", 
                language=language,
                model="uni2005",
                segments=[],
            )
        
        # Mock recognizer returns dict with segments
        segments = [
            SegmentResult(**seg)
            for seg in result.get("segments", [])
        ]
        
        return TranscriptionResult(
            ipa=result.get("ipa", ""),
            meaning=result.get("meaning", ""),
            language=language,
            model="MockRecognizer (Lite)",
            segments=segments,
        )

    except Exception as e:
        logging.exception("Transcription failed")
        raise HTTPException(status_code=500, detail=str(e))

    finally:
        # Clean up temp file
        if "tmp_path" in locals() and os.path.exists(tmp_path):
            os.unlink(tmp_path)


@router.get("/health", response_model=HealthStatus)
async def health():
    """Lightweight liveness / readiness check."""
    loaded = _recognizer is not None and not isinstance(_recognizer, MockRecognizer)
    mode = "Full" if loaded else "Lite"
    return HealthStatus(
        status="ok",
        model_loaded=loaded,
        mode=mode
    )

"""
VerbAItim API — Phonetic Pipeline Endpoints
=============================================
/transcribe   — audio file → IPA phoneme string (Allosaurus)
/health       — lightweight liveness probe
"""

from __future__ import annotations

import os
import tempfile
import logging
from typing import Optional

from fastapi import APIRouter, File, UploadFile, HTTPException, Query
from pydantic import BaseModel

# ── Lazy-loaded model singleton / Mock Fallback ────────────────────────
_recognizer = None

class MockRecognizer:
    """Fallback for Lite Mode without Allosaurus/Torch."""
    SAMPLES = {
        "que": {"ipa": "[qʰu.t͡ʃu.pa.sa.pa.ni]", "meaning": "I am working (hard)"},
        "mri": {"ipa": "[tā.ne.nu.i.ā.raŋ.i]", "meaning": "Tāne of the great heavens"},
        "ipa": {"ipa": "[pʰə.neɪ.tɪk.træn.skrɪp.ʃən]", "meaning": "Phonetic transcription"}
    }

    def recognize(self, file_path: str, language: str) -> dict:
        # Default to 'ipa' if lang not in samples
        data = self.SAMPLES.get(language, self.SAMPLES["ipa"])
        return data

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
class TranscriptionResult(BaseModel):
    """Returned by /transcribe."""
    ipa: str
    meaning: str
    language: str
    model: str = "uni2005 (or mock)"


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
    Accept an audio file upload and return the IPA phoneme transcription
    and its English meaning.
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
            # If real Allosaurus is used, we still need a default meaning for now
            return TranscriptionResult(
                ipa=result, 
                meaning="Meaning annotation pending.", 
                language=language,
                model="uni2005"
            )
        
        return TranscriptionResult(
            ipa=result["ipa"], 
            meaning=result["meaning"], 
            language=language,
            model="MockRecognizer (Lite)"
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

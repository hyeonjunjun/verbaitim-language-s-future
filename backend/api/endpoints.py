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

# ── Lazy-loaded model singleton ───────────────────────────────────────
_recognizer = None

def _get_recognizer():
    """
    Load the Allosaurus recognizer on first request so the server
    starts quickly and the ~200 MB model is only loaded once.
    """
    global _recognizer
    if _recognizer is None:
        logging.info("Loading Allosaurus uni2005 model …")
        from allosaurus.app import read_recognizer          # heavy import
        _recognizer = read_recognizer("uni2005")
        logging.info("Allosaurus model loaded ✓")
    return _recognizer


# ── Router ────────────────────────────────────────────────────────────
router = APIRouter(tags=["phonetics"])


# ── Response Schemas ──────────────────────────────────────────────────
class TranscriptionResult(BaseModel):
    """Returned by /transcribe."""
    ipa: str
    language: str
    model: str = "uni2005"


class HealthStatus(BaseModel):
    """Returned by /health."""
    status: str
    model_loaded: bool


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
    produced by the Allosaurus universal phone recognizer.
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
        ipa_result = recognizer.recognize(tmp_path, language)

        return TranscriptionResult(ipa=ipa_result, language=language)

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
    return HealthStatus(
        status="ok",
        model_loaded=_recognizer is not None,
    )

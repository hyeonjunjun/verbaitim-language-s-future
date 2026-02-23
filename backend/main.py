"""
VerbAItim Backend — FastAPI Entry Point
========================================
Serves the Phonetic Pipeline: audio → IPA → orthography suggestions.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

from api.endpoints import router as api_router

# ── App Instance ──────────────────────────────────────────────────────
app = FastAPI(
    title="VerbAItim API",
    description="Phonetic transcription and language preservation backend.",
    version="0.1.0",
)

# ── CORS ──────────────────────────────────────────────────────────────
# Allow the Vite dev server and any deployed frontend to reach the API.
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:5173",   # Vite dev
        "http://localhost:8080",   # alt dev
        "http://localhost:3000",   # alt dev
        "*",                       # TODO: lock down in production
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# ── Routes ────────────────────────────────────────────────────────────
app.include_router(api_router, prefix="/api")


# ── Health Check ──────────────────────────────────────────────────────
@app.get("/")
async def root():
    return {
        "service": "VerbAItim API",
        "version": "0.1.0",
        "status": "operational",
    }

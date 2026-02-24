/**
 * VerbAItim API Client
 * ====================
 * Thin wrapper around the FastAPI backend endpoints.
 */

const API_BASE = "http://localhost:8001/api";

// ── Response Types ───────────────────────────────────────────────────

export interface SegmentResult {
    start_time: number;
    end_time: number;
    ipa: string;
    meaning: string;
    speaker: string;
    confidence: number;
}

export interface TranscriptionResult {
    ipa: string;
    meaning: string;
    language: string;
    model: string;
    segments?: SegmentResult[];
}

export interface HealthStatus {
    status: string;
    model_loaded: boolean;
    mode: string;
}

// ── API Functions ────────────────────────────────────────────────────

/**
 * Upload an audio file for IPA transcription.
 */
export async function transcribeAudio(
    file: File,
    language: string = "ipa"
): Promise<TranscriptionResult> {
    const formData = new FormData();
    formData.append("file", file);

    const url = `${API_BASE}/transcribe?language=${encodeURIComponent(language)}`;

    const res = await fetch(url, {
        method: "POST",
        body: formData,
    });

    if (!res.ok) {
        const error = await res.json().catch(() => ({ detail: res.statusText }));
        throw new Error(error.detail || `Transcription failed (${res.status})`);
    }

    return res.json();
}

/**
 * Check backend health and model status.
 */
export async function checkHealth(): Promise<HealthStatus> {
    const res = await fetch(`${API_BASE}/health`);

    if (!res.ok) {
        throw new Error(`Health check failed (${res.status})`);
    }

    return res.json();
}

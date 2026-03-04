import type { StoredSession, Segment } from "@/hooks/useAudioStore";

// ── Export Formats ──────────────────────────────────────────────────

export type ExportFormat = "json" | "csv" | "elan";

/**
 * Export a transcription session in the specified format.
 * Downloads the file directly in the browser.
 */
export function exportSession(session: StoredSession, format: ExportFormat = "json") {
    const baseName = session.fileName.replace(/\.[^.]+$/, "");

    switch (format) {
        case "json":
            downloadBlob(
                new Blob([JSON.stringify(session, null, 2)], { type: "application/json" }),
                `${baseName}_session.json`
            );
            break;
        case "csv":
            downloadBlob(
                new Blob([sessionToCSV(session)], { type: "text/csv;charset=utf-8;" }),
                `${baseName}_session.csv`
            );
            break;
        case "elan":
            downloadBlob(
                new Blob([sessionToELAN(session)], { type: "application/xml;charset=utf-8;" }),
                `${baseName}_session.eaf`
            );
            break;
    }
}

// ── CSV ─────────────────────────────────────────────────────────────

function escapeCSV(value: string): string {
    if (value.includes(",") || value.includes('"') || value.includes("\n")) {
        return `"${value.replace(/"/g, '""')}"`;
    }
    return value;
}

function sessionToCSV(session: StoredSession): string {
    const headers = [
        "Segment ID",
        "Start Time (s)",
        "End Time (s)",
        "Display Time",
        "Speaker",
        "IPA",
        "Meaning",
        "Confidence (%)",
        "Cultural Context",
    ];

    const rows = session.segments.map((seg) => [
        seg.id,
        seg.startTime.toFixed(2),
        seg.endTime.toFixed(2),
        seg.time,
        escapeCSV(seg.speaker),
        escapeCSV(seg.ipa),
        escapeCSV(seg.meaning),
        seg.confidence.toString(),
        escapeCSV(seg.culturalContext || ""),
    ]);

    // Metadata header
    const meta = [
        `# Session: ${session.fileName}`,
        `# Language: ${session.language}`,
        `# Model: ${session.model}`,
        `# Date: ${session.createdAt}`,
        `# Duration: ${session.durationSeconds.toFixed(1)}s`,
        `# Avg Confidence: ${session.avgConfidence}%`,
        "",
    ];

    return [
        ...meta,
        headers.join(","),
        ...rows.map((row) => row.join(",")),
    ].join("\n");
}

// ── ELAN XML (.eaf) ────────────────────────────────────────────────
// Produces a minimal but valid ELAN Annotation Format file.
// Three tiers: IPA, Meaning, Cultural Context.

function msFromSeconds(seconds: number): number {
    return Math.round(seconds * 1000);
}

function xmlEscape(str: string): string {
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&apos;");
}

function sessionToELAN(session: StoredSession): string {
    const date = new Date(session.createdAt).toISOString();

    // Build time slots
    const timeSlots: string[] = [];
    let tsId = 1;
    const segTimeSlotMap: Array<{ tsStart: string; tsEnd: string }> = [];

    for (const seg of session.segments) {
        const startId = `ts${tsId++}`;
        const endId = `ts${tsId++}`;
        timeSlots.push(
            `      <TIME_SLOT TIME_SLOT_ID="${startId}" TIME_VALUE="${msFromSeconds(seg.startTime)}"/>`
        );
        timeSlots.push(
            `      <TIME_SLOT TIME_SLOT_ID="${endId}" TIME_VALUE="${msFromSeconds(seg.endTime)}"/>`
        );
        segTimeSlotMap.push({ tsStart: startId, tsEnd: endId });
    }

    // Build IPA tier annotations
    const ipaTier = session.segments.map((seg, i) => {
        const { tsStart, tsEnd } = segTimeSlotMap[i];
        return `        <ANNOTATION>
          <ALIGNABLE_ANNOTATION ANNOTATION_ID="a${i * 3 + 1}" TIME_SLOT_REF1="${tsStart}" TIME_SLOT_REF2="${tsEnd}">
            <ANNOTATION_VALUE>${xmlEscape(seg.ipa)}</ANNOTATION_VALUE>
          </ALIGNABLE_ANNOTATION>
        </ANNOTATION>`;
    });

    // Build Meaning tier annotations
    const meaningTier = session.segments.map((seg, i) => {
        const { tsStart, tsEnd } = segTimeSlotMap[i];
        return `        <ANNOTATION>
          <ALIGNABLE_ANNOTATION ANNOTATION_ID="a${i * 3 + 2}" TIME_SLOT_REF1="${tsStart}" TIME_SLOT_REF2="${tsEnd}">
            <ANNOTATION_VALUE>${xmlEscape(seg.meaning)}</ANNOTATION_VALUE>
          </ALIGNABLE_ANNOTATION>
        </ANNOTATION>`;
    });

    // Build Cultural Context tier annotations (only non-empty)
    const contextTier = session.segments
        .map((seg, i) => {
            if (!seg.culturalContext) return null;
            const { tsStart, tsEnd } = segTimeSlotMap[i];
            return `        <ANNOTATION>
          <ALIGNABLE_ANNOTATION ANNOTATION_ID="a${i * 3 + 3}" TIME_SLOT_REF1="${tsStart}" TIME_SLOT_REF2="${tsEnd}">
            <ANNOTATION_VALUE>${xmlEscape(seg.culturalContext)}</ANNOTATION_VALUE>
          </ALIGNABLE_ANNOTATION>
        </ANNOTATION>`;
        })
        .filter(Boolean);

    return `<?xml version="1.0" encoding="UTF-8"?>
<ANNOTATION_DOCUMENT AUTHOR="VerbAItim" DATE="${date}" FORMAT="3.0" VERSION="3.0"
    xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
    xsi:noNamespaceSchemaLocation="http://www.mpi.nl/tools/elan/EAFv3.0.xsd">
  <HEADER MEDIA_FILE="" TIME_UNITS="milliseconds">
    <PROPERTY NAME="URN">urn:nl-mpi-tools-elan-eaf:${session.id}</PROPERTY>
    <PROPERTY NAME="lastUsedAnnotationId">${session.segments.length * 3}</PROPERTY>
  </HEADER>
  <TIME_ORDER>
${timeSlots.join("\n")}
  </TIME_ORDER>
  <TIER LINGUISTIC_TYPE_REF="default-lt" TIER_ID="IPA" PARTICIPANT="${xmlEscape(session.language)}">
${ipaTier.join("\n")}
  </TIER>
  <TIER LINGUISTIC_TYPE_REF="default-lt" TIER_ID="Meaning" PARTICIPANT="${xmlEscape(session.language)}">
${meaningTier.join("\n")}
  </TIER>
${contextTier.length > 0 ? `  <TIER LINGUISTIC_TYPE_REF="default-lt" TIER_ID="Cultural Context" PARTICIPANT="${xmlEscape(session.language)}">
${contextTier.join("\n")}
  </TIER>` : ""}
  <LINGUISTIC_TYPE GRAPHIC_REFERENCES="false" LINGUISTIC_TYPE_ID="default-lt" TIME_ALIGNABLE="true"/>
</ANNOTATION_DOCUMENT>`;
}

// ── Helpers ─────────────────────────────────────────────────────────

function downloadBlob(blob: Blob, filename: string) {
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    a.click();
    URL.revokeObjectURL(url);
}

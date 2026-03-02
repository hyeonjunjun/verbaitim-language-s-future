/**
 * VerbAItim — Linguistic Dataset Library
 * =======================================
 * Provides access to four major open linguistic datasets:
 *
 *  1. Swadesh 207  — embedded core vocabulary list (no network required)
 *  2. PHOIBLE      — phoneme inventories via GitHub raw CSV
 *  3. ASJP         — word lists via CLLD REST API
 *  4. Glottolog    — language metadata / endangerment status
 */

// ─────────────────────────────────────────────────────────────────────
// 1. SWADESH 207 LIST (embedded — public domain)
// ─────────────────────────────────────────────────────────────────────

export interface SwadeshItem {
    id: number;
    gloss: string;          // English concept label
    category: string;       // Semantic domain
    notes?: string;         // Usage hint for elicitor
}

export const SWADESH_207: SwadeshItem[] = [
    // Pronouns
    { id: 1, gloss: "I", category: "Pronouns" },
    { id: 2, gloss: "you (singular)", category: "Pronouns" },
    { id: 3, gloss: "he", category: "Pronouns" },
    { id: 4, gloss: "we", category: "Pronouns" },
    { id: 5, gloss: "you (plural)", category: "Pronouns" },
    { id: 6, gloss: "they", category: "Pronouns" },
    { id: 7, gloss: "this", category: "Demonstratives" },
    { id: 8, gloss: "that", category: "Demonstratives" },
    { id: 9, gloss: "here", category: "Demonstratives" },
    { id: 10, gloss: "there", category: "Demonstratives" },
    { id: 11, gloss: "who", category: "Interrogatives" },
    { id: 12, gloss: "what", category: "Interrogatives" },
    { id: 13, gloss: "where", category: "Interrogatives" },
    { id: 14, gloss: "when", category: "Interrogatives" },
    { id: 15, gloss: "how", category: "Interrogatives" },
    // Quantifiers
    { id: 16, gloss: "not", category: "Quantifiers" },
    { id: 17, gloss: "all", category: "Quantifiers" },
    { id: 18, gloss: "many", category: "Quantifiers" },
    { id: 19, gloss: "some", category: "Quantifiers" },
    { id: 20, gloss: "few", category: "Quantifiers" },
    { id: 21, gloss: "other", category: "Quantifiers" },
    { id: 22, gloss: "one", category: "Numbers" },
    { id: 23, gloss: "two", category: "Numbers" },
    { id: 24, gloss: "three", category: "Numbers" },
    { id: 25, gloss: "four", category: "Numbers" },
    { id: 26, gloss: "five", category: "Numbers" },
    // Adjectives
    { id: 27, gloss: "big", category: "Size / Shape" },
    { id: 28, gloss: "long", category: "Size / Shape" },
    { id: 29, gloss: "wide", category: "Size / Shape" },
    { id: 30, gloss: "thick", category: "Size / Shape" },
    { id: 31, gloss: "heavy", category: "Size / Shape" },
    { id: 32, gloss: "small", category: "Size / Shape" },
    { id: 33, gloss: "short", category: "Size / Shape" },
    { id: 34, gloss: "narrow", category: "Size / Shape" },
    { id: 35, gloss: "thin", category: "Size / Shape" },
    { id: 36, gloss: "woman", category: "People" },
    { id: 37, gloss: "man", category: "People" },
    { id: 38, gloss: "person", category: "People" },
    { id: 39, gloss: "child", category: "People" },
    { id: 40, gloss: "wife", category: "Kinship" },
    { id: 41, gloss: "husband", category: "Kinship" },
    { id: 42, gloss: "mother", category: "Kinship" },
    { id: 43, gloss: "father", category: "Kinship" },
    // Animals
    { id: 44, gloss: "animal", category: "Animals" },
    { id: 45, gloss: "fish", category: "Animals" },
    { id: 46, gloss: "bird", category: "Animals" },
    { id: 47, gloss: "dog", category: "Animals" },
    { id: 48, gloss: "louse", category: "Animals" },
    { id: 49, gloss: "snake", category: "Animals" },
    { id: 50, gloss: "worm", category: "Animals" },
    // Plants
    { id: 51, gloss: "tree", category: "Plants" },
    { id: 52, gloss: "forest", category: "Plants" },
    { id: 53, gloss: "stick", category: "Plants" },
    { id: 54, gloss: "fruit", category: "Plants" },
    { id: 55, gloss: "seed", category: "Plants" },
    { id: 56, gloss: "leaf", category: "Plants" },
    { id: 57, gloss: "root", category: "Plants" },
    { id: 58, gloss: "bark", category: "Plants" },
    { id: 59, gloss: "flower", category: "Plants" },
    { id: 60, gloss: "grass", category: "Plants" },
    { id: 61, gloss: "rope", category: "Plants" },
    // Body parts
    { id: 62, gloss: "skin", category: "Body" },
    { id: 63, gloss: "meat", category: "Body" },
    { id: 64, gloss: "blood", category: "Body" },
    { id: 65, gloss: "bone", category: "Body" },
    { id: 66, gloss: "grease / fat", category: "Body" },
    { id: 67, gloss: "egg", category: "Body" },
    { id: 68, gloss: "horn", category: "Body" },
    { id: 69, gloss: "tail", category: "Body" },
    { id: 70, gloss: "feather", category: "Body" },
    { id: 71, gloss: "hair", category: "Body" },
    { id: 72, gloss: "head", category: "Body" },
    { id: 73, gloss: "ear", category: "Body" },
    { id: 74, gloss: "eye", category: "Body" },
    { id: 75, gloss: "nose", category: "Body" },
    { id: 76, gloss: "mouth", category: "Body" },
    { id: 77, gloss: "tooth", category: "Body" },
    { id: 78, gloss: "tongue", category: "Body" },
    { id: 79, gloss: "fingernail", category: "Body" },
    { id: 80, gloss: "foot", category: "Body" },
    { id: 81, gloss: "leg", category: "Body" },
    { id: 82, gloss: "knee", category: "Body" },
    { id: 83, gloss: "hand", category: "Body" },
    { id: 84, gloss: "wing", category: "Body" },
    { id: 85, gloss: "belly", category: "Body" },
    { id: 86, gloss: "guts", category: "Body" },
    { id: 87, gloss: "neck", category: "Body" },
    { id: 88, gloss: "back", category: "Body" },
    { id: 89, gloss: "breast", category: "Body" },
    { id: 90, gloss: "heart", category: "Body" },
    { id: 91, gloss: "liver", category: "Body" },
    // Verbs — bodily
    { id: 92, gloss: "to drink", category: "Verbs: Body" },
    { id: 93, gloss: "to eat", category: "Verbs: Body" },
    { id: 94, gloss: "to bite", category: "Verbs: Body" },
    { id: 95, gloss: "to suck", category: "Verbs: Body" },
    { id: 96, gloss: "to spit", category: "Verbs: Body" },
    { id: 97, gloss: "to vomit", category: "Verbs: Body" },
    { id: 98, gloss: "to blow", category: "Verbs: Body" },
    { id: 99, gloss: "to breathe", category: "Verbs: Body" },
    { id: 100, gloss: "to laugh", category: "Verbs: Body" },
    { id: 101, gloss: "to see", category: "Verbs: Perception" },
    { id: 102, gloss: "to hear", category: "Verbs: Perception" },
    { id: 103, gloss: "to know", category: "Verbs: Cognition" },
    { id: 104, gloss: "to think", category: "Verbs: Cognition" },
    { id: 105, gloss: "to smell", category: "Verbs: Perception" },
    { id: 106, gloss: "to fear", category: "Verbs: Cognition" },
    { id: 107, gloss: "to sleep", category: "Verbs: Body" },
    { id: 108, gloss: "to live", category: "Verbs: Existence" },
    { id: 109, gloss: "to die", category: "Verbs: Existence" },
    { id: 110, gloss: "to kill", category: "Verbs: Action" },
    { id: 111, gloss: "to fight", category: "Verbs: Action" },
    { id: 112, gloss: "to hunt", category: "Verbs: Action" },
    { id: 113, gloss: "to hit", category: "Verbs: Action" },
    { id: 114, gloss: "to cut", category: "Verbs: Action" },
    { id: 115, gloss: "to split", category: "Verbs: Action" },
    { id: 116, gloss: "to stab", category: "Verbs: Action" },
    { id: 117, gloss: "to scratch", category: "Verbs: Action" },
    { id: 118, gloss: "to dig", category: "Verbs: Action" },
    { id: 119, gloss: "to swim", category: "Verbs: Motion" },
    { id: 120, gloss: "to fly", category: "Verbs: Motion" },
    { id: 121, gloss: "to walk", category: "Verbs: Motion" },
    { id: 122, gloss: "to come", category: "Verbs: Motion" },
    { id: 123, gloss: "to lie (down)", category: "Verbs: Posture" },
    { id: 124, gloss: "to sit", category: "Verbs: Posture" },
    { id: 125, gloss: "to stand", category: "Verbs: Posture" },
    { id: 126, gloss: "to turn", category: "Verbs: Motion" },
    { id: 127, gloss: "to fall", category: "Verbs: Motion" },
    { id: 128, gloss: "to give", category: "Verbs: Transfer" },
    { id: 129, gloss: "to hold", category: "Verbs: Action" },
    { id: 130, gloss: "to squeeze", category: "Verbs: Action" },
    { id: 131, gloss: "to rub", category: "Verbs: Action" },
    { id: 132, gloss: "to wash", category: "Verbs: Action" },
    { id: 133, gloss: "to wipe", category: "Verbs: Action" },
    { id: 134, gloss: "to pull", category: "Verbs: Action" },
    { id: 135, gloss: "to push", category: "Verbs: Action" },
    { id: 136, gloss: "to throw", category: "Verbs: Action" },
    { id: 137, gloss: "to tie", category: "Verbs: Action" },
    { id: 138, gloss: "to sew", category: "Verbs: Action" },
    { id: 139, gloss: "to count", category: "Verbs: Cognition" },
    { id: 140, gloss: "to say", category: "Verbs: Communication" },
    { id: 141, gloss: "to sing", category: "Verbs: Communication" },
    { id: 142, gloss: "to play", category: "Verbs: Activity" },
    { id: 143, gloss: "to float", category: "Verbs: Motion" },
    { id: 144, gloss: "to flow", category: "Verbs: Motion" },
    { id: 145, gloss: "to freeze", category: "Verbs: State" },
    { id: 146, gloss: "to swell", category: "Verbs: State" },
    // Nature
    { id: 147, gloss: "sun", category: "Nature" },
    { id: 148, gloss: "moon", category: "Nature" },
    { id: 149, gloss: "star", category: "Nature" },
    { id: 150, gloss: "water", category: "Nature" },
    { id: 151, gloss: "rain", category: "Nature" },
    { id: 152, gloss: "river", category: "Nature" },
    { id: 153, gloss: "lake", category: "Nature" },
    { id: 154, gloss: "sea", category: "Nature" },
    { id: 155, gloss: "salt", category: "Nature" },
    { id: 156, gloss: "stone", category: "Nature" },
    { id: 157, gloss: "sand", category: "Nature" },
    { id: 158, gloss: "dust", category: "Nature" },
    { id: 159, gloss: "earth", category: "Nature" },
    { id: 160, gloss: "cloud", category: "Nature" },
    { id: 161, gloss: "fog", category: "Nature" },
    { id: 162, gloss: "sky", category: "Nature" },
    { id: 163, gloss: "wind", category: "Nature" },
    { id: 164, gloss: "snow", category: "Nature" },
    { id: 165, gloss: "ice", category: "Nature" },
    { id: 166, gloss: "smoke", category: "Nature" },
    { id: 167, gloss: "fire", category: "Nature" },
    { id: 168, gloss: "ash", category: "Nature" },
    { id: 169, gloss: "to burn", category: "Verbs: State" },
    { id: 170, gloss: "road / path", category: "Nature" },
    { id: 171, gloss: "mountain", category: "Nature" },
    // Colours & qualities
    { id: 172, gloss: "red", category: "Colour" },
    { id: 173, gloss: "green", category: "Colour" },
    { id: 174, gloss: "yellow", category: "Colour" },
    { id: 175, gloss: "white", category: "Colour" },
    { id: 176, gloss: "black", category: "Colour" },
    { id: 177, gloss: "night", category: "Time" },
    { id: 178, gloss: "day", category: "Time" },
    { id: 179, gloss: "year", category: "Time" },
    { id: 180, gloss: "warm", category: "Properties" },
    { id: 181, gloss: "cold", category: "Properties" },
    { id: 182, gloss: "full", category: "Properties" },
    { id: 183, gloss: "new", category: "Properties" },
    { id: 184, gloss: "old", category: "Properties" },
    { id: 185, gloss: "good", category: "Properties" },
    { id: 186, gloss: "bad", category: "Properties" },
    { id: 187, gloss: "rotten", category: "Properties" },
    { id: 188, gloss: "dirty", category: "Properties" },
    { id: 189, gloss: "straight", category: "Properties" },
    { id: 190, gloss: "round", category: "Properties" },
    { id: 191, gloss: "sharp", category: "Properties" },
    { id: 192, gloss: "dull", category: "Properties" },
    { id: 193, gloss: "smooth", category: "Properties" },
    { id: 194, gloss: "wet", category: "Properties" },
    { id: 195, gloss: "dry", category: "Properties" },
    { id: 196, gloss: "correct", category: "Properties" },
    { id: 197, gloss: "near", category: "Properties" },
    { id: 198, gloss: "far", category: "Properties" },
    { id: 199, gloss: "right", category: "Properties" },
    { id: 200, gloss: "left", category: "Properties" },
    // Function words
    { id: 201, gloss: "at", category: "Function Words" },
    { id: 202, gloss: "in", category: "Function Words" },
    { id: 203, gloss: "with", category: "Function Words" },
    { id: 204, gloss: "and", category: "Function Words" },
    { id: 205, gloss: "if", category: "Function Words" },
    { id: 206, gloss: "because", category: "Function Words" },
    { id: 207, gloss: "name", category: "Miscellaneous" },
];

export const SWADESH_CATEGORIES = [
    ...new Set(SWADESH_207.map((w) => w.category)),
];

// ─────────────────────────────────────────────────────────────────────
// 2. PHOIBLE — phoneme inventories
//    Source: https://phoible.org (CC BY 4.0)
//    We fetch from the GitHub raw CSV and parse a subset client-side.
// ─────────────────────────────────────────────────────────────────────

export interface PhoiblePhoneme {
    phoneme: string;      // IPA symbol
    class: string;        // "consonant" | "vowel" | "tone"
}

export interface PhoibleInventory {
    languageCode: string;
    languageName: string;
    phonemes: PhoiblePhoneme[];
    source: string;       // PHOIBLE contributor code (UPSID, SAPHON, etc.)
}

const PHOIBLE_CACHE = new Map<string, PhoibleInventory | null>();

/**
 * Fetch phoneme inventory for a given Glottolog/ISO 639-3 code.
 * Returns null if not found or network is unavailable.
 */
export async function fetchPhoibleInventory(
    isoCode: string
): Promise<PhoibleInventory | null> {
    const key = isoCode.toLowerCase();
    if (PHOIBLE_CACHE.has(key)) return PHOIBLE_CACHE.get(key)!;

    try {
        // PHOIBLE CLLD API endpoint
        const url = `https://phoible.org/languages/${key}.json`;
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) throw new Error(`PHOIBLE: ${res.status}`);
        const json = await res.json();

        // Parse PHOIBLE JSON response format
        const inventory: PhoibleInventory = {
            languageCode: key,
            languageName: json.properties?.name ?? key.toUpperCase(),
            phonemes: (json.properties?.Segments ?? []).map((seg: string) => ({
                phoneme: seg,
                class: isVowel(seg) ? "vowel" : "consonant",
            })),
            source: "PHOIBLE",
        };

        PHOIBLE_CACHE.set(key, inventory);
        return inventory;
    } catch {
        PHOIBLE_CACHE.set(key, null);
        return null;
    }
}

function isVowel(ipa: string): boolean {
    const vowelBase = /[aeiouæøœɐɑɒɓɔɕɖɘɛəɜɝɞɟɠɡɢɣɤɥɦɧɨɩɪɫɬɭɮɯɰɱɲɳɴɵɶɷɸɹɺɻɼɽɾɿʀʁʂʃʄʅʆʇʈʉʊʋʌʍʎʏʐʑʒʓʔʕʖʗʘʙʚʛʜʝʞʟʠʡʢʣ]/;
    return vowelBase.test(ipa.charAt(0));
}

// ─────────────────────────────────────────────────────────────────────
// 3. ASJP — Automated Similarity Judgment Program word lists
//    Source: https://asjp.clld.org (CC BY 4.0)
//    REST API: https://asjp.clld.org/languages/{id}
// ─────────────────────────────────────────────────────────────────────

export interface AsjpWordList {
    languageCode: string;
    languageName: string;
    family: string;
    words: Array<{
        meaning: string;   // Swadesh concept gloss
        form: string;      // ASJP romanised transcription
    }>;
}

const ASJP_CACHE = new Map<string, AsjpWordList | null>();

/**
 * Fetch ASJP word list for a language (by ISO 639-3 code).
 * ASJP language IDs are uppercased ISO codes or custom identifiers.
 */
export async function fetchAsjpWordList(
    isoCode: string
): Promise<AsjpWordList | null> {
    const key = isoCode.toUpperCase();
    if (ASJP_CACHE.has(key)) return ASJP_CACHE.get(key)!;

    try {
        const url = `https://asjp.clld.org/languages/${key}`;
        const res = await fetch(url, {
            headers: { Accept: "application/json" },
            signal: AbortSignal.timeout(8000),
        });
        if (!res.ok) throw new Error(`ASJP: ${res.status}`);
        const json = await res.json();

        const wordList: AsjpWordList = {
            languageCode: isoCode.toLowerCase(),
            languageName: json.properties?.name ?? key,
            family: json.properties?.classificationString ?? "Unknown",
            words: (json.properties?.synonyms ?? []).map((s: { meaning: string; form: string }) => ({
                meaning: s.meaning,
                form: s.form,
            })),
        };

        ASJP_CACHE.set(key, wordList);
        return wordList;
    } catch {
        ASJP_CACHE.set(key, null);
        return null;
    }
}

// ─────────────────────────────────────────────────────────────────────
// 4. GLOTTOLOG — language metadata + endangerment levels
//    Source: https://glottolog.org (CC BY 4.0)
//    API docs: https://glottolog.org/meta/downloads
// ─────────────────────────────────────────────────────────────────────

export type EndangermentLevel =
    | "not endangered"
    | "threatened"
    | "shifting"
    | "moribund"
    | "nearly extinct"
    | "extinct"
    | "unknown";

export interface GlottologLanguage {
    glottocode: string;
    name: string;
    isoCode: string;
    family: string;
    macroarea: string;           // "Africa" | "Eurasia" | "Papunesia" | etc.
    endangerment: EndangermentLevel;
    latitude?: number;
    longitude?: number;
    urls: { glottolog: string };
}

const GLOTTOLOG_CACHE = new Map<string, GlottologLanguage | null>();

/**
 * Fetch language metadata from Glottolog by ISO 639-3 code.
 */
export async function fetchGlottologInfo(
    isoCode: string
): Promise<GlottologLanguage | null> {
    const key = isoCode.toLowerCase();
    if (GLOTTOLOG_CACHE.has(key)) return GLOTTOLOG_CACHE.get(key)!;

    try {
        // Glottolog CLLD API
        const url = `https://glottolog.org/resource/languoid/id/${key}.json`;
        const res = await fetch(url, { signal: AbortSignal.timeout(8000) });
        if (!res.ok) throw new Error(`Glottolog: ${res.status}`);
        const json = await res.json();

        const lang: GlottologLanguage = {
            glottocode: json.id ?? "",
            name: json.properties?.Name ?? key,
            isoCode: key,
            family: json.properties?.ClassificationName ?? "Isolate",
            macroarea: json.properties?.Macroarea ?? "Unknown",
            endangerment: (json.properties?.endangerment?.status?.toLowerCase() ?? "unknown") as EndangermentLevel,
            latitude: json.properties?.Latitude,
            longitude: json.properties?.Longitude,
            urls: { glottolog: `https://glottolog.org/resource/languoid/id/${json.id}` },
        };

        GLOTTOLOG_CACHE.set(key, lang);
        return lang;
    } catch {
        GLOTTOLOG_CACHE.set(key, null);
        return null;
    }
}

// ─────────────────────────────────────────────────────────────────────
// Endangerment badge helpers
// ─────────────────────────────────────────────────────────────────────

export const ENDANGERMENT_COLOURS: Record<EndangermentLevel, string> = {
    "not endangered": "bg-sage/15 text-sage     border-sage/20",
    "threatened": "bg-ochre/15 text-ochre   border-ochre/20",
    "shifting": "bg-ochre/20 text-ochre   border-ochre/30",
    "moribund": "bg-signal/15 text-signal border-signal/20",
    "nearly extinct": "bg-destructive/15 text-destructive border-destructive/20",
    "extinct": "bg-muted text-muted-foreground border-border",
    "unknown": "bg-muted/50 text-muted-foreground/60 border-border/50",
};

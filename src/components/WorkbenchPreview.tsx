import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import { Play, Pause, FastForward, Rewind, Settings, Layers, Mic, Volume2, Save } from "lucide-react";

// Linguistically accurate IPA transcription rows
const SEGMENT_ROWS = [
    { time: "0:04", speaker: "EF_01", transcription: "Hau, mitákuyepi", ipa: "haʊ̃ miˈtakujepi", confidence: 0.97, lang: "Lakota" },
    { time: "0:12", speaker: "EF_01", transcription: "Čhaŋtéčhila", ipa: "tʃʰãˈtɛtʃʰila", confidence: 0.91, lang: "Lakota" },
    { time: "0:24", speaker: "EF_02", transcription: "Tēnā koe", ipa: "ˈtɛnaː ˈkɔ.ɛ", confidence: 0.96, lang: "Māori" },
    { time: "0:35", speaker: "EF_02", transcription: "He maunga teitei", ipa: "hɛ ˈmaʊŋa ˈtɛi.tɛi", confidence: 0.88, lang: "Māori" },
    { time: "0:51", speaker: "EF_03", transcription: "Yá'át'ééh", ipa: "jaʔáːtʼɛːh", confidence: 0.93, lang: "Navajo" },
    { time: "1:02", speaker: "EF_03", transcription: "Shí éí Dinék'ehji", ipa: "ʃiʔ ʔɛʔɪ tɪˈnɛʔkʰɪdʒɪ", confidence: 0.84, lang: "Navajo" },
    { time: "1:18", speaker: "EF_04", transcription: "Aloha nō", ipa: "aˈlo.ha noː", confidence: 0.99, lang: "Hawaiian" },
];

const confColor = (c: number) =>
    c >= 0.92 ? "#34d399" : c >= 0.85 ? "#fbbf24" : "#f87171";

const WorkbenchPreview = () => {
    return (
        <Section className="bg-background">
            <Container>
                <div className="mb-16 max-w-2xl">
                    <Headline as="h2" className="mb-6">
                        Precision tooling for <br />
                        <span className="text-muted-foreground">phonological analysis</span>.
                    </Headline>
                    <Text variant="lead">
                        A professional-grade environment for annotating, verifying, and exporting
                        linguistic data — built for speed and accuracy in the field.
                    </Text>
                </div>

                {/* The Dashboard Mockup - Window Frame */}
                <div className="w-full border border-border rounded-lg shadow-2xl overflow-hidden bg-card">

                    {/* Window Header */}
                    <div className="h-10 border-b border-border bg-muted flex items-center justify-between px-4">
                        <div className="flex items-center gap-2">
                            <div className="h-3 w-3 rounded-full bg-destructive/50" />
                            <div className="h-3 w-3 rounded-full bg-yellow-500/50" />
                            <div className="h-3 w-3 rounded-full bg-green-500/50" />
                        </div>
                        <div className="text-[10px] font-mono text-muted-foreground uppercase tracking-widest">
                            MultiSpeaker_HeritageSessions_2024.webm
                        </div>
                        <div className="w-16" />
                    </div>

                    {/* Main Application Area */}
                    <div className="h-[580px] flex">

                        {/* Sidebar */}
                        <div className="w-16 border-r border-border bg-card flex flex-col items-center py-4 gap-6">
                            <div className="p-2 bg-secondary rounded-md"><Mic size={18} /></div>
                            <div className="p-2 hover:bg-muted rounded-md text-muted-foreground transition-colors"><Layers size={18} /></div>
                            <div className="p-2 hover:bg-muted rounded-md text-muted-foreground transition-colors"><Settings size={18} /></div>
                            <div className="mt-auto p-2 hover:bg-muted rounded-md text-muted-foreground transition-colors"><Save size={18} /></div>
                        </div>

                        {/* Main Content */}
                        <div className="flex-1 flex flex-col min-w-0">

                            {/* Toolbar */}
                            <div className="h-12 border-b border-border flex items-center px-4 gap-4 bg-card">
                                <div className="flex items-center gap-2 border-r border-border pr-4">
                                    <button className="p-1 hover:bg-muted rounded"><Rewind size={16} /></button>
                                    <button className="p-1 hover:bg-muted rounded"><Play size={16} /></button>
                                    <button className="p-1 hover:bg-muted rounded"><FastForward size={16} /></button>
                                </div>
                                <div className="flex items-center gap-2">
                                    <Volume2 size={16} className="text-muted-foreground" />
                                    <div className="h-1 w-24 bg-secondary rounded-full overflow-hidden">
                                        <div className="h-full w-2/3 bg-foreground" />
                                    </div>
                                </div>
                                <div className="ml-auto font-mono text-xs text-muted-foreground">
                                    00:01:18 / 00:08:42
                                </div>
                            </div>

                            {/* Waveform View */}
                            <div className="bg-secondary/30 relative flex items-center justify-center border-b border-border overflow-hidden" style={{ height: 100 }}>
                                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(0,0,0,0.05)_50%,transparent_51%)] bg-[size:50px_100%]" />
                                <svg className="w-full h-20 px-4" viewBox="0 0 1200 80" preserveAspectRatio="none">
                                    {/* More organic, realistic waveform path */}
                                    <path
                                        d="M0,40 C20,40 25,10 40,40 C55,70 60,15 80,40 C100,65 115,20 130,40 C145,60 150,8 175,40 C200,72 220,18 240,40 C255,58 270,25 290,40 C310,55 325,12 345,40 C365,68 380,22 400,40 C415,55 430,28 450,40 C465,52 485,16 510,40 C535,64 555,20 575,40 C590,55 605,30 620,40 C640,52 655,14 680,40 C705,66 720,22 740,38 C755,52 765,18 785,40 C810,62 830,20 850,38 C870,56 885,15 910,40 C930,65 950,18 970,40 C990,62 1010,20 1030,40 C1050,60 1070,18 1090,40 C1110,62 1130,20 1150,40 L1200,40"
                                        fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground/50"
                                    />
                                </svg>
                                {/* Playhead at ~15% */}
                                <div className="absolute top-0 bottom-0 left-[45%] w-px bg-signal shadow-[0_0_10px_hsl(var(--signal)/0.6)]" />
                                {/* Region highlight */}
                                <div className="absolute top-0 bottom-0 left-[38%] w-[14%] bg-signal/8 border-l border-r border-signal/20" />
                            </div>

                            {/* Data Table */}
                            <div className="flex-1 bg-card overflow-y-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-secondary text-xs font-mono uppercase text-muted-foreground sticky top-0">
                                        <tr>
                                            <th className="p-3 border-b border-border w-16">Time</th>
                                            <th className="p-3 border-b border-border w-20">Speaker</th>
                                            <th className="p-3 border-b border-border">IPA Transcription</th>
                                            <th className="p-3 border-b border-border hidden md:table-cell">Orthography</th>
                                            <th className="p-3 border-b border-border w-16">Conf.</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {SEGMENT_ROWS.map((row, i) => (
                                            <tr key={i} className={`hover:bg-muted/50 border-b border-border font-mono text-xs ${i === 4 ? 'bg-signal/5 border-l-2 border-l-signal' : ''}`}>
                                                <td className="p-3 text-muted-foreground">{row.time}</td>
                                                <td className="p-3 font-bold">{row.speaker}</td>
                                                <td className="p-3 font-serif text-base tracking-wide">{row.ipa}</td>
                                                <td className="p-3 text-muted-foreground hidden md:table-cell">{row.transcription}</td>
                                                <td className="p-3">
                                                    <div className="flex items-center gap-1.5">
                                                        <div
                                                            className="h-1 rounded-full"
                                                            style={{ width: `${row.confidence * 40}px`, backgroundColor: confColor(row.confidence) }}
                                                        />
                                                        <span className="text-[10px] tabular-nums" style={{ color: confColor(row.confidence) }}>
                                                            {Math.round(row.confidence * 100)}%
                                                        </span>
                                                    </div>
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                        </div>

                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default WorkbenchPreview;

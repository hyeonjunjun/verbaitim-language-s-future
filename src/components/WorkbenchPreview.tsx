import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import { Play, Pause, FastForward, Rewind, Settings, Layers, Mic, Volume2, Save, Share2 } from "lucide-react";

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
                        linguistic data. Built for speed and accuracy.
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
                            Project: Lakota_Corpus_042.wav
                        </div>
                        <div className="w-16" /> {/* Spacer */}
                    </div>

                    {/* Main Application Area */}
                    <div className="h-[600px] flex">

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
                                    00:04:12 / 00:15:00
                                </div>
                            </div>

                            {/* Waveform View */}
                            <div className="flex-1 bg-secondary/30 relative flex items-center justify-center border-b border-border overflow-hidden">
                                {/* Fake Waveform Grid */}
                                <div className="absolute inset-0 bg-[linear-gradient(90deg,transparent_49%,rgba(0,0,0,0.05)_50%,transparent_51%)] bg-[size:50px_100%]" />

                                {/* Fake Waveform SVG */}
                                <svg className="w-full h-32 px-4" viewBox="0 0 1000 100" preserveAspectRatio="none">
                                    <path d="M0,50 Q10,20 20,50 T40,50 T60,20 T80,80 T100,50 T150,50 T200,90 T250,10 T300,50 L1000,50"
                                        fill="none" stroke="currentColor" strokeWidth="1.5" className="text-foreground" />
                                </svg>

                                {/* Playhead */}
                                <div className="absolute top-0 bottom-0 left-1/3 w-px bg-signal shadow-[0_0_10px_hsl(var(--signal)/0.5)]" />
                            </div>

                            {/* Data Table */}
                            <div className="h-64 bg-card overflow-y-auto">
                                <table className="w-full text-left border-collapse">
                                    <thead className="bg-secondary text-xs font-mono uppercase text-muted-foreground sticky top-0">
                                        <tr>
                                            <th className="p-3 border-b border-border w-24">Time</th>
                                            <th className="p-3 border-b border-border w-24">Speaker</th>
                                            <th className="p-3 border-b border-border">Transcription</th>
                                            <th className="p-3 border-b border-border">IPA</th>
                                            <th className="p-3 border-b border-border w-24">Conf.</th>
                                        </tr>
                                    </thead>
                                    <tbody className="text-sm">
                                        {[1, 2, 3, 4, 5].map((i) => (
                                            <tr key={i} className="hover:bg-muted/50 border-b border-border font-mono text-xs md:text-sm">
                                                <td className="p-3 text-muted-foreground">00:0{i}:12</td>
                                                <td className="p-3 font-semibold text-foreground">EF_02</td>
                                                <td className="p-3">Hau, mitákuyepi.</td>
                                                <td className="p-3 font-serif text-muted-foreground">haʊ miˈtakuˌjepi</td>
                                                <td className="p-3"><span className="inline-block w-full h-1 bg-sage rounded-full opacity-70" /></td>
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

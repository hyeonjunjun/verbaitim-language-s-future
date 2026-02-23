import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import Navbar from "@/components/Navbar";
import WorkbenchPreview from "@/components/WorkbenchPreview";
import { Mic, Save, FileText, Globe } from "lucide-react";

const LinguistDashboard = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-24 pb-12">
                <Container>
                    <div className="mb-8 flex items-center justify-between">
                        <div>
                            <Headline as="h1" className="text-4xl mb-2">Linguist Workbench</Headline>
                            <Text variant="lead">Professional-grade phonetic analysis and documentation.</Text>
                        </div>
                        <div className="flex gap-4">
                            <button className="flex items-center gap-2 px-4 py-2 bg-secondary text-foreground rounded-full text-sm font-medium hover:bg-secondary/80 transition-all">
                                <Globe size={16} />
                                Lakota Corpus
                            </button>
                            <button className="flex items-center gap-2 px-6 py-2 bg-signal text-white rounded-full text-sm font-medium hover:bg-signal/90 transition-all">
                                <Save size={16} />
                                Save Project
                            </button>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
                        {/* Sidebar / Tools */}
                        <div className="lg:col-span-1 space-y-6">
                            <div className="p-6 bg-card border border-border rounded-xl">
                                <h3 className="font-display font-semibold mb-4 text-sm uppercase tracking-wider text-muted-foreground">Session Tools</h3>
                                <nav className="space-y-2">
                                    {[
                                        { name: "Live Transcription", icon: Mic, active: true },
                                        { name: "Phonetic Analysis", icon: FileText, active: false },
                                        { name: "Community Review", icon: Globe, active: false },
                                    ].map((tool) => (
                                        <button
                                            key={tool.name}
                                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg text-sm font-medium transition-all ${tool.active
                                                    ? "bg-signal/10 text-signal border border-signal/20"
                                                    : "text-muted-foreground hover:bg-muted"
                                                }`}
                                        >
                                            <tool.icon size={18} />
                                            {tool.name}
                                        </button>
                                    ))}
                                </nav>
                            </div>

                            <div className="p-6 bg-card border border-border rounded-xl">
                                <h3 className="font-display font-semibold mb-2 text-sm">Transcription Model</h3>
                                <Text className="text-xs mb-4">Allosaurus uni2005 (Universal Phone Recognizer)</Text>
                                <div className="h-2 bg-secondary rounded-full overflow-hidden">
                                    <div className="h-full w-full bg-signal/20" />
                                </div>
                                <Text className="text-[10px] mt-2 text-muted-foreground">Model Status: Active / Local</Text>
                            </div>
                        </div>

                        {/* Main Workbench */}
                        <div className="lg:col-span-3">
                            <WorkbenchPreview />
                        </div>
                    </div>
                </Container>
            </div>
        </div>
    );
};

export default LinguistDashboard;

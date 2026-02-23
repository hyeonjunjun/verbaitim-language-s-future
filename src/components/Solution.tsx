import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import { motion } from "framer-motion";

const IPA_CHARACTERS = ['ð', 'ə', 'tʃ', 'ɹ', 'ŋ', 'ʃ', 'θ', 'æ', 'ɪ', 'ʒ', 'ɔ', 'ʊ'];

const Solution = () => {
    return (
        <Section id="solution" className="bg-secondary/30 border-b border-border/50 overflow-hidden">
            <Container className="relative">
                {/* IPA Character Scatter Accent */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden select-none" aria-hidden="true">
                    {IPA_CHARACTERS.map((char, i) => (
                        <span
                            key={i}
                            className="absolute font-reading text-signal/[0.06] font-medium"
                            style={{
                                fontSize: `${32 + (i % 4) * 16}px`,
                                top: `${8 + (i * 7.5) % 85}%`,
                                left: `${55 + (i * 11) % 42}%`,
                                transform: `rotate(${-15 + (i * 23) % 30}deg)`,
                            }}
                        >
                            {char}
                        </span>
                    ))}
                </div>

                <div className="max-w-4xl">
                    <Text variant="caption" className="mb-6 block text-signal font-semibold">
                        The Solution
                    </Text>
                    <Headline as="h2" className="mb-8">
                        One workflow. <br />
                        From <span className="text-signal">documentation</span> to <span className="text-signal">learning</span>.
                    </Headline>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <Text variant="lead" className="text-foreground/90 font-medium">
                            VerbAItim integrates AI-assisted transcription, metadata tagging, structured annotation, and language learning into a single, field-ready platform.
                        </Text>
                    </motion.div>

                    {/* Workbench Screenshot */}
                    <motion.div
                        initial={{ opacity: 0, y: 30 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="mt-16"
                    >
                        <div className="rounded-2xl border border-border bg-card shadow-xl overflow-hidden">
                            {/* Window Chrome */}
                            <div className="flex items-center gap-2 px-4 py-3 bg-secondary/50 border-b border-border">
                                <div className="flex gap-1.5">
                                    <div className="w-3 h-3 rounded-full bg-red-400/60" />
                                    <div className="w-3 h-3 rounded-full bg-yellow-400/60" />
                                    <div className="w-3 h-3 rounded-full bg-green-400/60" />
                                </div>
                                <div className="flex-1 text-center">
                                    <span className="text-xs text-muted-foreground font-mono">verbaitim.app/workbench</span>
                                </div>
                            </div>
                            {/* Screenshot placeholder — mock workbench UI */}
                            <div className="bg-[#1a1a2e] p-8 min-h-[320px] flex gap-6">
                                {/* Sidebar mock */}
                                <div className="w-48 space-y-4 flex-shrink-0 hidden md:block">
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="w-4 h-4 rounded-sm bg-signal/80" />
                                        <span className="text-white/80 text-sm font-semibold">VerbAItim</span>
                                    </div>
                                    {['Overview', 'Live Editor', 'Corpus Library', 'History'].map((item, i) => (
                                        <div key={item} className={`flex items-center gap-2 px-3 py-2 rounded-lg text-xs ${i === 1 ? 'bg-signal/20 text-signal' : 'text-white/40'}`}>
                                            <div className={`w-3 h-3 rounded ${i === 1 ? 'bg-signal/40' : 'bg-white/10'}`} />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                {/* Main content mock */}
                                <div className="flex-1 space-y-4">
                                    {/* Waveform */}
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10">
                                        <div className="flex items-end gap-[3px] h-12 justify-center">
                                            {Array.from({ length: 48 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-1 bg-signal/60 rounded-full"
                                                    style={{ height: `${12 + Math.sin(i * 0.5) * 20 + Math.random() * 15}px` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    {/* Transcription area */}
                                    <div className="bg-white/5 rounded-xl p-4 border border-white/10 space-y-3">
                                        <div className="text-xs text-white/30 font-mono uppercase tracking-wider">IPA Transcription</div>
                                        <div className="text-white/70 font-mono text-sm leading-relaxed">
                                            <span className="text-signal">[</span>ˈlæŋ.ɡwɪdʒ dɒ.kjʊ.mɛnˈteɪ.ʃən<span className="text-signal">]</span>
                                        </div>
                                        <div className="text-white/40 text-xs italic">language documentation</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
};

export default Solution;

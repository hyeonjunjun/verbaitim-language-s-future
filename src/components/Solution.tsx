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
                                    {/* Transcription rows */}
                                    <div className="bg-white/5 rounded-xl border border-white/10 overflow-hidden">
                                        <div className="text-[10px] text-white/30 font-mono uppercase tracking-wider px-4 pt-4 pb-2">IPA Transcription · Lakota_FieldSession_042</div>
                                        <table className="w-full text-xs">
                                            <thead>
                                                <tr className="text-[9px] font-mono text-white/25 uppercase tracking-wider border-b border-white/10">
                                                    <td className="px-4 py-1.5">Time</td>
                                                    <td className="px-3 py-1.5">Spkr</td>
                                                    <td className="px-3 py-1.5">IPA</td>
                                                    <td className="px-3 py-1.5 hidden md:table-cell">Gloss</td>
                                                    <td className="px-3 py-1.5">Conf</td>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {[
                                                    { t: "0:04", sp: "EF_01", ipa: "haʊ̃ mitˈakʷe.ojasiŋ", en: "Hello, all my relatives", conf: "high" },
                                                    { t: "0:09", sp: "EF_01", ipa: "čaŋtéčhila čhe tȟamákhočhe", en: "I love this land", conf: "high" },
                                                    { t: "0:21", sp: "EF_02", ipa: "wičhóie kiŋ hé wašté", en: "That word is good", conf: "med" },
                                                    { t: "0:34", sp: "EF_01", ipa: "wóokiye čha uŋspékhičhiyapi", en: "They taught us to pray", conf: "high" },
                                                    { t: "0:47", sp: "EF_02", ipa: "táku eháŋni uŋkáǧapi", en: "What we made long ago", conf: "med" },
                                                ].map((row, i) => (
                                                    <tr key={i} className={`border-b border-white/5 ${i === 1 ? 'bg-signal/10' : ''}`}>
                                                        <td className="px-4 py-2 font-mono text-white/40">{row.t}</td>
                                                        <td className="px-3 py-2 font-bold text-white/60">{row.sp}</td>
                                                        <td className="px-3 py-2 font-mono text-signal/90 tracking-wide">{row.ipa}</td>
                                                        <td className="px-3 py-2 text-white/40 italic hidden md:table-cell">{row.en}</td>
                                                        <td className="px-3 py-2">
                                                            <div className={`h-1 rounded-full w-10 ${row.conf === 'high' ? 'bg-emerald-400/70' : 'bg-yellow-400/50'}`} />
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
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

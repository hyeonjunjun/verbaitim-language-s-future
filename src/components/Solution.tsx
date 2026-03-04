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
                            className="absolute font-reading text-primary/[0.06] font-medium"
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

                <div className="max-w-4xl tracking-tight">
                    <Text variant="caption" className="mb-6 block text-primary font-bold tracking-widest uppercase">
                        The Solution
                    </Text>
                    <Headline as="h2" className="mb-8 text-4xl md:text-5xl">
                        One workflow. <br />
                        From <span className="text-primary italic font-serif">documentation</span> to <span className="text-primary italic font-serif">learning</span>.
                    </Headline>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                        className="max-w-2xl"
                    >
                        <Text variant="lead" className="text-muted-foreground font-medium">
                            Verb<span className="text-primary">AI</span>tim integrates AI-assisted transcription, metadata tagging, structured annotation, and language learning into a single, field-ready platform.
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
                            {/* Screenshot placeholder — mock workbench UI (Light mode) */}
                            <div className="bg-[#FDFCFB] p-8 min-h-[320px] flex gap-6">
                                {/* Sidebar mock */}
                                <div className="w-48 space-y-4 flex-shrink-0 hidden md:block">
                                    <div className="flex items-center gap-2 mb-6">
                                        <div className="w-4 h-4 rounded-sm bg-primary/80" />
                                        <span className="text-card-foreground font-bold text-sm italic">VerbAItim</span>
                                    </div>
                                    {['Overview', 'Live Editor', 'Corpus Library', 'History'].map((item, i) => (
                                        <div key={item} className={`flex items-center gap-2 px-3 py-2 rounded-xl text-xs font-bold ${i === 1 ? 'bg-primary/10 text-primary border border-primary/20' : 'text-muted-foreground'}`}>
                                            <div className={`w-3 h-3 rounded ${i === 1 ? 'bg-primary/40' : 'bg-muted-foreground/30'}`} />
                                            {item}
                                        </div>
                                    ))}
                                </div>
                                {/* Main content mock */}
                                <div className="flex-1 space-y-4">
                                    {/* Waveform */}
                                    <div className="bg-white rounded-[1.5rem] p-4 border shadow-sm">
                                        <div className="flex items-end gap-[3px] h-12 justify-center">
                                            {Array.from({ length: 48 }).map((_, i) => (
                                                <div
                                                    key={i}
                                                    className="w-1 bg-primary/60 rounded-full"
                                                    style={{ height: `${12 + Math.sin(i * 0.5) * 20 + Math.random() * 15}px` }}
                                                />
                                            ))}
                                        </div>
                                    </div>
                                    {/* Transcription rows */}
                                    <div className="bg-white rounded-[1.5rem] border shadow-sm overflow-hidden">
                                        <div className="text-[10px] text-muted-foreground/60 font-mono font-bold uppercase tracking-widest px-4 pt-4 pb-2 border-b border-border/50">IPA Transcription · Lakota_FieldSession_042</div>
                                        <table className="w-full text-xs">
                                            <thead>
                                                <tr className="text-[9px] font-mono text-muted-foreground/50 uppercase tracking-wider border-b border-border/50 bg-muted/20">
                                                    <td className="px-5 py-2">Time</td>
                                                    <td className="px-3 py-2">Spkr</td>
                                                    <td className="px-3 py-2">IPA</td>
                                                    <td className="px-3 py-2 hidden md:table-cell">Gloss</td>
                                                    <td className="px-3 py-2">Conf</td>
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
                                                    <tr key={i} className={`border-b border-border/50 ${i === 1 ? 'bg-primary/5' : ''}`}>
                                                        <td className="px-5 py-2.5 font-mono text-muted-foreground/60">{row.t}</td>
                                                        <td className="px-3 py-2.5 font-bold text-card-foreground/80">{row.sp}</td>
                                                        <td className="px-3 py-2.5 font-mono font-bold text-primary tracking-wide">{row.ipa}</td>
                                                        <td className="px-3 py-2.5 text-muted-foreground italic hidden md:table-cell">{row.en}</td>
                                                        <td className="px-3 py-2.5">
                                                            <div className={`h-1.5 rounded-full w-10 shadow-inner ${row.conf === 'high' ? 'bg-sage/80' : 'bg-ochre/80'}`} />
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

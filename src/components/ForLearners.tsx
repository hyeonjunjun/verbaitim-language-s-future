import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import { motion } from "framer-motion";
import { BookOpen, MessageCircle, Library, Users } from "lucide-react";
import { Link } from "react-router-dom";

const pathways = [
    {
        icon: BookOpen,
        title: "Structured Pathways",
        description: "Organized vocabulary, grammar, sentences, and phrases derived from documentation."
    },
    {
        icon: MessageCircle,
        title: "Dialogue Practice",
        description: "Real-life conversation practice grounded in authentic cultural context."
    },
    {
        icon: Library,
        title: "Culture & History",
        description: "Curated articles for learning the rich history and culture surrounding a language."
    },
    {
        icon: Users,
        title: "Community Forums",
        description: "Dedicated spaces for community discussions and collaborative learning."
    }
];

const ForLearners = () => {
    return (
        <Section id="learners" className="bg-background">
            <Container>
                <div className="mb-20 text-center max-w-3xl mx-auto">
                    <Text variant="caption" className="mb-6 block text-signal font-semibold">
                        Activating the next speaker
                    </Text>
                    <Headline as="h2" className="mb-8">
                        For Communities & Learners
                    </Headline>
                    <Text variant="body" className="text-foreground/85">
                        Access newly documented language materials through structured learning pathways built on actual field research.
                    </Text>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-16">
                    {pathways.map((path, idx) => (
                        <motion.div
                            key={path.title}
                            initial={{ opacity: 0, scale: 0.95 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="flex gap-6 p-8 rounded-2xl bg-secondary/20 border border-transparent hover:border-signal/10 hover:bg-card transition-all shadow-sm"
                        >
                            <div className="flex-shrink-0 w-12 h-12 rounded-full bg-signal text-white flex items-center justify-center">
                                <path.icon size={22} />
                            </div>
                            <div>
                                <h3 className="font-display text-xl font-semibold mb-2 text-foreground">
                                    {path.title}
                                </h3>
                                <Text className="text-base text-muted-foreground italic serif-italic">
                                    {path.description}
                                </Text>
                            </div>
                        </motion.div>
                    ))}
                </div>

                {/* Learning community illustration */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8 }}
                    className="mb-16 flex justify-center"
                >
                    <div className="relative w-full max-w-2xl rounded-3xl bg-gradient-to-br from-signal/5 via-signal/10 to-signal/5 border border-signal/10 p-12 flex items-center justify-center overflow-hidden">
                        {/* Abstract learning community illustration via CSS */}
                        <div className="flex items-end gap-6">
                            {/* Person silhouettes as abstract circles */}
                            {[
                                { size: 'w-14 h-14', color: 'bg-signal/30', label: 'ə' },
                                { size: 'w-16 h-16', color: 'bg-signal/50', label: 'ŋ' },
                                { size: 'w-20 h-20', color: 'bg-signal/40', label: 'ɪ' },
                                { size: 'w-16 h-16', color: 'bg-signal/60', label: 'ʃ' },
                                { size: 'w-12 h-12', color: 'bg-signal/25', label: 'æ' },
                            ].map((person, i) => (
                                <div key={i} className="flex flex-col items-center gap-2">
                                    <div className={`${person.size} ${person.color} rounded-full flex items-center justify-center`}>
                                        <span className="font-reading text-white/80 text-lg font-medium">{person.label}</span>
                                    </div>
                                    <div className={`h-1 w-8 ${person.color} rounded-full`} />
                                </div>
                            ))}
                        </div>
                        {/* Decorative connecting lines */}
                        <div className="absolute inset-0 pointer-events-none opacity-20">
                            <svg className="w-full h-full" viewBox="0 0 600 200" fill="none">
                                <path d="M100 100 Q200 40 300 100 Q400 160 500 100" stroke="currentColor" strokeWidth="1" className="text-signal" />
                                <path d="M50 130 Q250 60 350 130 Q450 180 550 80" stroke="currentColor" strokeWidth="0.5" className="text-signal" />
                            </svg>
                        </div>
                    </div>
                </motion.div>

                <div className="text-center bg-accent/30 p-12 rounded-3xl border border-accent">
                    <Text variant="lead" className="max-w-2xl mx-auto text-foreground italic serif-italic mb-8">
                        Language documentation should not end in an archive. <br />
                        <span className="text-signal not-italic font-bold">Activate the next speaker.</span>
                    </Text>
                    <Link
                        to="/learner"
                        className="inline-flex items-center justify-center px-10 py-4 bg-background border border-signal text-signal rounded-full font-display font-bold text-lg hover:bg-signal hover:text-white transition-all active:scale-95 shadow-sm"
                    >
                        Explore the Learning Hub
                    </Link>
                </div>
            </Container>
        </Section>
    );
};

export default ForLearners;

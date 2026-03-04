import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import { motion } from "framer-motion";
import { Upload, FileText, Database, GraduationCap, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

const features = [
    {
        icon: Upload,
        title: "Upload recorded speech",
        description: "Secure, high-fidelity capture of heritage speaker recordings directly in the field."
    },
    {
        icon: FileText,
        title: "Generate draft transcriptions",
        description: "AI-assisted transcription and value assignment in the International Phonetic Alphabet."
    },
    {
        icon: Database,
        title: "Organize metadata",
        description: "Structure linguistic data with speaker history, cultural context, and archival tags."
    },
    {
        icon: GraduationCap,
        title: "Convert to learning pathways",
        description: "Transform documentation into structured learning materials for immediate community use."
    }
];

const ForLinguists = () => {
    return (
        <Section id="linguists" className="bg-background border-b border-border/50">
            <Container>
                <div className="mb-20">
                    <Text variant="caption" className="mb-6 block text-primary font-bold tracking-widest uppercase">
                        Field Resources
                    </Text>
                    <div className="grid md:grid-cols-2 gap-12 items-end">
                        <Headline as="h2" className="text-4xl md:text-5xl tracking-tight">
                            For Field Linguists
                        </Headline>
                        <Text variant="lead" className="text-muted-foreground font-medium italic">
                            Expedite data collection with modern tools. <br className="hidden md:block" />
                            Save university and grant money.
                        </Text>
                    </div>
                </div>

                {/* Feature cards with arrow connectors */}
                <div className="grid md:grid-cols-2 lg:grid-cols-[1fr_auto_1fr_auto_1fr_auto_1fr] gap-y-8 gap-x-0 mb-16 items-stretch">
                    {features.map((feature, idx) => (
                        <>
                            <motion.div
                                key={feature.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="group p-8 rounded-2xl border border-border hover:border-primary/30 hover:bg-accent/10 transition-all duration-300"
                            >
                                <div className="w-12 h-12 rounded-[1.25rem] bg-primary/10 flex items-center justify-center text-primary mb-6 group-hover:-translate-y-1 transition-transform border border-primary/20">
                                    <feature.icon size={24} />
                                </div>
                                <h3 className="font-display text-xl font-bold mb-3 text-card-foreground">
                                    {feature.title}
                                </h3>
                                <Text className="text-sm leading-relaxed text-muted-foreground font-medium">
                                    {feature.description}
                                </Text>
                            </motion.div>

                            {/* Arrow connector — visible only on lg breakpoint between cards */}
                            {idx < features.length - 1 && (
                                <div key={`arrow-${idx}`} className="hidden lg:flex items-center justify-center px-2">
                                    <ChevronRight size={24} className="text-primary/30" />
                                </div>
                            )}
                        </>
                    ))}
                </div>

                <div className="flex justify-center">
                    <Link
                        to="/workbench"
                        className="inline-flex items-center justify-center px-10 py-5 bg-card text-card-foreground border border-border shadow-sm rounded-2xl font-bold text-lg hover:border-primary/50 hover:bg-white hover:-translate-y-1 transition-all active:scale-95 group"
                    >
                        Enter the Workbench
                        <ChevronRight size={20} className="ml-2 text-primary opacity-0 group-hover:opacity-100 transition-opacity" />
                    </Link>
                </div>
            </Container>
        </Section>
    );
};

export default ForLinguists;


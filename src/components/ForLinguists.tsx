import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import { motion } from "framer-motion";
import { Upload, FileText, Database, GraduationCap } from "lucide-react";

const features = [
    {
        icon: Upload,
        title: "Upload recorded speech",
        description: "Secure, high-fidelity capture of heritage speaker recordings directly in the field."
    },
    {
        icon: FileText,
        title: "Generate draft transcriptions",
        description: "Zero-shot transcription in the International Phonetic Alphabet (IPA) with state-of-the-art accuracy."
    },
    {
        icon: Database,
        title: "Organize metadata",
        description: "Add speaker history, cultural context, and structured tags for long-term archiving."
    },
    {
        icon: GraduationCap,
        title: "Prepare research",
        description: "Send documentation results immediately to generate structured learning pathways."
    }
];

const ForLinguists = () => {
    return (
        <Section id="linguists" className="bg-background border-b border-border/50">
            <Container>
                <div className="mb-20">
                    <Text variant="caption" className="mb-6 block text-signal font-semibold">
                        Field Resources
                    </Text>
                    <div className="grid md:grid-cols-2 gap-12 items-end">
                        <Headline as="h2">
                            For Field Linguists
                        </Headline>
                        <Text variant="lead" className="text-foreground/70 italic serif-italic">
                            Spend less time formatting. <br className="hidden md:block" />
                            More time analyzing.
                        </Text>
                    </div>
                </div>

                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {features.map((feature, idx) => (
                        <motion.div
                            key={feature.title}
                            initial={{ opacity: 0, y: 30 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: idx * 0.1 }}
                            className="group p-8 rounded-2xl border border-border hover:border-signal/30 hover:bg-accent/10 transition-all duration-300"
                        >
                            <div className="w-12 h-12 rounded-xl bg-signal/10 flex items-center justify-center text-signal mb-6 group-hover:scale-110 transition-transform">
                                <feature.icon size={24} />
                            </div>
                            <h3 className="font-display text-xl font-semibold mb-3 text-foreground">
                                {feature.title}
                            </h3>
                            <Text className="text-sm leading-relaxed text-muted-foreground group-hover:text-foreground/80 transition-colors">
                                {feature.description}
                            </Text>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default ForLinguists;

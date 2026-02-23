import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import { ShieldCheck, GraduationCap, Users } from "lucide-react";
import { motion } from "framer-motion";

const reasons = [
    {
        icon: GraduationCap,
        title: "Linguist-Led by Design",
        description: "Built from field methods, not retrofitted from generic transcription software with an AI label."
    },
    {
        icon: Users,
        title: "Documentation & Education",
        description: "Most tools stop at annotation. VerbAItim does it all—from field recording to classroom activation."
    },
    {
        icon: ShieldCheck,
        title: "Ethical-First AI",
        description: "Communities retain ownership of their data. We provide the infrastructure, not the authority."
    }
];

const WhyVerbaitim = () => {
    return (
        <Section id="why" className="bg-background border-b border-border/50">
            <Container>
                <div className="mb-20">
                    <Text variant="caption" className="mb-6 block text-signal font-semibold">
                        Why VerbAItim?
                    </Text>
                    <Headline as="h2" className="max-w-2xl">
                        A specialized ecosystem <br />
                        <span className="text-signal italic serif-italic text-sm">for high-stakes language work.</span>
                    </Headline>
                </div>

                <div className="grid md:grid-cols-3 gap-12">
                    {reasons.map((reason, idx) => (
                        <motion.div
                            key={reason.title}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6, delay: idx * 0.1 }}
                        >
                            <div className="flex items-center gap-4 mb-6">
                                <div className="w-10 h-10 rounded-lg bg-signal/10 flex items-center justify-center text-signal">
                                    <reason.icon size={22} />
                                </div>
                                <h3 className="font-display text-xl font-semibold text-foreground">
                                    {reason.title}
                                </h3>
                            </div>
                            <Text variant="reading" className="text-lg leading-relaxed text-foreground/90">
                                {reason.description}
                            </Text>
                        </motion.div>
                    ))}
                </div>
            </Container>
        </Section>
    );
};

export default WhyVerbaitim;

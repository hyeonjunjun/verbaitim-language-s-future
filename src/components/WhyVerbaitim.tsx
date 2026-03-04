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
        title: "Documentation to Activation",
        description: "There is no other AI-native infrastructure that connects documentation, structured data, learning activation, and community connection."
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
                    <Text variant="caption" className="mb-6 block text-primary font-bold tracking-widest uppercase">
                        Why VerbAItim?
                    </Text>
                    <Headline as="h2" className="max-w-2xl text-4xl md:text-5xl tracking-tight">
                        A specialized ecosystem <br />
                        <span className="text-primary italic font-serif opacity-90">built for the languages that need it most.</span>
                    </Headline>
                </div>

                <div className="space-y-0">
                    {reasons.map((reason, idx) => {
                        const isEven = idx % 2 === 1;
                        return (
                            <motion.div
                                key={reason.title}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.6, delay: idx * 0.1 }}
                                className="py-12 first:pt-0 last:pb-0"
                            >
                                {idx > 0 && <div className="h-px w-full bg-border/50 mb-12" />}
                                <div className={`grid md:grid-cols-2 gap-12 items-center ${isEven ? 'md:direction-rtl' : ''}`}>
                                    {/* Icon + Title Side */}
                                    <div className={`flex items-start gap-6 ${isEven ? 'md:order-2' : 'md:order-1'}`}>
                                        <div className="w-14 h-14 rounded-full bg-primary/10 flex items-center justify-center text-primary flex-shrink-0 border border-primary/20">
                                            <reason.icon size={28} />
                                        </div>
                                        <h3 className="font-display text-2xl md:text-3xl font-bold text-card-foreground leading-tight pt-2">
                                            {reason.title}
                                        </h3>
                                    </div>

                                    {/* Description Side */}
                                    <div className={`${isEven ? 'md:order-1' : 'md:order-2'}`}>
                                        <Text variant="body" className="text-xl leading-relaxed text-muted-foreground font-medium">
                                            {reason.description}
                                        </Text>
                                    </div>
                                </div>
                            </motion.div>
                        );
                    })}
                </div>
            </Container>
        </Section>
    );
};

export default WhyVerbaitim;

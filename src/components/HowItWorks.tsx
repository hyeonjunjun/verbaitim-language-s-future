import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import { motion } from "framer-motion";
import { Mic, Fingerprint, Layers, Rocket } from "lucide-react";

const steps = [
    {
        icon: Mic,
        title: "1. Capture",
        description: "Record field audio recordings with high metadata fidelity."
    },
    {
        icon: Fingerprint,
        title: "2. Structure",
        description: "Send the recording to VerbAItim’s transcription and begin data metatagging."
    },
    {
        icon: Layers,
        title: "3. Refine",
        description: "Edit, organize, and annotate for archiving or research reference."
    },
    {
        icon: Rocket,
        title: "4. Activate",
        description: "Send documented language data to the learning portal and generate pathways."
    }
];

const HowItWorks = () => {
    return (
        <Section id="how-it-works" className="bg-secondary/20 border-b border-border/50">
            <Container>
                <div className="mb-20 text-center">
                    <Text variant="caption" className="mb-6 block text-primary font-bold tracking-widest uppercase">
                        The Workflow
                    </Text>
                    <Headline as="h2" className="text-4xl md:text-5xl tracking-tight">How It Works</Headline>
                </div>

                <div className="relative">
                    {/* Connection Line */}
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-primary/10 -translate-y-1/2 hidden lg:block" />

                    <div className="grid lg:grid-cols-4 gap-8">
                        {steps.map((step, idx) => (
                            <motion.div
                                key={step.title}
                                initial={{ opacity: 0, y: 30 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ duration: 0.5, delay: idx * 0.1 }}
                                className="relative bg-background p-8 rounded-2xl border border-border shadow-sm hover:shadow-md transition-shadow group z-10"
                            >
                                <div className="w-16 h-16 rounded-[1.5rem] bg-primary/10 text-primary flex items-center justify-center mb-6 group-hover:-translate-y-1 transition-transform border border-primary/20">
                                    <step.icon size={28} />
                                </div>
                                <h3 className="font-display text-2xl font-bold mb-3 text-card-foreground">
                                    {step.title}
                                </h3>
                                <Text className="text-muted-foreground leading-relaxed font-medium">
                                    {step.description}
                                </Text>

                                {/* Step Indicator Dot for Timeline */}
                                <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-primary/20 border-4 border-background hidden lg:block" />
                            </motion.div>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default HowItWorks;


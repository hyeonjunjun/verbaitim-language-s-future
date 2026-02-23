import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import { motion } from "framer-motion";
import { Sparkles } from "lucide-react";

const Solution = () => {
    return (
        <Section id="solution" className="bg-secondary/30 border-b border-border/50 overflow-hidden">
            <Container className="relative">
                {/* Visual Accent */}
                <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/4 opacity-10">
                    <Sparkles size={400} className="text-signal" strokeWidth={0.5} />
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

                        <div className="mt-12 flex items-center gap-4 text-signal/60">
                            <div className="h-px flex-1 bg-current opacity-20" />
                            <div className="text-[10px] font-mono uppercase tracking-[0.2em]">unified ecosystem</div>
                            <div className="h-px flex-1 bg-current opacity-20" />
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
};

export default Solution;

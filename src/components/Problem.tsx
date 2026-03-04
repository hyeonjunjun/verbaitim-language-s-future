import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import { motion } from "framer-motion";

const Problem = () => {
    return (
        <Section id="problem" className="bg-background border-b border-border/50">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24 items-start">

                    {/* Left: The Hook */}
                    <div className="md:col-span-5">
                        <Text variant="caption" className="mb-6 block text-primary font-bold tracking-widest uppercase">
                            The Problem
                        </Text>
                        <Headline as="h2" className="text-4xl md:text-5xl lg:text-6xl tracking-tight leading-tight mb-8">
                            Language documentation is <span className="italic font-serif opacity-90 text-primary">slow</span>. <br />
                            Time isn't.
                        </Headline>

                        <div className="h-px w-24 bg-border/60 hidden md:block" />
                    </div>

                    {/* Right: Stat Callout + Context */}
                    <div className="md:col-span-7 flex flex-col gap-10">
                        {/* Stat Callout — the hero number */}
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-primary/5 p-10 rounded-[2rem] border border-primary/20 shadow-sm"
                        >
                            <div className="flex items-baseline gap-4 mb-3">
                                <span className="font-display text-6xl md:text-7xl font-bold text-primary leading-none tracking-tighter">10–20×</span>
                            </div>
                            <Text variant="body" className="text-card-foreground font-medium leading-relaxed">
                                hours of transcription and annotation for every single hour of recorded speech.
                            </Text>
                        </motion.div>

                        <div className="space-y-8">
                            <Text variant="body" className="text-muted-foreground font-medium leading-relaxed">
                                Existing tools are fragmented, manual, and built for outdated workflows. After documentation, materials must be manually rebuilt into learning resources, adding years to the process.
                            </Text>

                            <div className="p-6 border-l-4 border-primary/30 bg-primary/5 rounded-r-xl">
                                <Text variant="lead" className="text-card-foreground font-bold italic">
                                    For many endangered languages, there may not be years left.
                                </Text>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </Section>
    );
};

export default Problem;

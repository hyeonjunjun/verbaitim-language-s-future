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
                        <Text variant="caption" className="mb-6 block text-signal font-semibold">
                            The Problem
                        </Text>
                        <Headline as="h2" className="text-4xl md:text-5xl lg:text-6xl leading-tight mb-8">
                            Language documentation is <span className="italic serif-italic text-signal">slow</span>. <br />
                            Time isn’t.
                        </Headline>

                        <div className="h-px w-24 bg-border/60 hidden md:block" />
                    </div>

                    {/* Right: The Burden */}
                    <div className="md:col-span-7 flex flex-col gap-10">
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.6 }}
                            className="bg-accent/30 p-8 rounded-2xl border border-accent"
                        >
                            <Text variant="reading" className="mb-0">
                                Field linguists often spend <span className="font-semibold text-foreground italic">10–20 hours</span> transcribing and annotating for every hour of recorded speech.
                            </Text>
                        </motion.div>

                        <div className="space-y-8">
                            <Text variant="body" className="text-foreground/80 leading-relaxed">
                                Existing tools are fragmented, manual, and built for outdated workflows. After documentation, materials must be manually rebuilt into learning resources, adding years to the process.
                            </Text>

                            <div className="p-6 border-l-2 border-signal/30 bg-signal/[0.02]">
                                <Text variant="lead" className="text-foreground font-medium italic">
                                    "For many endangered languages, there may not be years left."
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

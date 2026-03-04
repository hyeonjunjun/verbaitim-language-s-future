import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import { motion } from "framer-motion";

const JoinBeta = () => {
    return (
        <Section id="join" className="bg-primary text-primary-foreground py-32 md:py-48 overflow-hidden relative">
            {/* Background Texture */}
            <div className="absolute inset-0 opacity-10 pointer-events-none">
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.2)_0%,transparent_70%)]" />
                <div className="absolute top-0 left-0 w-full h-full" style={{ backgroundImage: 'radial-gradient(rgba(255,255,255,0.1) 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
            </div>

            <Container className="relative z-10">
                <div className="max-w-4xl mx-auto text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.8 }}
                    >
                        <Headline as="h2" className="text-primary-foreground mb-8 text-4xl md:text-6xl tracking-tight">
                            Join the Verb<span className="font-sans">AI</span>tim Beta
                        </Headline>

                        {/* Descriptive text ABOVE the CTA */}
                        <Text variant="lead" className="text-white/90 mb-12 max-w-2xl mx-auto italic font-serif opacity-90">
                            Let's document language faster — so languages can keep living.
                        </Text>

                        <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                            <button className="px-10 py-5 bg-card text-primary rounded-full font-bold text-lg hover:scale-105 transition-all shadow-2xl shadow-primary-foreground/10 active:scale-95 leading-none">
                                Request Access
                            </button>
                        </div>
                    </motion.div>
                </div>
            </Container>
        </Section>
    );
};

export default JoinBeta;

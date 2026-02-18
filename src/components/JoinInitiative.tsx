import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import { ArrowRight } from "lucide-react";

const JoinInitiative = () => {
    return (
        <Section className="bg-foreground text-background py-32">
            <Container>
                <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
                    <div className="mb-8 rounded-full border border-background/20 px-4 py-1">
                        <Text variant="caption" className="text-background/80">
                            Public Beta Access
                        </Text>
                    </div>

                    <Headline as="h2" className="mb-8 text-white">
                        Join the <span className="text-signal">federation</span>.
                    </Headline>

                    <Text variant="lead" className="text-background/70 mb-12">
                        We are currently onboarding research institutes and heritage communities
                        for the 2026 pilot program.
                    </Text>

                    <div className="flex flex-col md:flex-row gap-4 w-full max-w-md">
                        <input
                            type="email"
                            placeholder="institute@university.edu"
                            className="flex-1 bg-background/10 border border-background/20 px-4 py-3 text-background placeholder:text-background/30 focus:outline-none focus:border-signal transition-colors font-mono text-sm"
                        />
                        <button className="bg-signal text-white px-8 py-3 font-mono text-sm uppercase tracking-wider hover:bg-blue-600 transition-colors flex items-center justify-center gap-2">
                            Request Access <ArrowRight size={16} />
                        </button>
                    </div>

                    <Text variant="caption" className="mt-8 text-background/40">
                        PGP Key available for encrypted communication.
                    </Text>
                </div>
            </Container>
        </Section>
    );
};

export default JoinInitiative;

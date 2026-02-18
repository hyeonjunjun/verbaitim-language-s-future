import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";

const Manifesto = () => {
    return (
        <Section className="bg-background border-b border-border">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-24">

                    {/* Column 1: The Hook (4 Cols) */}
                    <div className="md:col-span-4">
                        <Text variant="caption" className="mb-4 block text-signal">
                            The Problem
                        </Text>
                        <Headline as="h2" className="text-3xl md:text-4xl leading-tight">
                            Language is dying in the <span className="text-muted-foreground line-through decoration-signal decoration-2">cloud</span>.
                        </Headline>
                    </div>

                    {/* Column 2: The Argument (8 Cols) */}
                    <div className="md:col-span-8 flex flex-col gap-8">
                        <Text variant="lead">
                            Current digital archives are data silos. They extract cultural heritage,
                            lock it behind academic paywalls, and strip it of its sovereign context.
                        </Text>

                        <div className="grid md:grid-cols-2 gap-8 pt-8 border-t border-border">
                            <div>
                                <div className="text-4xl font-display mb-2 text-signal">01.</div>
                                <h4 className="font-semibold mb-2">Extractive Generation</h4>
                                <Text>
                                    LLMs consume indigenous data without consent, provenance, or attribution.
                                </Text>
                            </div>
                            <div>
                                <div className="text-4xl font-display mb-2 text-signal">02.</div>
                                <h4 className="font-semibold mb-2">Broken Lineage</h4>
                                <Text>
                                    Digital recordings are often severed from the speaker's identity and rights.
                                </Text>
                            </div>
                        </div>
                    </div>

                </div>
            </Container>
        </Section>
    );
};

export default Manifesto;

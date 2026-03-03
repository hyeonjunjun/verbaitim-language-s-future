import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";

const specs = [
    {
        category: "Phone Recognition",
        model: "Allosaurus-v2.4",
        architecture: "Bi-LSTM + CTC",
        latency: "12ms / token",
        accuracy: "94.2% (Instant)"
    },
    {
        category: "Grapheme Synthesis",
        model: "ByT5-Large",
        architecture: "Transformer (Byte-level)",
        latency: "45ms / token",
        accuracy: "99.8% (Orthographic)"
    },
    {
        category: "Audio Alignment",
        model: "W2V-BERT",
        architecture: "Conformer",
        latency: "Real-time",
        accuracy: "98.5% (Temporal)"
    }
];

const TechnologySpecs = () => {
    return (
        <Section className="bg-background border-b border-border">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    {/* Header */}
                    <div className="md:col-span-4">
                        <Text variant="caption" className="mb-4 block text-signal">
                            Technical Specifications
                        </Text>
                        <div className="sticky top-24">
                            <Headline as="h2" className="mb-6">
                                Open-source <br />
                                infrastructure.
                            </Headline>
                            <Text>
                                Our pipeline is built on foundation models fine-tuned for
                                low-resource languages and optimized for edge deployment.
                            </Text>
                        </div>
                    </div>

                    {/* Spec Sheet */}
                    <div className="md:col-span-8">
                        <div className="border-t border-border">
                            {specs.map((spec, i) => (
                                <div key={i} className="grid grid-cols-1 md:grid-cols-2 py-8 border-b border-border group hover:bg-secondary/20 transition-colors px-4 -mx-4">
                                    <div className="mb-4 md:mb-0">
                                        <Text variant="caption" className="mb-2">{spec.category}</Text>
                                        <h3 className="font-display text-2xl">{spec.model}</h3>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4 text-sm font-mono text-muted-foreground">
                                        <div>
                                            <span className="block text-[10px] uppercase tracking-wider mb-1 text-foreground/50">Architecture</span>
                                            {spec.architecture}
                                        </div>
                                        <div>
                                            <span className="block text-[10px] uppercase tracking-wider mb-1 text-foreground/50">Latency</span>
                                            {spec.latency}
                                        </div>
                                        <div className="col-span-2">
                                            <span className="block text-[10px] uppercase tracking-wider mb-1 text-foreground/50">Benchmark</span>
                                            <span className="text-signal">{spec.accuracy}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="mt-8 flex justify-end">
                            <button className="text-xs font-mono uppercase tracking-wider border border-border px-4 py-2 hover:bg-secondary transition-colors">
                                View Full Documentation &rarr;
                            </button>
                        </div>
                    </div>

                </div>
            </Container>
        </Section>
    );
};

export default TechnologySpecs;

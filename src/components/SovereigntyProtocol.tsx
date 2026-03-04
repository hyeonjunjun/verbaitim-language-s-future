import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import { ShieldCheck, Network, Database, Lock } from "lucide-react";

const SovereigntyProtocol = () => {
    return (
        <Section className="bg-background border-b border-border">
            <Container>
                <div className="flex flex-col md:flex-row gap-12 md:gap-24 mb-16">
                    <div className="md:w-1/3">
                        <Text variant="caption" className="mb-4 block text-primary">
                            Legal Framework
                        </Text>
                        <Headline as="h2">
                            Data sovereignty <br />
                            is non-negotiable.
                        </Headline>
                    </div>
                    <div className="md:w-2/3">
                        <Text variant="lead">
                            We implement the "Chain of Custody" protocol to ensure heritage communities
                            retain full legal and technical ownership of their linguistic data.
                            No extraction. No black boxes.
                        </Text>
                    </div>
                </div>

                {/* The Protocol Diagram - Editorial Grid Style */}
                <div className="grid grid-cols-1 md:grid-cols-3 border-t border-l border-border">

                    {/* Step 1 */}
                    <div className="border-r border-b border-border p-8 md:p-12 group hover:bg-secondary/20 transition-colors relative">
                        <div className="mb-6 text-primary">
                            <ShieldCheck size={32} strokeWidth={1.5} />
                        </div>
                        <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                            Step 01. Ingestion
                        </div>
                        <h3 className="font-display text-2xl mb-4">Cryptographic Consent</h3>
                        <Text className="text-sm">
                            Every recording is signed with a verifiable credential linking it to the
                            speaker's informed consent form.
                        </Text>
                    </div>

                    {/* Step 2 */}
                    <div className="border-r border-b border-border p-8 md:p-12 group hover:bg-secondary/20 transition-colors relative">
                        <div className="mb-6 text-primary">
                            <Network size={32} strokeWidth={1.5} />
                        </div>
                        <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                            Step 02. Processing
                        </div>
                        <h3 className="font-display text-2xl mb-4">Local-First Inference</h3>
                        <Text className="text-sm">
                            Data is processed on-device or on community-controlled servers.
                            Zero data egress to third-party clouds.
                        </Text>
                    </div>

                    {/* Step 3 */}
                    <div className="border-r border-b border-border p-8 md:p-12 group hover:bg-secondary/20 transition-colors relative">
                        <div className="mb-6 text-primary">
                            <Database size={32} strokeWidth={1.5} />
                        </div>
                        <div className="mb-4 font-mono text-xs uppercase tracking-widest text-muted-foreground">
                            Step 03. Storage
                        </div>
                        <h3 className="font-display text-2xl mb-4">Tokenized Access</h3>
                        <Text className="text-sm">
                            Archives are encrypted at rest. Access is granted via time-bound,
                            revocable permission tokens managed by elders.
                        </Text>
                    </div>

                </div>
            </Container>
        </Section>
    );
};

export default SovereigntyProtocol;


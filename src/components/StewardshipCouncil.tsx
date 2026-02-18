import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";

const councilMembers = [
    {
        name: "Dr. Elena Vasquez",
        role: "Executive Director",
        affiliation: "Computational Linguistics, ex-DeepMind"
    },
    {
        name: "Kahu David Ka'awa",
        role: "Chair, Ethics Board",
        affiliation: "Indigenous Data Sovereignty Network"
    },
    {
        name: "Sarah Chen",
        role: "Lead Architect",
        affiliation: "OpenAI Research"
    },
    {
        name: "Marcus Thorne",
        role: "Field Operations",
        affiliation: "National Geographic Society"
    }
];

const StewardshipCouncil = () => {
    return (
        <Section className="bg-background border-b border-border">
            <Container>
                <div className="grid grid-cols-1 md:grid-cols-12 gap-12">

                    <div className="md:col-span-4">
                        <Text variant="caption" className="mb-4 block text-signal">
                            Governance
                        </Text>
                        <div className="sticky top-24">
                            <Headline as="h2" className="mb-6">
                                Stewardship <br /> Council.
                            </Headline>
                            <Text>
                                VerbAItim is governed by a multi-disciplinary board of linguists,
                                technologists, and indigenous leaders ensuring alignment with our mission.
                            </Text>
                        </div>
                    </div>

                    <div className="md:col-span-8">
                        <div className="grid grid-cols-1 gap-px bg-border border border-border">
                            {councilMembers.map((member, i) => (
                                <div key={i} className="bg-background p-8 flex flex-col md:flex-row md:items-center justify-between gap-4 group hover:bg-secondary/20 transition-colors">
                                    <div>
                                        <h3 className="font-display text-2xl mb-1 group-hover:text-signal transition-colors">{member.name}</h3>
                                        <Text variant="caption" className="text-muted-foreground">{member.role}</Text>
                                    </div>
                                    <div className="md:text-right">
                                        <Text className="text-sm font-mono text-muted-foreground">
                                            {member.affiliation}
                                        </Text>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                </div>
            </Container>
        </Section>
    );
};

export default StewardshipCouncil;

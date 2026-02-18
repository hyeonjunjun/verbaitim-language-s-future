import { Container, Section } from "@/design-system/Layout";
import { Text } from "@/design-system/Typography";

const PartnerNetwork = () => {
    // Placeholder logos - In a real app these would be SVGs
    const partners = [
        "MIT Media Lab",
        "Stanford Linguistics",
        "Endangered Languages Project",
        "Smithsonian",
        "University of Hawaiʻi",
        "Google Research"
    ];

    return (
        <Section className="py-12 border-b border-border bg-background">
            <Container>
                <div className="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    <Text variant="caption" className="whitespace-nowrap shrink-0">
                        Research Partners
                    </Text>

                    <div className="flex flex-wrap justify-center md:justify-start gap-8 md:gap-12 w-full opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {partners.map((partner, i) => (
                            <div key={i} className="flex items-center">
                                <span className="font-display text-lg md:text-xl font-semibold text-foreground/80 hover:text-signal cursor-default transition-colors">
                                    {partner}
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            </Container>
        </Section>
    );
};

export default PartnerNetwork;

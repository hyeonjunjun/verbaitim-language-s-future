import { Container, Section } from "@/design-system/Layout";
import { Headline, Text } from "@/design-system/Typography";
import Navbar from "@/components/Navbar";
import { BookOpen, MessageCircle, Library, Sparkles } from "lucide-react";

const LearnerDashboard = () => {
    return (
        <div className="min-h-screen bg-background">
            <Navbar />
            <div className="pt-24 pb-12">
                <Container>
                    <div className="mb-12">
                        <Headline as="h1" className="text-4xl mb-4 text-signal">Learner Activation Hub</Headline>
                        <Text variant="lead" className="max-w-2xl">
                            From documentation to fluency. Explore the living heritage of your community
                            through interactive learning pathways.
                        </Text>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Quick Action Cards */}
                        {[
                            {
                                title: "Vocabulary Explorer",
                                desc: "Learn new words and phrases derived directly from field recordings.",
                                icon: BookOpen,
                                color: "bg-sky-50 text-sky-600 border-sky-100"
                            },
                            {
                                title: "Dialogue Practice",
                                desc: "Practice conversation with an AI tutor trained on authentic community stories.",
                                icon: MessageCircle,
                                color: "bg-purple-50 text-purple-600 border-purple-100"
                            },
                            {
                                title: "Cultural Archive",
                                desc: "Access the full database of recordings, transcriptions, and cultural context.",
                                icon: Library,
                                color: "bg-amber-50 text-amber-600 border-amber-100"
                            }
                        ].map((card) => (
                            <div key={card.title} className="group p-8 bg-card border border-border rounded-2xl hover:shadow-xl hover:-translate-y-1 transition-all duration-300">
                                <div className={`h-12 w-12 rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 ${card.color} border`}>
                                    <card.icon size={24} />
                                </div>
                                <h3 className="font-display font-bold text-xl mb-3">{card.title}</h3>
                                <p className="text-muted-foreground text-sm leading-relaxed mb-6">{card.desc}</p>
                                <button className="text-sm font-semibold flex items-center gap-2 group-hover:translate-x-1 transition-transform">
                                    Explore Module <Sparkles size={14} className="text-signal" />
                                </button>
                            </div>
                        ))}
                    </div>

                    <Section className="mt-16 bg-muted/30 rounded-3xl p-12 border border-border/50">
                        <div className="max-w-3xl">
                            <Headline as="h2" className="text-3xl mb-6">Recent Activity</Headline>
                            <div className="space-y-4">
                                {[1, 2, 3].map((i) => (
                                    <div key={i} className="flex items-center justify-between p-4 bg-background border border-border rounded-xl">
                                        <div className="flex items-center gap-4">
                                            <div className="h-2 w-2 rounded-full bg-signal" />
                                            <div>
                                                <p className="font-semibold text-sm">Lakota Verb Conjugation: Phase 1</p>
                                                <p className="text-xs text-muted-foreground">Completed 2 days ago</p>
                                            </div>
                                        </div>
                                        <div className="text-xs font-mono font-bold text-signal">100 XP</div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </Section>
                </Container>
            </div>
        </div>
    );
};

export default LearnerDashboard;

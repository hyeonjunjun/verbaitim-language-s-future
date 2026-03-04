import { useNavigate } from "react-router-dom";
import { ArrowLeft, Search, Plus } from "lucide-react";

const WorkbenchNotes = () => {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-[#FDFCFB] text-foreground font-body pb-20 relative">
            {/* Top Bar */}
            <header className="px-4 pt-12 pb-4 flex items-center justify-between sticky top-0 bg-[#FDFCFB] z-10">
                <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-foreground font-medium">
                    <ArrowLeft size={20} />
                    Back
                </button>
                <h1 className="font-semibold text-lg text-card-foreground">Field Notes</h1>
                <button className="w-10 h-10 flex items-center justify-end text-foreground">
                    <Search size={20} className="text-muted-foreground" />
                </button>
            </header>

            <main className="px-6 space-y-4 max-w-3xl mx-auto">
                {/* Card 1 */}
                <div className="bg-white rounded-3xl p-5 border border-border/50 shadow-sm cursor-pointer hover:border-primary/30 transition-colors">
                    <h2 className="text-lg font-bold text-card-foreground mb-1 leading-tight">Mixtec kinship terms structure</h2>
                    <p className="text-xs text-muted-foreground mb-3 font-medium">Yesterday • Mixtec (San Juan) • Audio</p>
                    <p className="text-sm text-card-foreground/80 mb-4 line-clamp-2 leading-relaxed">
                        María explained that kinship terms differ based on the gender of the speaker. For example...
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-muted/50 text-muted-foreground text-[11px] font-bold rounded-md">kinship</span>
                        <span className="px-3 py-1 bg-muted/50 text-muted-foreground text-[11px] font-bold rounded-md">grammar</span>
                    </div>
                </div>

                {/* Card 2 */}
                <div className="bg-white rounded-3xl p-5 border border-border/50 shadow-sm cursor-pointer hover:border-primary/30 transition-colors">
                    <h2 className="text-lg font-bold text-card-foreground mb-1 leading-tight">Tonal minimal pairs with /a/</h2>
                    <p className="text-xs text-muted-foreground mb-3 font-medium">Feb 20 • Mixtec (San Juan) • Text</p>
                    <p className="text-sm text-card-foreground/80 mb-4 line-clamp-2 leading-relaxed">
                        Identified three distinct tones on /a/ in the root for 'water' vs 'animal' that we need...
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-muted/50 text-muted-foreground text-[11px] font-bold rounded-md">phonology</span>
                        <span className="px-3 py-1 bg-muted/50 text-muted-foreground text-[11px] font-bold rounded-md">tones</span>
                    </div>
                </div>

                {/* Card 3 */}
                <div className="bg-white rounded-3xl p-5 border border-border/50 shadow-sm cursor-pointer hover:border-primary/30 transition-colors">
                    <h2 className="text-lg font-bold text-card-foreground mb-1 leading-tight">Cultural context for harvest songs</h2>
                    <p className="text-xs text-muted-foreground mb-3 font-medium">Feb 18 • Mixtec (San Juan) • Video</p>
                    <p className="text-sm text-card-foreground/80 mb-4 line-clamp-2 leading-relaxed">
                        The songs recorded yesterday are only sung during the first week of the maize harvest...
                    </p>
                    <div className="flex items-center gap-2">
                        <span className="px-3 py-1 bg-muted/50 text-muted-foreground text-[11px] font-bold rounded-md">culture</span>
                        <span className="px-3 py-1 bg-muted/50 text-muted-foreground text-[11px] font-bold rounded-md">music</span>
                    </div>
                </div>
            </main>

            {/* FAB */}
            <div className="fixed bottom-6 right-6 z-20 md:static md:mt-8 md:flex md:justify-end md:pr-6 md:pb-6">
                <button className="w-14 h-14 bg-primary text-white rounded-full flex items-center justify-center shadow-lg shadow-primary/30 hover:scale-105 active:scale-95 transition-all">
                    <Plus size={24} />
                </button>
            </div>
        </div>
    );
};

export default WorkbenchNotes;

import { Search, ChevronDown, X } from "lucide-react";
import { useState } from "react";

const FILTER_CHIPS = [
    "Language",
    "Country",
    "Region",
    "Number of speakers",
    "Endangerment Status",
    "Scripts"
];

const SearchOverlay = () => {
    const [query, setQuery] = useState("");

    return (
        <div className="absolute top-24 left-0 right-0 z-30 flex flex-col items-center px-4 pointer-events-none">
            {/* Search Bar */}
            <div className="relative w-full max-w-2xl pointer-events-auto">
                <div className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400">
                    <Search size={20} />
                </div>
                <input
                    type="text"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder="Search for a country, region or language"
                    className="w-full h-12 bg-neutral-900/90 backdrop-blur-md border border-neutral-700 rounded-full pl-12 pr-12 text-white placeholder:text-slate-400 focus:outline-none focus:border-white/30 transition-colors shadow-lg shadow-black/50 font-body"
                />
                {query && (
                    <button onClick={() => setQuery("")} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white">
                        <X size={18} />
                    </button>
                )}
            </div>

            {/* Filter Chips */}
            <div className="flex flex-wrap justify-center gap-2 mt-4 pointer-events-auto">
                {FILTER_CHIPS.map((chip) => (
                    <button
                        key={chip}
                        className="flex items-center gap-2 px-4 py-2 bg-neutral-900/80 backdrop-blur-md border border-neutral-700 rounded-full text-xs font-medium text-slate-300 hover:bg-neutral-800 hover:border-neutral-600 transition-all active:scale-95"
                    >
                        {chip}
                        <ChevronDown size={14} className="text-slate-500" />
                    </button>
                ))}
            </div>
        </div>
    );
};

export default SearchOverlay;

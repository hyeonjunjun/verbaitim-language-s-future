import { X, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const InfoCard = ({
    title = "Korea, Republic of",
    subdata = [
        { label: "Languages", value: "7K" },
        { label: "Population", value: "51M" },
        { label: "Countries", value: "190+" }
    ]
}: { title?: string, subdata?: { label: string, value: string }[] }) => {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            className="absolute bottom-6 right-6 z-30 w-80 md:w-96 bg-neutral-950 border border-neutral-800 rounded-3xl p-6 shadow-2xl shadow-black/80 font-body hidden md:block" // Hidden on mobile for simplicity
        >
            <div className="flex justify-between items-start mb-8">
                <button className="text-slate-500 hover:text-white transition-colors">
                    <X size={20} />
                </button>
            </div>

            <div className="mb-10">
                <span className="text-xs font-mono text-slate-500 uppercase tracking-widest mb-2 block">Country / Region</span>
                <h2 className="text-3xl font-bold text-white tracking-tight leading-none mb-4">{title}</h2>
                {/* Mini Map Placeholder */}
                <div className="w-16 h-16 opacity-50 grayscale hover:grayscale-0 transition-all absolute top-16 right-6">
                    {/* Imagine a mini SVG map here */}
                    <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full text-sky-600 fill-current">
                        <path d="M40 10 L60 15 L70 30 L60 50 L50 60 L30 50 L25 30 Z" />
                    </svg>
                </div>
            </div>

            <div>
                <h3 className="text-white font-medium mb-4">World Overview</h3>
                <div className="space-y-2">
                    {subdata.map((item, i) => (
                        <div key={i} className="flex justify-between items-center text-xs border-b border-neutral-800 pb-2 last:border-0">
                            <span className="text-slate-500 font-mono">{item.label}</span>
                            <span className="text-slate-300 font-mono">{item.value}</span>
                        </div>
                    ))}
                </div>
            </div>

            <div className="mt-6 pt-4 border-t border-neutral-800 flex justify-end">
                <button className="flex items-center gap-2 text-xs font-bold text-white border border-neutral-700 rounded-full px-4 py-2 hover:bg-neutral-800 transition-colors">
                    Visit GitHub <ArrowRight size={14} />
                </button>
            </div>
        </motion.div>
    );
};

export default InfoCard;

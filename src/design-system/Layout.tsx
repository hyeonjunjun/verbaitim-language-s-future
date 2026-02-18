import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// The "Shell" - Main wrapper for global margins/grids
export const Shell = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <div className={cn("min-h-screen w-full bg-background grid-paper", className)}>
            {children}
        </div>
    );
}

// Content Container - Standard max-width and padding
export const Container = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <div className={cn("w-full max-w-[1400px] mx-auto px-6 md:px-8", className)}>
            {children}
        </div>
    );
}

// Section - Vertical spacing wrapper
export const Section = ({ children, className }: { children: ReactNode, className?: string }) => {
    return (
        <section className={cn("py-24 md:py-32", className)}>
            {children}
        </section>
    );
}

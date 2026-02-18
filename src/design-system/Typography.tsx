import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// Editorial Headline (Display Serif)
export const Headline = ({ children, className, as: Component = "h1" }: { children: ReactNode, className?: string, as?: "h1" | "h2" | "h3" | "h4" }) => {
    return (
        <Component className={cn(
            "font-display font-medium text-foreground tracking-tight leading-[1.05]",
            {
                "text-6xl md:text-8xl lg:text-9xl": Component === "h1",
                "text-4xl md:text-5xl lg:text-6xl": Component === "h2",
                "text-3xl md:text-4xl": Component === "h3",
                "text-2xl": Component === "h4",
            },
            className
        )}>
            {children}
        </Component>
    );
};

// Technical Text (Monospace/Sans)
export const Text = ({ children, className, variant = "body" }: { children: ReactNode, className?: string, variant?: "body" | "caption" | "lead" | "code" }) => {
    return (
        <p className={cn(
            "text-foreground/80 font-body antialiased",
            {
                "text-base md:text-lg leading-relaxed": variant === "body",
                "text-xl md:text-2xl font-light text-foreground/70": variant === "lead",
                "text-sm uppercase tracking-wider font-medium text-muted-foreground": variant === "caption",
                "font-mono text-xs text-signal": variant === "code",
            },
            className
        )}>
            {children}
        </p>
    );
};

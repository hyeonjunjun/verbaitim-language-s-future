import { cn } from "@/lib/utils";
import { ReactNode } from "react";

// Editorial Headline (Display Serif)
export const Headline = ({ children, className, as: Component = "h1" }: { children: ReactNode, className?: string, as?: "h1" | "h2" | "h3" | "h4" }) => {
    return (
        <Component className={cn(
            "font-display font-medium text-foreground tracking-tight leading-[1.1]",
            {
                "text-5xl md:text-6xl lg:text-7xl": Component === "h1",
                "text-3xl md:text-4xl lg:text-5xl": Component === "h2",
                "text-2xl md:text-3xl": Component === "h3",
                "text-xl md:text-2xl": Component === "h4",
            },
            className
        )}>
            {children}
        </Component>
    );
};

// Technical Text (Monospace/Sans/Serif Reading)
export const Text = ({ children, className, variant = "body" }: { children: ReactNode, className?: string, variant?: "body" | "caption" | "lead" | "code" | "reading" }) => {
    return (
        <p className={cn(
            "text-foreground/85 antialiased",
            {
                "font-body text-base md:text-lg leading-relaxed": variant === "body",
                "font-body text-xl md:text-2xl font-light text-foreground/70": variant === "lead",
                "font-body text-sm uppercase tracking-wider font-medium text-muted-foreground": variant === "caption",
                "font-mono text-xs text-signal": variant === "code",
                "font-reading text-lg md:text-xl leading-relaxed text-foreground/90": variant === "reading",
            },
            className
        )}>
            {children}
        </p>
    );
};

import { ShieldCheck } from "lucide-react";
import { cn } from "@/lib/utils";

interface LogoProps {
  className?: string;
  showText?: boolean;
  size?: "sm" | "md" | "lg";
}

export function Logo({ className, showText = true, size = "md" }: LogoProps) {
  const dims = size === "sm" ? "h-8 w-8" : size === "lg" ? "h-11 w-11" : "h-9 w-9";
  const iconSize = size === "sm" ? 18 : size === "lg" ? 26 : 22;
  const textSize = size === "sm" ? "text-base" : size === "lg" ? "text-xl" : "text-lg";

  return (
    <div className={cn("flex items-center gap-2.5", className)}>
      <div className={cn("relative grid place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-secondary/15 ring-1 ring-primary/30", dims)}>
        <div className="absolute inset-0 rounded-xl bg-primary/10 blur-md" />
        <ShieldCheck size={iconSize} className="relative text-secondary" strokeWidth={2.2} />
      </div>
      {showText && (
        <div className="flex flex-col leading-none">
          <span className={cn("font-bold tracking-tight text-foreground", textSize)}>
            TruthShield
          </span>
          <span className="text-[10px] font-medium uppercase tracking-[0.2em] text-secondary/80">
            AI Platform
          </span>
        </div>
      )}
    </div>
  );
}

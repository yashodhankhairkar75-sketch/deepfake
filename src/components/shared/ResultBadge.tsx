import { cn } from "@/lib/utils";
import { verdictStyle } from "@/lib/format";
import type { ResultVerdict } from "@/data/dummy-data";

interface ResultBadgeProps {
  verdict: ResultVerdict;
  className?: string;
  size?: "sm" | "md" | "lg";
  glow?: boolean;
}

export function ResultBadge({ verdict, className, size = "md", glow = false }: ResultBadgeProps) {
  const s = verdictStyle(verdict);
  const sizes = {
    sm: "px-2.5 py-1 text-[10px]",
    md: "px-3 py-1.5 text-xs",
    lg: "px-4 py-2 text-sm",
  };
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-bold uppercase tracking-wider",
        s.text,
        s.bg,
        s.border,
        sizes[size],
        glow && s.glow,
        className
      )}
    >
      <span className="relative flex h-1.5 w-1.5">
        <span className={cn("absolute inline-flex h-full w-full animate-ping rounded-full opacity-75", `bg-current`)} />
        <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-current" />
      </span>
      {verdict}
    </span>
  );
}

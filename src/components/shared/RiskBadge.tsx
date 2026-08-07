import { cn } from "@/lib/utils";
import { riskColor } from "@/lib/format";
import type { RiskLevel } from "@/data/dummy-data";
import { AlertTriangle, ShieldAlert, ShieldCheck, ShieldQuestion } from "lucide-react";

interface RiskBadgeProps {
  risk: RiskLevel;
  className?: string;
  showIcon?: boolean;
  size?: "sm" | "md";
}

export function RiskBadge({ risk, className, showIcon = true, size = "md" }: RiskBadgeProps) {
  const c = riskColor(risk);
  const Icon =
    risk === "CRITICAL" || risk === "HIGH"
      ? ShieldAlert
      : risk === "MEDIUM"
      ? AlertTriangle
      : risk === "LOW"
      ? ShieldCheck
      : ShieldQuestion;

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border font-semibold",
        c.text,
        c.bg,
        c.border,
        size === "sm" ? "px-2 py-0.5 text-[10px]" : "px-2.5 py-1 text-xs",
        className
      )}
    >
      {showIcon && <Icon size={size === "sm" ? 11 : 13} strokeWidth={2.4} />}
      {c.label}
    </span>
  );
}

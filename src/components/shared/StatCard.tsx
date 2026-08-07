import { motion } from "framer-motion";
import { TrendingUp, TrendingDown, type LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";

interface StatCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: number; // positive/negative percentage
  trendLabel?: string;
  accent?: "primary" | "secondary" | "danger" | "success" | "warning";
  index?: number;
  suffix?: string;
}

const accentMap = {
  primary: { ring: "ring-primary/25", text: "text-primary", glow: "glow-blue", bg: "bg-primary/10" },
  secondary: { ring: "ring-secondary/25", text: "text-secondary", glow: "glow-cyan", bg: "bg-secondary/10" },
  danger: { ring: "ring-destructive/25", text: "text-destructive", glow: "glow-red", bg: "bg-destructive/10" },
  success: { ring: "ring-success/25", text: "text-success", glow: "glow-green", bg: "bg-success/10" },
  warning: { ring: "ring-warning/25", text: "text-warning", glow: "", bg: "bg-warning/10" },
};

export function StatCard({
  label,
  value,
  icon: Icon,
  trend,
  trendLabel,
  accent = "primary",
  index = 0,
  suffix,
}: StatCardProps) {
  const a = accentMap[accent];
  const isUp = (trend ?? 0) >= 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, delay: index * 0.07, ease: "easeOut" }}
      whileHover={{ y: -4 }}
    >
      <Card className={cn("glass relative overflow-hidden p-5 ring-1 transition-colors hover:ring-primary/30", a.ring)}>
        <div className="absolute right-0 top-0 h-24 w-24 -translate-y-8 translate-x-8 rounded-full opacity-40 blur-2xl" style={{ background: "currentColor" }} />
        <div className="relative flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium text-muted-foreground">{label}</p>
            <p className="text-3xl font-bold tracking-tight text-foreground">
              {value}
              {suffix && <span className="ml-0.5 text-xl font-semibold text-muted-foreground">{suffix}</span>}
            </p>
          </div>
          <div className={cn("grid h-11 w-11 place-items-center rounded-xl ring-1", a.bg, a.ring)}>
            <Icon size={20} className={a.text} strokeWidth={2.2} />
          </div>
        </div>
        {(trend !== undefined || trendLabel) && (
          <div className="relative mt-4 flex items-center gap-2 text-xs">
            {trend !== undefined && (
              <span className={cn("inline-flex items-center gap-1 rounded-md px-1.5 py-0.5 font-semibold", isUp ? "bg-success/15 text-success" : "bg-destructive/15 text-destructive")}>
                {isUp ? <TrendingUp size={12} /> : <TrendingDown size={12} />}
                {isUp ? "+" : ""}{trend}%
              </span>
            )}
            {trendLabel && <span className="text-muted-foreground">{trendLabel}</span>}
          </div>
        )}
      </Card>
    </motion.div>
  );
}

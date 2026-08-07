import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { CheckCircle2, AlertTriangle, Info } from "lucide-react";

interface RecommendationCardProps {
  text: string;
  priority: "high" | "medium" | "low";
  index?: number;
}

const config = {
  high: { Icon: AlertTriangle, text: "text-red-300", bg: "bg-red-500/15", border: "border-red-500/40", label: "Critical" },
  medium: { Icon: Info, text: "text-yellow-300", bg: "bg-yellow-500/15", border: "border-yellow-500/40", label: "Important" },
  low: { Icon: CheckCircle2, text: "text-emerald-300", bg: "bg-emerald-500/15", border: "border-emerald-500/40", label: "Recommended" },
} as const;

export function RecommendationCard({ text, priority, index = 0 }: RecommendationCardProps) {
  const c = config[priority];
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
    >
      <Card className={cn("glass flex items-start gap-3 border-l-2 p-4 ring-1 ring-transparent transition-colors hover:ring-primary/30", c.border)}>
        <div className={cn("mt-0.5 grid h-8 w-8 shrink-0 place-items-center rounded-lg", c.bg)}>
          <c.Icon size={16} className={c.text} />
        </div>
        <div className="flex-1">
          <span className={cn("inline-block rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide", c.bg, c.text)}>
            {c.label}
          </span>
          <p className="mt-1.5 text-sm leading-relaxed text-foreground/90">{text}</p>
        </div>
      </Card>
    </motion.div>
  );
}

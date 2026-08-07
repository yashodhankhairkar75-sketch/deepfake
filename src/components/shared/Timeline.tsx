import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { CheckCircle2, XCircle, AlertTriangle } from "lucide-react";

interface TimelineItem {
  score: number;
  status: "fail" | "warn" | "pass";
}

interface TimelineProps {
  items: TimelineItem[];
  index?: number;
}

/** Compact horizontal pipeline timeline for analysis breakdown. */
export function Timeline({ items, index = 0 }: TimelineProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.05 }}
      className="flex items-center gap-1"
    >
      {items.map((item, i) => {
        const Icon = item.status === "pass" ? CheckCircle2 : item.status === "warn" ? AlertTriangle : XCircle;
        const color =
          item.status === "pass" ? "text-emerald-400 bg-emerald-500/15 ring-emerald-500/30"
          : item.status === "warn" ? "text-yellow-400 bg-yellow-500/15 ring-yellow-500/30"
          : "text-red-400 bg-red-500/15 ring-red-500/30";
        return (
          <div key={i} className="flex items-center">
            <div className={cn("grid h-7 w-7 place-items-center rounded-lg ring-1", color)}>
              <Icon size={14} strokeWidth={2.4} />
            </div>
            {i < items.length - 1 && <div className="h-px w-6 bg-border" />}
          </div>
        );
      })}
    </motion.div>
  );
}

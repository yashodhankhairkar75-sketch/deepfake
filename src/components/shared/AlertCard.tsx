import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { riskColor } from "@/lib/format";
import type { AlertItem } from "@/data/dummy-data";
import { ShieldAlert, AlertTriangle, ShieldCheck, Bell } from "lucide-react";

interface AlertCardProps {
  alert: AlertItem;
  index?: number;
}

const sevIcon = (sev: AlertItem["severity"]) =>
  sev === "CRITICAL" || sev === "HIGH" ? ShieldAlert : sev === "MEDIUM" ? AlertTriangle : ShieldCheck;

export function AlertCard({ alert, index = 0 }: AlertCardProps) {
  const c = riskColor(alert.severity);
  const Icon = sevIcon(alert.severity);
  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Card className={cn("glass flex items-start gap-3 p-4 ring-1 transition-colors hover:ring-primary/30", c.border, "border-l-2")}>
        <div className={cn("mt-0.5 grid h-9 w-9 shrink-0 place-items-center rounded-lg", c.bg)}>
          <Icon size={17} className={c.text} />
        </div>
        <div className="min-w-0 flex-1 space-y-1">
          <div className="flex items-start justify-between gap-2">
            <p className="truncate text-sm font-semibold text-foreground">{alert.title}</p>
            <span className="shrink-0 text-[11px] text-muted-foreground">{alert.time}</span>
          </div>
          <p className="line-clamp-2 text-xs text-muted-foreground">{alert.description}</p>
          <div className="flex items-center gap-2 pt-1">
            <span className={cn("inline-flex items-center gap-1 rounded-full px-2 py-0.5 text-[10px] font-semibold", c.bg, c.text)}>
              <Bell size={9} /> {c.label}
            </span>
            <span className="truncate text-[11px] text-muted-foreground">{alert.source}</span>
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

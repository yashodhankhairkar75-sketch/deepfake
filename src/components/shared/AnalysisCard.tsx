import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { verdictStyle } from "@/lib/format";
import type { AnalysisRecord } from "@/data/dummy-data";
import type { ResultVerdict } from "@/data/dummy-data";
import { Video, AudioLines, Image as ImageIcon, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";

interface AnalysisCardProps {
  record: AnalysisRecord;
  index?: number;
  linkTo?: string;
}

const mediaIcon = (t: AnalysisRecord["mediaType"]) =>
  t === "Video" ? Video : t === "Audio" ? AudioLines : ImageIcon;

export function AnalysisCard({ record, index = 0, linkTo = "/result" }: AnalysisCardProps) {
  const v = verdictStyle(record.verdict);
  const Icon = mediaIcon(record.mediaType);

  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
      whileHover={{ y: -3 }}
    >
      <Link to={linkTo}>
        <Card className="glass group flex items-center gap-4 p-4 ring-1 ring-transparent transition-all hover:ring-primary/30">
          {/* media thumb */}
          <div className="relative grid h-14 w-14 shrink-0 place-items-center overflow-hidden rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 ring-1 ring-primary/20">
            <Icon size={22} className="text-secondary" />
            <div className={cn("absolute inset-x-0 bottom-0 h-1", `bg-current`, v.text)} />
          </div>

          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-2">
              <p className="truncate text-sm font-semibold text-foreground">{record.fileName}</p>
            </div>
            <div className="mt-1 flex items-center gap-2 text-[11px] text-muted-foreground">
              <span className="font-mono">{record.id}</span>
              <span>·</span>
              <span>{record.mediaType}</span>
              <span>·</span>
              <span>{record.fileSize}</span>
            </div>
            <div className="mt-2 flex items-center gap-2">
              <span className={cn("inline-flex items-center rounded-full px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide", v.bg, v.text, "border", v.border)}>
                {record.verdict}
              </span>
              <span className="text-[11px] text-muted-foreground">
                Trust <span className={cn("font-semibold", v.text === "text-emerald-300" ? "text-emerald-300" : v.text === "text-red-300" ? "text-red-300" : "text-yellow-300")}>{record.trustScore}</span>
              </span>
            </div>
          </div>

          <ChevronRight size={18} className="shrink-0 text-muted-foreground transition-transform group-hover:translate-x-1 group-hover:text-primary" />
        </Card>
      </Link>
    </motion.div>
  );
}

export type { ResultVerdict };

import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import type { UploadItem } from "@/data/dummy-data";
import { Video, AudioLines, Image as ImageIcon, CheckCircle2, Loader2, Clock, XCircle } from "lucide-react";

interface UploadCardProps {
  upload: UploadItem;
  index?: number;
}

const mediaIcon = (t: UploadItem["mediaType"]) =>
  t === "Video" ? Video : t === "Audio" ? AudioLines : ImageIcon;

const statusConfig = {
  completed: { Icon: CheckCircle2, text: "text-emerald-400", label: "Completed", spin: false },
  processing: { Icon: Loader2, text: "text-primary", label: "Processing", spin: true },
  queued: { Icon: Clock, text: "text-yellow-400", label: "Queued", spin: false },
  failed: { Icon: XCircle, text: "text-destructive", label: "Failed", spin: false },
} as const;

export function UploadCard({ upload, index = 0 }: UploadCardProps) {
  const Icon = mediaIcon(upload.mediaType);
  const st = statusConfig[upload.status];

  return (
    <motion.div
      initial={{ opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: index * 0.06 }}
    >
      <Card className="glass p-4 ring-1 ring-transparent transition-colors hover:ring-primary/30">
        <div className="flex items-center gap-3">
          <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
            <Icon size={18} className="text-secondary" />
          </div>
          <div className="min-w-0 flex-1">
            <div className="flex items-center justify-between gap-2">
              <p className="truncate text-sm font-medium text-foreground">{upload.fileName}</p>
              <span className={cn("flex items-center gap-1 text-[11px] font-medium", st.text)}>
                <st.Icon size={13} className={st.spin ? "animate-spin" : ""} />
                {st.label}
              </span>
            </div>
            <div className="mt-1 flex items-center justify-between text-[11px] text-muted-foreground">
              <span>{upload.fileSize} · {upload.mediaType}</span>
              <span className="tabular-nums">{upload.progress}%</span>
            </div>
            {upload.status === "processing" && (
              <div className="relative mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
                <motion.div
                  className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-secondary"
                  initial={{ width: 0 }}
                  animate={{ width: `${upload.progress}%` }}
                  transition={{ duration: 1, ease: "easeOut" }}
                />
              </div>
            )}
            {upload.status === "completed" && (
              <div className="mt-2 h-1.5 w-full rounded-full bg-emerald-500/30" />
            )}
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

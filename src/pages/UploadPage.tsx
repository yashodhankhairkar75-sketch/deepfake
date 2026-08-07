import { useState, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud, Video, AudioLines, Image as ImageIcon, FileCheck2,
  X, Sparkles, FileType2, HardDrive, CheckCircle2, ArrowRight,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/shared/PageHeader";
import { UploadCard } from "@/components/shared/UploadCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { supportedFormats, recentUploads } from "@/data/dummy-data";

interface LocalUpload {
  id: string;
  fileName: string;
  mediaType: "Video" | "Audio" | "Image";
  status: "processing" | "completed";
  progress: number;
  fileSize: string;
}

const formatIcon = (icon: string) =>
  icon === "video" ? Video : icon === "audio" ? AudioLines : ImageIcon;

function detectType(name: string): "Video" | "Audio" | "Image" {
  const ext = name.split(".").pop()?.toLowerCase() ?? "";
  if (["mp4", "mov", "avi", "mkv", "webm"].includes(ext)) return "Video";
  if (["wav", "mp3", "aac", "flac", "ogg"].includes(ext)) return "Audio";
  return "Image";
}

function Dropzone() {
  const navigate = useNavigate();
  const [dragging, setDragging] = useState(false);
  const [uploads, setUploads] = useState<LocalUpload[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const addFiles = useCallback((files: FileList | null) => {
    if (!files) return;
    Array.from(files).forEach((file) => {
      const id = `local-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`;
      const mediaType = detectType(file.name);
      const sizeMB = (file.size / (1024 * 1024)).toFixed(1);
      const newUpload: LocalUpload = {
        id,
        fileName: file.name,
        mediaType,
        status: "processing",
        progress: 0,
        fileSize: `${sizeMB} MB`,
      };
      setUploads((prev) => [newUpload, ...prev]);

      // simulate upload progress
      let p = 0;
      const interval = setInterval(() => {
        p += Math.random() * 22 + 8;
        if (p >= 100) {
          p = 100;
          clearInterval(interval);
          setUploads((prev) =>
            prev.map((u) => (u.id === id ? { ...u, progress: 100, status: "completed" } : u))
          );
          // navigate to analysis after a short delay
          setTimeout(() => navigate("/analyze"), 700);
        } else {
          setUploads((prev) => prev.map((u) => (u.id === id ? { ...u, progress: Math.round(p) } : u)));
        }
      }, 320);
    });
  }, [navigate]);

  return (
    <div className="space-y-4">
      <div
        onDragOver={(e) => { e.preventDefault(); setDragging(true); }}
        onDragLeave={() => setDragging(false)}
        onDrop={(e) => {
          e.preventDefault();
          setDragging(false);
          addFiles(e.dataTransfer.files);
        }}
        onClick={() => inputRef.current?.click()}
        className={cn(
          "relative cursor-pointer overflow-hidden rounded-2xl border-2 border-dashed p-10 text-center transition-all sm:p-16",
          dragging
            ? "border-primary bg-primary/10 scale-[1.01] glow-blue"
            : "border-border bg-muted/20 hover:border-primary/50 hover:bg-muted/30"
        )}
      >
        <input
          ref={inputRef}
          type="file"
          multiple
          accept="video/*,audio/*,image/*"
          className="hidden"
          onChange={(e) => addFiles(e.target.files)}
        />
        {/* animated rings when dragging */}
        {dragging && (
          <>
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/40 pulse-ring" />
            <div className="pointer-events-none absolute left-1/2 top-1/2 h-32 w-32 -translate-x-1/2 -translate-y-1/2 rounded-full border-2 border-primary/40 pulse-ring" style={{ animationDelay: "0.8s" }} />
          </>
        )}
        <motion.div
          animate={dragging ? { scale: 1.15, y: -6 } : { scale: 1, y: 0 }}
          transition={{ type: "spring", stiffness: 260, damping: 18 }}
          className="mx-auto grid h-20 w-20 place-items-center rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/15 ring-1 ring-primary/30 glow-blue"
        >
          <UploadCloud size={36} className="text-secondary" strokeWidth={2} />
        </motion.div>
        <h3 className="mt-6 text-xl font-bold text-foreground">
          {dragging ? "Release to upload" : "Drag & drop your media here"}
        </h3>
        <p className="mx-auto mt-2 max-w-md text-sm text-muted-foreground">
          or <span className="font-semibold text-secondary">browse files</span> from your device.
          Supports video, audio, and images up to 500 MB.
        </p>
        <div className="mt-6 flex items-center justify-center gap-4">
          {[Video, AudioLines, ImageIcon].map((Icon, i) => (
            <div key={i} className="flex items-center gap-1.5 rounded-lg bg-muted/50 px-3 py-1.5 text-xs text-muted-foreground">
              <Icon size={14} className="text-secondary" />
              {["Video", "Audio", "Image"][i]}
            </div>
          ))}
        </div>
      </div>

      {/* Active uploads */}
      <AnimatePresence>
        {uploads.length > 0 && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="space-y-3"
          >
            <div className="flex items-center justify-between">
              <p className="text-sm font-semibold text-foreground">Uploading now</p>
              <button
                onClick={() => setUploads([])}
                className="text-xs text-muted-foreground hover:text-destructive"
              >
                Clear
              </button>
            </div>
            {uploads.map((u, i) => (
              <div key={u.id} className="relative">
                <UploadCard
                  upload={{ ...u, id: u.id, date: new Date().toISOString(), status: u.status === "completed" ? "completed" : "processing" }}
                  index={i}
                />
                <button
                  onClick={() => setUploads((prev) => prev.filter((x) => x.id !== u.id))}
                  className="absolute right-3 top-3 grid h-6 w-6 place-items-center rounded-md text-muted-foreground hover:bg-destructive/15 hover:text-destructive"
                >
                  <X size={13} />
                </button>
              </div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

export default function UploadPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Upload Media"
        description="Drag and drop a file to begin AI authenticity analysis"
        icon={UploadCloud}
      />

      <div className="grid gap-6 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <Dropzone />

          {/* Supported formats */}
          <Card className="glass p-6">
            <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
              <FileType2 size={17} className="text-secondary" /> Supported Formats
            </h3>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              {supportedFormats.map((f) => {
                const Icon = formatIcon(f.icon);
                return (
                  <div key={f.type} className="rounded-xl border border-border bg-muted/30 p-4 transition-colors hover:border-primary/30">
                    <div className="flex items-center gap-2.5">
                      <div className="grid h-10 w-10 place-items-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                        <Icon size={18} className="text-secondary" />
                      </div>
                      <div>
                        <p className="text-sm font-semibold text-foreground">{f.type}</p>
                        <p className="flex items-center gap-1 text-[11px] text-muted-foreground">
                          <HardDrive size={10} /> Max {f.maxSize}
                        </p>
                      </div>
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {f.formats.map((fmt) => (
                        <span key={fmt} className="rounded-md bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                          {fmt}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </Card>
        </div>

        {/* Right column: recent uploads + tip */}
        <div className="space-y-4">
          <Card className="glass p-5">
            <div className="flex items-center gap-2">
              <Sparkles size={17} className="text-secondary" />
              <h3 className="text-sm font-semibold text-foreground">Recent Uploads</h3>
            </div>
            <div className="mt-4 space-y-3">
              {recentUploads.map((u, i) => (
                <UploadCard key={u.id} upload={u} index={i} />
              ))}
            </div>
          </Card>

          <Card className="glass relative overflow-hidden p-5 ring-1 ring-primary/20">
            <div className="absolute -right-8 -top-8 h-24 w-24 rounded-full bg-success/15 blur-2xl" />
            <div className="relative">
              <div className="flex items-center gap-2">
                <CheckCircle2 size={17} className="text-success" />
                <h3 className="text-sm font-semibold text-foreground">Privacy Guaranteed</h3>
              </div>
              <p className="mt-2 text-xs leading-relaxed text-muted-foreground">
                All uploads are processed in an encrypted sandbox and automatically purged after analysis. Your media is never stored or shared.
              </p>
            </div>
          </Card>

          <Card className="glass p-5">
            <h3 className="text-sm font-semibold text-foreground">Analysis Pipeline</h3>
            <div className="mt-3 space-y-2">
              {["Extract Frames", "Analyze Face & Voice", "Detect Artifacts", "Generate Report"].map((step, i) => (
                <div key={step} className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="grid h-5 w-5 place-items-center rounded-full bg-primary/15 text-[10px] font-bold text-secondary">{i + 1}</span>
                  {step}
                </div>
              ))}
            </div>
            <Button asChild variant="outline" size="sm" className="mt-4 w-full border-border bg-transparent hover:bg-muted">
              <a href="/analyze">See Live Analysis <ArrowRight size={13} className="ml-1" /></a>
            </Button>
          </Card>
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  UploadCloud, Film, ScanFace, AudioLines, Fingerprint, Calculator, FileText,
  CheckCircle2, Loader2, Sparkles, ShieldCheck, Clock,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Card } from "@/components/ui/card";
import { analysisSteps } from "@/data/dummy-data";

const stepIcons = [UploadCloud, Film, ScanFace, AudioLines, Fingerprint, Calculator, FileText];

export default function AnalyzePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [progress, setProgress] = useState(0);
  const totalSteps = analysisSteps.length;
  const stepDuration = 1500; // ms per step

  useEffect(() => {
    const stepInterval = setInterval(() => {
      setCurrentStep((s) => {
        if (s >= totalSteps - 1) {
          clearInterval(stepInterval);
          setTimeout(() => navigate("/result"), 800);
          return s;
        }
        return s + 1;
      });
    }, stepDuration);

    const progressInterval = setInterval(() => {
      setProgress((p) => {
        const next = p + 100 / (totalSteps * (stepDuration / 50));
        return Math.min(next, 100);
      });
    }, 50);

    return () => {
      clearInterval(stepInterval);
      clearInterval(progressInterval);
    };
  }, [navigate, totalSteps]);

  const remainingSec = Math.max(0, Math.ceil(((totalSteps - 1 - currentStep) * stepDuration) / 1000));

  return (
    <div className="mx-auto max-w-3xl space-y-6 py-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -12 }}
        animate={{ opacity: 1, y: 0 }}
        className="text-center"
      >
        <div className="inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-secondary">
          <Sparkles size={13} /> AI Analysis In Progress
        </div>
        <h1 className="mt-5 text-3xl font-bold tracking-tight text-foreground">
          Analyzing your media
        </h1>
        <p className="mt-2 text-sm text-muted-foreground">
          Our multi-model pipeline is scanning every frame and audio sample for synthetic artifacts.
        </p>
      </motion.div>

      {/* Central animated scanner */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass relative mx-auto grid h-64 w-64 place-items-center overflow-hidden rounded-3xl ring-1 ring-primary/30 glow-blue">
          {/* scanning line */}
          <div className="scan-line absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-secondary to-transparent shadow-[0_0_20px_rgba(34,211,238,0.8)]" />
          {/* concentric rings */}
          <div className="absolute h-40 w-40 rounded-full border-2 border-primary/20 pulse-ring" />
          <div className="absolute h-40 w-40 rounded-full border-2 border-primary/20 pulse-ring" style={{ animationDelay: "1.2s" }} />
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="relative grid h-24 w-24 place-items-center rounded-full bg-gradient-to-br from-primary/25 to-secondary/15 ring-1 ring-primary/40"
          >
            <ShieldCheck size={44} className="text-secondary" strokeWidth={2} />
          </motion.div>
          <div className="absolute bottom-4 text-3xl font-bold tabular-nums text-secondary">
            {Math.round(progress)}%
          </div>
        </Card>
      </motion.div>

      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span className="flex items-center gap-1.5"><Clock size={12} /> Estimated remaining: {remainingSec}s</span>
          <span className="tabular-nums">{Math.round(progress)}%</span>
        </div>
        <div className="relative h-2 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="absolute inset-y-0 left-0 rounded-full bg-gradient-to-r from-primary to-secondary"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      {/* Pipeline steps */}
      <Card className="glass p-6">
        <h3 className="text-sm font-semibold text-foreground">Analysis Pipeline</h3>
        <div className="mt-5 space-y-1">
          {analysisSteps.map((step, i) => {
            const done = i < currentStep;
            const active = i === currentStep;
            const Icon = stepIcons[i];
            return (
              <motion.div
                key={step.id}
                initial={{ opacity: 0, x: -16 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className={cn(
                  "flex items-center gap-4 rounded-xl px-4 py-3 transition-colors",
                  active && "bg-primary/10 ring-1 ring-primary/30",
                  done && "opacity-70"
                )}
              >
                <div className={cn(
                  "grid h-10 w-10 shrink-0 place-items-center rounded-xl ring-1 transition-all",
                  done && "bg-success/15 text-success ring-success/30",
                  active && "bg-primary/15 text-secondary ring-primary/40 glow-blue",
                  !done && !active && "bg-muted/40 text-muted-foreground ring-border"
                )}>
                  {done ? (
                    <CheckCircle2 size={20} />
                  ) : active ? (
                    <Loader2 size={20} className="animate-spin" />
                  ) : (
                    <Icon size={18} />
                  )}
                </div>
                <div className="flex-1">
                  <p className={cn("text-sm font-medium", active ? "text-foreground" : "text-muted-foreground")}>
                    {step.label}
                  </p>
                  <AnimatePresence>
                    {active && (
                      <motion.p
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="text-xs text-muted-foreground"
                      >
                        {step.description}
                      </motion.p>
                    )}
                  </AnimatePresence>
                </div>
                {done && <span className="text-xs font-medium text-success">Done</span>}
                {active && <span className="text-xs font-medium text-secondary">Processing</span>}
              </motion.div>
            );
          })}
        </div>
      </Card>

      <p className="text-center text-xs text-muted-foreground">
        Please keep this page open. You'll be redirected to your results automatically.
      </p>
    </div>
  );
}

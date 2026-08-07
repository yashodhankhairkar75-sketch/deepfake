import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck, Download, Share2, AlertTriangle, FileText, ChevronLeft,
  Video, AudioLines, Image as ImageIcon, Clock, HardDrive, CheckCircle2,
  XCircle, AlertCircle, ScanFace, Brain,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/shared/PageHeader";
import { TrustGauge } from "@/components/shared/TrustGauge";
import { ResultBadge } from "@/components/shared/ResultBadge";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { RecommendationCard } from "@/components/shared/RecommendationCard";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { sampleResult } from "@/data/dummy-data";
import { scoreColor, formatDateTime } from "@/lib/format";

const mediaIcon = { Video, AudioLines, Image: ImageIcon } as const;
const MediaIcon = mediaIcon[sampleResult.mediaType as keyof typeof mediaIcon] ?? Video;

function MetricCard({ label, value, max = 100, accent }: { label: string; value: number; max?: number; accent: string }) {
  return (
    <Card className="glass p-4 ring-1 ring-transparent transition-colors hover:ring-primary/30">
      <p className="text-xs text-muted-foreground">{label}</p>
      <p className={cn("mt-1 text-2xl font-bold tabular-nums", accent)}>
        {value}<span className="text-sm text-muted-foreground">/{max}</span>
      </p>
      <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
        <motion.div
          className="h-full rounded-full"
          style={{ background: accent.includes("emerald") ? "#22c55e" : accent.includes("red") ? "#ef4444" : "#eab308" }}
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 1, ease: "easeOut" }}
        />
      </div>
    </Card>
  );
}

function BreakdownRow({ item, index }: { item: { label: string; score: number; status: string; detail: string }; index: number }) {
  const Icon = item.status === "pass" ? CheckCircle2 : item.status === "warn" ? AlertCircle : XCircle;
  const color = item.status === "pass" ? "text-emerald-400" : item.status === "warn" ? "text-yellow-400" : "text-red-400";
  const bg = item.status === "pass" ? "bg-emerald-500/15 ring-emerald-500/30" : item.status === "warn" ? "bg-yellow-500/15 ring-yellow-500/30" : "bg-red-500/15 ring-red-500/30";

  return (
    <motion.div
      initial={{ opacity: 0, x: -16 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, delay: index * 0.08 }}
    >
      <Card className="glass p-5 ring-1 ring-transparent transition-colors hover:ring-primary/30">
        <div className="flex items-start justify-between gap-4">
          <div className="flex items-start gap-3">
            <div className={cn("grid h-9 w-9 shrink-0 place-items-center rounded-lg ring-1", bg)}>
              <Icon size={17} className={color} />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">{item.label}</p>
              <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{item.detail}</p>
            </div>
          </div>
          <div className="text-right">
            <p className={cn("text-2xl font-bold tabular-nums", color)}>{item.score}</p>
            <p className="text-[10px] uppercase tracking-wide text-muted-foreground">/ 100</p>
          </div>
        </div>
        <div className="mt-3 h-1.5 w-full overflow-hidden rounded-full bg-muted">
          <motion.div
            className="h-full rounded-full"
            style={{ background: color.includes("emerald") ? "#22c55e" : color.includes("yellow") ? "#eab308" : "#ef4444" }}
            initial={{ width: 0 }}
            animate={{ width: `${item.score}%` }}
            transition={{ duration: 1, delay: index * 0.08, ease: "easeOut" }}
          />
        </div>
      </Card>
    </motion.div>
  );
}

export default function ResultPage() {
  const r = sampleResult;
  const trustColor = scoreColor(r.trustScore);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analysis Result"
        description={`${r.fileName} · ${formatDateTime(r.date)}`}
        icon={ShieldCheck}
        action={
          <Button asChild variant="outline" size="sm" className="border-border bg-transparent hover:bg-muted">
            <Link to="/history"><ChevronLeft size={15} className="mr-1" /> Back to History</Link>
          </Button>
        }
      />

      {/* Top: verdict + gauges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Card className="glass relative overflow-hidden p-6 ring-1 ring-primary/20 sm:p-8">
          <div className="absolute -right-16 -top-16 h-56 w-56 rounded-full bg-red-500/10 blur-3xl" />
          <div className="relative grid gap-8 lg:grid-cols-[auto_1fr]">
            {/* Gauge */}
            <div className="flex flex-col items-center justify-center">
              <TrustGauge score={r.trustScore} size={240} label="Trust Score" sublabel={`${r.mediaType} Analysis`} />
              <div className="mt-4 flex items-center gap-2">
                <ResultBadge verdict={r.verdict} size="lg" glow />
                <RiskBadge risk={r.risk} size="md" />
              </div>
            </div>

            {/* Right: file info + metrics */}
            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 ring-1 ring-primary/30">
                  <MediaIcon size={22} className="text-secondary" />
                </div>
                <div className="min-w-0">
                  <p className="truncate text-lg font-bold text-foreground">{r.fileName}</p>
                  <div className="mt-1 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs text-muted-foreground">
                    <span className="flex items-center gap-1"><Clock size={11} /> {r.duration}</span>
                    <span className="flex items-center gap-1"><HardDrive size={11} /> {r.fileSize}</span>
                    <span className="flex items-center gap-1"><FileText size={11} /> Report ID: TS-2401</span>
                  </div>
                </div>
              </div>

              {/* Metric grid */}
              <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-4">
                <MetricCard label="Authenticity" value={r.authenticity} accent={r.authenticity >= 70 ? "text-emerald-400" : r.authenticity >= 40 ? "text-yellow-400" : "text-red-400"} />
                <MetricCard label="AI Confidence" value={r.confidence} accent="text-secondary" />
                <MetricCard label="Deepfake Probability" value={r.deepfakeProbability} accent={r.deepfakeProbability >= 60 ? "text-red-400" : "text-yellow-400"} />
                <MetricCard label="Social Eng. Risk" value={r.socialEngineeringRisk} accent={r.socialEngineeringRisk >= 60 ? "text-red-400" : "text-yellow-400"} />
              </div>

              {/* Action buttons */}
              <div className="flex flex-wrap gap-3">
                <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90">
                  <Download size={16} className="mr-2" /> Download Report (PDF)
                </Button>
                <Button variant="outline" className="border-border bg-transparent hover:bg-muted">
                  <Share2 size={16} className="mr-2" /> Share Result
                </Button>
                <Button asChild variant="outline" className="border-border bg-transparent hover:bg-muted">
                  <Link to="/upload"><ScanFace size={16} className="mr-2" /> Analyze Another</Link>
                </Button>
              </div>
            </div>
          </div>
        </Card>
      </motion.div>

      {/* Why this verdict */}
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="glass p-6 ring-1 ring-primary/15 lg:col-span-1">
          <div className="flex items-center gap-2">
            <AlertTriangle size={18} className="text-destructive" />
            <h3 className="text-base font-semibold text-foreground">Why it's flagged</h3>
          </div>
          <ul className="mt-4 space-y-3">
            {r.reasons.map((reason, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, x: -12 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="flex items-start gap-2.5 text-sm text-foreground/90"
              >
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-destructive" />
                {reason}
              </motion.li>
            ))}
          </ul>
        </Card>

        {/* AI summary */}
        <Card className="glass relative overflow-hidden p-6 ring-1 ring-primary/20 lg:col-span-2">
          <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl" />
          <div className="relative">
            <div className="flex items-center gap-2">
              <Brain size={18} className="text-secondary" />
              <h3 className="text-base font-semibold text-foreground">AI Explanation Summary</h3>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
              This {r.mediaType.toLowerCase()} file has a <span className="font-semibold text-red-300">trust score of {r.trustScore}/100</span> and is
              classified as <span className="font-semibold text-red-300">{r.verdict}</span> with{" "}
              <span className="font-semibold text-secondary">{r.confidence}% AI confidence</span>. The analysis detected{" "}
              <span className="font-semibold text-red-300">{r.deepfakeProbability}% deepfake probability</span> and{" "}
              <span className="font-semibold text-red-300">{r.socialEngineeringRisk}% social engineering risk</span>.
            </p>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Key indicators include lip sync desynchronization, a voice fingerprint consistent with known
              cloning models, and unnatural facial landmark behavior. The content's script also exhibits
              urgency cues typical of executive impersonation attacks.
            </p>
            <div className="mt-4 flex items-center gap-2 rounded-lg bg-red-500/10 p-3 ring-1 ring-red-500/30">
              <AlertTriangle size={16} className="shrink-0 text-destructive" />
              <p className="text-xs text-red-200">
                High confidence this is a synthetic media social engineering attempt. Follow critical recommendations below.
              </p>
            </div>
          </div>
        </Card>
      </div>

      {/* Detailed breakdown */}
      <div className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <ScanFace size={19} className="text-secondary" /> Detailed Analysis Breakdown
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {r.analysisBreakdown.map((item, i) => (
            <BreakdownRow key={item.label} item={item} index={i} />
          ))}
        </div>
      </div>

      {/* Recommendations */}
      <div className="space-y-3">
        <h2 className="flex items-center gap-2 text-lg font-semibold text-foreground">
          <ShieldCheck size={19} className="text-secondary" /> Recommended Actions
        </h2>
        <div className="grid gap-3 md:grid-cols-2">
          {r.recommendations.map((rec, i) => (
            <RecommendationCard key={rec.id} text={rec.text} priority={rec.priority} index={i} />
          ))}
        </div>
      </div>

      {/* Footer actions */}
      <Card className="glass flex flex-col items-center justify-between gap-4 p-6 ring-1 ring-primary/20 sm:flex-row">
        <div>
          <p className="text-sm font-semibold text-foreground">Need a verified, court-ready report?</p>
          <p className="text-xs text-muted-foreground">Download the full PDF with frame-level evidence and confidence intervals.</p>
        </div>
        <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90">
          <Download size={16} className="mr-2" /> Download Full Report
        </Button>
      </Card>
    </div>
  );
}

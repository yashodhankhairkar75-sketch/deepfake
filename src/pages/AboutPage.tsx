import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  Info, Target, Cpu, Brain, Sparkles, Mail, MapPin, Phone,
  ArrowRight, ShieldCheck, Network, Zap, Lock, FileText, Radar, Gauge,
  BrainCircuit, AudioWaveform, ScanFace, Fingerprint, CheckCircle2,
} from "lucide-react";
import * as Icons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { aboutTimeline, aboutTech, aboutFeatures, landingStats } from "@/data/dummy-data";
import { useCountUp } from "@/hooks/use-count-up";

function StatNumber({ value, label }: { value: string; label: string }) {
  const numeric = parseFloat(value.replace(/[^0-9.]/g, "")) || 0;
  const suffix = value.replace(/[0-9.]/g, "").match(/[a-zA-Z%]+/g)?.join("") ?? "";
  const decimals = value.includes(".") ? 1 : 0;
  const { ref, display } = useCountUp(numeric, 1400, decimals);
  return (
    <div ref={ref as React.RefObject<HTMLDivElement>} className="text-center">
      <div className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
        {display}
        <span className="text-secondary">{suffix}</span>
      </div>
      <div className="mt-1 text-xs text-muted-foreground sm:text-sm">{label}</div>
    </div>
  );
}

function Mission() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Our Mission</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Making truth <span className="text-gradient">verifiable</span> in the age of synthetic media
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Deepfakes and AI-generated voice clones are no longer hypothetical.
              Executive impersonation, fraud, and disinformation campaigns now scale
              at the speed of a prompt. TruthShield AI exists to give every
              organization a fast, explainable way to tell real from fake — before
              the damage is done.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              We believe detection is only half the job. The other half is
              <span className="font-medium text-foreground"> explanation</span> — showing
              exactly why something is fake so security teams, executives, and
              courts can act with confidence.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Button asChild className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90">
                <Link to="/upload"><ShieldCheck size={16} className="mr-2" /> Try It Now</Link>
              </Button>
              <Button asChild variant="outline" className="border-border bg-transparent hover:bg-muted">
                <Link to="/dashboard">View Dashboard <ArrowRight size={15} className="ml-1.5" /></Link>
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="relative"
          >
            <Card className="glass relative overflow-hidden p-8 ring-1 ring-primary/20 glow-blue">
              <div className="absolute -right-12 -top-12 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
              <div className="relative space-y-5">
                <div className="flex items-center gap-3">
                  <div className="grid h-12 w-12 place-items-center rounded-xl bg-gradient-to-br from-primary/25 to-secondary/15 ring-1 ring-primary/30">
                    <Target size={24} className="text-secondary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold text-foreground">What we solve</p>
                    <p className="text-xs text-muted-foreground">The synthetic media threat</p>
                  </div>
                </div>
                {[
                  { label: "Executive voice-clone fraud", value: "$2.6B lost in 2025" },
                  { label: "Deepfake video incidents", value: "+900% since 2022" },
                  { label: "Avg. time to detect", value: "Was hours. Now seconds." },
                  { label: "Court-admissible evidence", value: "Frame-level reports" },
                ].map((row) => (
                  <div key={row.label} className="flex items-center justify-between border-b border-border/50 pb-3">
                    <span className="text-sm text-muted-foreground">{row.label}</span>
                    <span className="text-sm font-semibold text-foreground">{row.value}</span>
                  </div>
                ))}
              </div>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Timeline() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-4xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Our Journey</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From research to production
          </h2>
        </div>
        <div className="relative mt-12 pl-6">
          {/* vertical line */}
          <div className="absolute left-0 top-2 h-full w-px bg-gradient-to-b from-primary/50 via-secondary/30 to-transparent" />
          {aboutTimeline.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative mb-10 last:mb-0"
            >
              <div className="absolute -left-[27px] top-1.5 grid h-4 w-4 place-items-center rounded-full bg-secondary ring-4 ring-background">
                <div className="h-1.5 w-1.5 rounded-full bg-background" />
              </div>
              <Card className="glass p-5 ring-1 ring-transparent transition-colors hover:ring-primary/30">
                <div className="flex items-center gap-3">
                  <span className="rounded-md bg-primary/15 px-2 py-0.5 text-xs font-bold text-secondary">{item.year}</span>
                  <h3 className="text-base font-semibold text-foreground">{item.title}</h3>
                </div>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{item.description}</p>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Technology() {
  const iconMap = (name: string): LucideIcon =>
    (Icons as unknown as Record<string, LucideIcon>)[name] ?? Sparkles;
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Technology</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            The science behind the shield
          </h2>
          <p className="mt-4 text-muted-foreground">
            An ensemble of specialized models — not a single black box — examines every signal a deepfake leaves behind.
          </p>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2">
          {aboutTech.map((t, i) => {
            const Icon = iconMap(t.icon);
            return (
              <motion.div
                key={t.title}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-40px" }}
                transition={{ duration: 0.5, delay: i * 0.08 }}
              >
                <Card className="glass group flex h-full items-start gap-4 p-6 ring-1 ring-transparent transition-all hover:ring-primary/30">
                  <div className="grid h-12 w-12 shrink-0 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 ring-1 ring-primary/30 transition-transform group-hover:scale-110">
                    <Icon size={22} className="text-secondary" />
                  </div>
                  <div>
                    <h3 className="text-base font-semibold text-foreground">{t.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{t.description}</p>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}

function OurAI() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-10 lg:grid-cols-2 lg:items-center">
          <motion.div
            initial={{ opacity: 0, scale: 0.94 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="relative order-2 lg:order-1"
          >
            <Card className="glass relative overflow-hidden p-8 ring-1 ring-primary/20">
              <div className="absolute -left-12 -bottom-12 h-44 w-44 rounded-full bg-secondary/15 blur-3xl" />
              {/* AI pipeline visualization */}
              <div className="relative space-y-3">
                <p className="text-sm font-semibold text-foreground">Detection Pipeline</p>
                {[
                  { icon: ScanFace, label: "Facial landmark mapping", color: "text-secondary" },
                  { icon: AudioWaveform, label: "Voice biometric analysis", color: "text-primary" },
                  { icon: Fingerprint, label: "Generative artifact scan", color: "text-success" },
                  { icon: BrainCircuit, label: "Ensemble confidence voting", color: "text-warning" },
                  { icon: FileText, label: "Explainable report generation", color: "text-secondary" },
                ].map((step, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: i * 0.1 }}
                    className="flex items-center gap-3 rounded-lg border border-border bg-muted/30 px-3 py-2.5"
                  >
                    <div className="grid h-8 w-8 place-items-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                      <step.icon size={15} className={step.color} />
                    </div>
                    <span className="text-sm text-foreground/90">{step.label}</span>
                    <CheckCircle2 size={14} className="ml-auto text-success" />
                  </motion.div>
                ))}
              </div>
            </Card>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5 }}
            className="order-1 lg:order-2"
          >
            <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Our AI</span>
            <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
              Ensemble intelligence, not a single guess
            </h2>
            <p className="mt-5 text-base leading-relaxed text-muted-foreground">
              Most detectors rely on one model and return a single number. We run an
              <span className="font-medium text-foreground"> ensemble</span> — CNNs for
              visual artifacts, transformers for temporal consistency, and spectral
              analyzers for voice — then aggregate their votes into a calibrated
              confidence score.
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground">
              Every verdict is fully explainable. You see which signals contributed,
              how strongly, and what the model found in each frame — so you can
              defend the decision, not just trust it.
            </p>
            <div className="mt-6 grid grid-cols-3 gap-4">
              {[
                { value: "99.2%", label: "Accuracy" },
                { value: "38s", label: "Avg. time" },
                { value: "7", label: "Model ensemble" },
              ].map((s) => (
                <div key={s.label} className="rounded-xl border border-border bg-muted/30 p-4 text-center">
                  <p className="text-2xl font-bold text-gradient">{s.value}</p>
                  <p className="mt-1 text-xs text-muted-foreground">{s.label}</p>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function FeaturesSection() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Platform Features</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Built for security teams
          </h2>
        </div>
        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {aboutFeatures.map((f, i) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StatsBand() {
  return (
    <section className="px-4 py-12 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="mx-auto grid max-w-4xl grid-cols-2 gap-6 rounded-2xl glass p-8 ring-1 ring-primary/15 sm:grid-cols-4"
      >
        {landingStats.map((s) => (
          <StatNumber key={s.label} value={s.value} label={s.label} />
        ))}
      </motion.div>
    </section>
  );
}

function Contact() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-5xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Contact</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Let's talk security
          </h2>
          <p className="mt-4 text-muted-foreground">
            Have a question, need a demo, or want to integrate TruthShield into your stack? We'd love to hear from you.
          </p>
        </div>

        <div className="mt-12 grid gap-6 lg:grid-cols-3">
          {[
            { icon: Mail, label: "Email", value: "hello@truthshield.ai", accent: "text-secondary" },
            { icon: Phone, label: "Phone", value: "+1 (415) 555-0142", accent: "text-primary" },
            { icon: MapPin, label: "Office", value: "San Francisco, CA", accent: "text-success" },
          ].map((c, i) => (
            <motion.div
              key={c.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
            >
              <Card className="glass flex flex-col items-center gap-3 p-6 text-center ring-1 ring-transparent transition-all hover:ring-primary/30">
                <div className="grid h-12 w-12 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                  <c.icon size={22} className={c.accent} />
                </div>
                <p className="text-xs uppercase tracking-wide text-muted-foreground">{c.label}</p>
                <p className="text-sm font-semibold text-foreground">{c.value}</p>
              </Card>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.96 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="relative mt-10 overflow-hidden rounded-3xl glass-strong p-8 text-center ring-1 ring-primary/30 glow-blue sm:p-12"
        >
          <div className="absolute -left-16 -top-16 h-48 w-48 rounded-full bg-primary/20 blur-3xl" />
          <div className="absolute -bottom-16 -right-16 h-48 w-48 rounded-full bg-secondary/20 blur-3xl" />
          <div className="relative">
            <h3 className="text-2xl font-bold text-foreground sm:text-3xl">Ready to verify the truth?</h3>
            <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
              Upload your first media file and get a full authenticity report in under a minute.
            </p>
            <Button asChild size="lg" className="mt-7 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary px-8 text-base text-white hover:opacity-90">
              <Link to="/upload"><ShieldCheck size={18} className="mr-2" /> Start Free Scan</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      {/* Hero */}
      <section className="px-4 pt-20 pb-8 text-center sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-secondary"
        >
          <Info size={13} /> About TruthShield AI
        </motion.div>
        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mx-auto mt-6 max-w-3xl text-4xl font-extrabold leading-tight tracking-tight text-foreground sm:text-5xl"
        >
          We build the tools that <span className="text-gradient">defend reality</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          TruthShield AI is a deepfake and social engineering detection platform
          trusted by financial institutions and enterprises to verify what's real —
          instantly, explainably, and at scale.
        </motion.p>
      </section>

      <StatsBand />
      <Mission />
      <Timeline />
      <Technology />
      <OurAI />
      <FeaturesSection />
      <Contact />
    </>
  );
}

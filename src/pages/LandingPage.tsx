import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  ShieldCheck, ArrowRight, Sparkles, ScanFace, Gauge, FileText, Radar, Lock,
  BrainCircuit, AudioWaveform, Fingerprint, Zap, Network, PlayCircle,
  Star, Quote, ChevronRight,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { FeatureCard } from "@/components/shared/FeatureCard";
import { FaqCard } from "@/components/shared/FaqCard";
import {
  features, howItWorks, testimonials, faqs, landingStats,
} from "@/data/dummy-data";
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

function Hero() {
  return (
    <section className="relative overflow-hidden px-4 pt-20 pb-16 sm:px-6 lg:px-8 lg:pt-28">
      <div className="mx-auto max-w-5xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mx-auto inline-flex items-center gap-2 rounded-full border border-primary/30 bg-primary/10 px-4 py-1.5 text-xs font-medium text-secondary"
        >
          <Sparkles size={13} />
          AI-Powered Deepfake & Social Engineering Detection
          <span className="caret">|</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.08 }}
          className="mt-7 text-4xl font-extrabold leading-[1.08] tracking-tight text-foreground sm:text-6xl"
        >
          See what's <span className="text-gradient">real</span>.
          <br className="hidden sm:block" />
          Catch what's <span className="text-gradient-danger">fake</span>.
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.16 }}
          className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-muted-foreground sm:text-lg"
        >
          TruthShield AI analyzes video, audio, and images to detect deepfakes and
          social engineering attacks in seconds — with explainable scores,
          forensic reports, and real-time alerts.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.24 }}
          className="mt-9 flex flex-col items-center justify-center gap-3 sm:flex-row"
        >
          <Button asChild size="lg" className="h-12 rounded-xl bg-gradient-to-r from-primary to-secondary px-8 text-base text-white hover:opacity-90 glow-blue">
            <Link to="/upload">
              <ShieldCheck size={18} className="mr-2" />
              Analyze Media Now
              <ArrowRight size={17} className="ml-2" />
            </Link>
          </Button>
          <Button asChild size="lg" variant="outline" className="h-12 rounded-xl border-border bg-transparent px-6 text-base hover:bg-muted">
            <Link to="/dashboard">
              <PlayCircle size={18} className="mr-2" />
              View Dashboard
            </Link>
          </Button>
        </motion.div>

        {/* Trust strip */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.36 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-x-6 gap-y-2 text-xs text-muted-foreground"
        >
          <span className="flex items-center gap-1.5"><ShieldCheck size={13} className="text-success" /> SOC 2 Type II</span>
          <span className="flex items-center gap-1.5"><Lock size={13} className="text-secondary" /> Zero-Knowledge Processing</span>
          <span className="flex items-center gap-1.5"><Zap size={13} className="text-warning" /> 38s Avg. Analysis</span>
        </motion.div>
      </div>

      {/* Stats */}
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, delay: 0.44 }}
        className="mx-auto mt-16 grid max-w-4xl grid-cols-2 gap-6 rounded-2xl glass p-8 ring-1 ring-primary/15 sm:grid-cols-4"
      >
        {landingStats.map((s) => (
          <StatNumber key={s.label} value={s.value} label={s.label} />
        ))}
      </motion.div>
    </section>
  );
}

function Features() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <motion.span
            initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}
            className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary"
          >
            Capabilities
          </motion.span>
          <motion.h2
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl"
          >
            Everything you need to verify the truth
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.08 }}
            className="mt-4 text-muted-foreground"
          >
            A multi-model detection platform that goes beyond pixels — analyzing
            faces, voices, artifacts, and manipulation tactics.
          </motion.p>
        </div>

        <div className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {features.map((f, i) => (
            <FeatureCard key={f.title} icon={f.icon} title={f.title} description={f.description} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorks() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">How It Works</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            From upload to verdict in four steps
          </h2>
        </div>

        <div className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          {/* connecting line */}
          <div className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-primary/30 to-transparent lg:block" />
          {howItWorks.map((step, i) => (
            <motion.div
              key={step.step}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="relative"
            >
              <div className="relative z-10 mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-gradient-to-br from-primary/25 to-secondary/15 text-lg font-bold text-secondary ring-1 ring-primary/30 glow-blue">
                {step.step}
              </div>
              <div className="mt-5 text-center">
                <h3 className="text-lg font-semibold text-foreground">{step.title}</h3>
                <p className="mx-auto mt-2 max-w-xs text-sm leading-relaxed text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-7xl">
        <div className="mx-auto max-w-2xl text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">Testimonials</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Trusted by security teams worldwide
          </h2>
        </div>
        <div className="mt-12 grid gap-5 md:grid-cols-3">
          {testimonials.map((t, i) => (
            <motion.div
              key={t.name}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="glass relative rounded-xl p-6 ring-1 ring-transparent transition-all hover:ring-primary/30"
            >
              <Quote size={28} className="text-primary/30" />
              <p className="mt-4 text-sm leading-relaxed text-foreground/90">"{t.quote}"</p>
              <div className="mt-5 flex items-center gap-3">
                <div className="grid h-11 w-11 place-items-center rounded-full bg-gradient-to-br from-primary/25 to-secondary/15 text-sm font-bold text-secondary ring-1 ring-primary/30">
                  {t.avatar}
                </div>
                <div>
                  <p className="text-sm font-semibold text-foreground">{t.name}</p>
                  <p className="text-xs text-muted-foreground">{t.role}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-0.5">
                {Array.from({ length: 5 }).map((_, j) => (
                  <Star key={j} size={14} className="fill-warning text-warning" />
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Faq() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <div className="mx-auto max-w-3xl">
        <div className="text-center">
          <span className="text-sm font-semibold uppercase tracking-[0.2em] text-secondary">FAQ</span>
          <h2 className="mt-3 text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Frequently asked questions
          </h2>
        </div>
        <div className="mt-10">
          <FaqCard items={faqs} />
        </div>
      </div>
    </section>
  );
}

function CtaBanner() {
  return (
    <section className="px-4 py-20 sm:px-6 lg:px-8">
      <motion.div
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto max-w-5xl overflow-hidden rounded-3xl glass-strong p-10 text-center ring-1 ring-primary/30 glow-blue sm:p-16"
      >
        <div className="absolute -left-20 -top-20 h-60 w-60 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-secondary/20 blur-3xl" />
        <div className="relative">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Stop guessing. Start <span className="text-gradient">verifying</span>.
          </h2>
          <p className="mx-auto mt-4 max-w-xl text-muted-foreground">
            Upload your first media file and get a full authenticity report in under a minute. No credit card required.
          </p>
          <Button asChild size="lg" className="mt-8 h-12 rounded-xl bg-gradient-to-r from-primary to-secondary px-8 text-base text-white hover:opacity-90">
            <Link to="/upload">
              <ShieldCheck size={18} className="mr-2" />
              Get Started Free
              <ChevronRight size={17} className="ml-1" />
            </Link>
          </Button>
        </div>
      </motion.div>
    </section>
  );
}

export default function LandingPage() {
  return (
    <>
      <Hero />
      <Features />
      <HowItWorks />
      <Testimonials />
      <Faq />
      <CtaBanner />
    </>
  );
}

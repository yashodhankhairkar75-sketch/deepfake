import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { scoreColor } from "@/lib/format";

interface TrustGaugeProps {
  score: number; // 0-100
  size?: number; // px diameter
  label?: string;
  sublabel?: string;
  className?: string;
  animate?: boolean;
}

/** Large circular trust-score gauge with animated arc. */
export function TrustGauge({
  score,
  size = 220,
  label = "Trust Score",
  sublabel,
  className,
  animate = true,
}: TrustGaugeProps) {
  const [display, setDisplay] = useState(animate ? 0 : score);

  useEffect(() => {
    if (!animate) {
      setDisplay(score);
      return;
    }
    const start = performance.now();
    const dur = 1400;
    const tick = (now: number) => {
      const p = Math.min((now - start) / dur, 1);
      const eased = 1 - Math.pow(1 - p, 3);
      setDisplay(score * eased);
      if (p < 1) requestAnimationFrame(tick);
      else setDisplay(score);
    };
    requestAnimationFrame(tick);
  }, [score, animate]);

  const stroke = size * 0.06;
  const r = (size - stroke) / 2;
  const cx = size / 2;
  const cy = size / 2;
  const circ = 2 * Math.PI * r;
  const offset = circ - (display / 100) * circ;
  const color = scoreColor(score);
  const trackColor = "rgba(148,163,184,0.12)";

  const id = `gauge-${size}-${Math.round(score)}`;

  return (
    <div className={cn("relative grid place-items-center", className)} style={{ width: size, height: size }}>
      <svg width={size} height={size} className="-rotate-90">
        <defs>
          <linearGradient id={id} x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor={color} stopOpacity="0.9" />
            <stop offset="100%" stopColor={color} stopOpacity="0.55" />
          </linearGradient>
        </defs>
        <circle cx={cx} cy={cy} r={r} fill="none" stroke={trackColor} strokeWidth={stroke} />
        <motion.circle
          cx={cx}
          cy={cy}
          r={r}
          fill="none"
          stroke={`url(#${id})`}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={circ}
          initial={{ strokeDashoffset: circ }}
          animate={{ strokeDashoffset: offset }}
          transition={{ duration: 1.4, ease: "easeOut" }}
          style={{ filter: `drop-shadow(0 0 8px ${color}66)` }}
        />
      </svg>
      <div className="absolute flex flex-col items-center">
        <span className="text-5xl font-bold tabular-nums tracking-tight" style={{ color }}>
          {Math.round(display)}
        </span>
        <span className="text-xs font-medium uppercase tracking-[0.2em] text-muted-foreground mt-1">
          / 100
        </span>
        {label && (
          <span className="mt-2 text-sm font-medium text-foreground/80">{label}</span>
        )}
        {sublabel && (
          <span className="text-xs text-muted-foreground">{sublabel}</span>
        )}
      </div>
    </div>
  );
}

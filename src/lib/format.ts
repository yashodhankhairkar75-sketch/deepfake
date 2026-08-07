import type { RiskLevel, ResultVerdict } from "@/data/dummy-data";

export function formatDate(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}

export function formatDateTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric" }) +
    " · " +
    d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function formatTime(iso: string): string {
  const d = new Date(iso);
  return d.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" });
}

export function riskColor(risk: RiskLevel): {
  text: string;
  bg: string;
  border: string;
  glow: string;
  hex: string;
  label: string;
} {
  switch (risk) {
    case "CRITICAL":
      return { text: "text-red-300", bg: "bg-red-500/15", border: "border-red-500/40", glow: "glow-red", hex: "#ef4444", label: "Critical" };
    case "HIGH":
      return { text: "text-orange-300", bg: "bg-orange-500/15", border: "border-orange-500/40", glow: "", hex: "#f97316", label: "High" };
    case "MEDIUM":
      return { text: "text-yellow-300", bg: "bg-yellow-500/15", border: "border-yellow-500/40", glow: "", hex: "#eab308", label: "Medium" };
    case "LOW":
    default:
      return { text: "text-emerald-300", bg: "bg-emerald-500/15", border: "border-emerald-500/40", glow: "glow-green", hex: "#22c55e", label: "Low" };
  }
}

export function verdictStyle(verdict: ResultVerdict): {
  text: string;
  bg: string;
  border: string;
  glow: string;
  hex: string;
} {
  switch (verdict) {
    case "REAL":
      return { text: "text-emerald-300", bg: "bg-emerald-500/15", border: "border-emerald-500/50", glow: "glow-green", hex: "#22c55e" };
    case "FAKE":
      return { text: "text-red-300", bg: "bg-red-500/15", border: "border-red-500/50", glow: "glow-red", hex: "#ef4444" };
    case "SUSPICIOUS":
    default:
      return { text: "text-yellow-300", bg: "bg-yellow-500/15", border: "border-yellow-500/50", glow: "", hex: "#eab308" };
  }
}

export function scoreColor(score: number): string {
  if (score >= 70) return "#22c55e";
  if (score >= 40) return "#eab308";
  return "#ef4444";
}

export function scoreTextClass(score: number): string {
  if (score >= 70) return "text-emerald-400";
  if (score >= 40) return "text-yellow-400";
  return "text-red-400";
}

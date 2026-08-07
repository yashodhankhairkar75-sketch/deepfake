import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  FileText, Download, Video, AudioLines, Image as ImageIcon,
  Calendar, FileCheck2, TrendingUp, BarChart3, Filter,
} from "lucide-react";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
} from "recharts";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/shared/PageHeader";
import { ChartCard } from "@/components/shared/ChartCard";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { ResultBadge } from "@/components/shared/ResultBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { reports, reportsDaily, reportsWeekly, reportsMonthly } from "@/data/dummy-data";
import type { MediaType } from "@/data/dummy-data";
import { formatDate } from "@/lib/format";

const tooltipStyle = {
  backgroundColor: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(56,189,248,0.3)",
  borderRadius: "0.75rem",
  fontSize: "12px",
  color: "#e2e8f0",
  padding: "8px 12px",
};

const mediaIcon = (t: MediaType) => (t === "Video" ? Video : t === "Audio" ? AudioLines : ImageIcon);

export default function ReportsPage() {
  const [period, setPeriod] = useState<"daily" | "weekly" | "monthly">("weekly");
  const [riskFilter, setRiskFilter] = useState("ALL");
  const [typeFilter, setTypeFilter] = useState("ALL");

  const chartData = period === "daily" ? reportsDaily : period === "weekly" ? reportsWeekly : reportsMonthly;
  const xKey = period === "daily" ? "day" : period === "weekly" ? "week" : "month";

  const filtered = useMemo(() => {
    return reports.filter((r) => {
      if (riskFilter !== "ALL" && r.risk !== riskFilter) return false;
      if (typeFilter !== "ALL" && r.mediaType !== typeFilter) return false;
      return true;
    });
  }, [riskFilter, typeFilter]);

  const totalReports = reports.length;
  const criticalReports = reports.filter((r) => r.risk === "CRITICAL").length;
  const avgTrust = Math.round(reports.reduce((a, r) => a + r.trustScore, 0) / reports.length);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Reports"
        description="Download and manage your forensic analysis reports"
        icon={FileText}
        action={
          <Button className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90">
            <Download size={15} className="mr-1.5" /> Export All
          </Button>
        }
      />

      {/* Summary stats */}
      <div className="grid gap-4 sm:grid-cols-3">
        {[
          { label: "Total Reports", value: totalReports, icon: FileText, accent: "text-primary" },
          { label: "Critical Findings", value: criticalReports, icon: TrendingUp, accent: "text-destructive" },
          { label: "Avg Trust Score", value: avgTrust, suffix: "/100", icon: FileCheck2, accent: "text-success" },
        ].map((s, i) => {
          const Icon = s.icon;
          return (
            <motion.div key={s.label} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4, delay: i * 0.07 }}>
              <Card className="glass flex items-center gap-4 p-5 ring-1 ring-transparent transition-colors hover:ring-primary/30">
                <div className="grid h-11 w-11 place-items-center rounded-xl bg-primary/10 ring-1 ring-primary/20">
                  <Icon size={20} className={s.accent} />
                </div>
                <div>
                  <p className="text-2xl font-bold tabular-nums text-foreground">{s.value}<span className="text-sm text-muted-foreground">{s.suffix}</span></p>
                  <p className="text-xs text-muted-foreground">{s.label}</p>
                </div>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Chart */}
      <ChartCard title="Reports Over Time" description="Track your analysis volume by period" icon={BarChart3}>
        <Tabs value={period} onValueChange={(v) => setPeriod(v as typeof period)}>
          <TabsList className="bg-muted/40">
            <TabsTrigger value="daily" className="data-[state=active]:bg-primary/20 data-[state=active]:text-secondary">Daily</TabsTrigger>
            <TabsTrigger value="weekly" className="data-[state=active]:bg-primary/20 data-[state=active]:text-secondary">Weekly</TabsTrigger>
            <TabsTrigger value="monthly" className="data-[state=active]:bg-primary/20 data-[state=active]:text-secondary">Monthly</TabsTrigger>
          </TabsList>
        </Tabs>
        <div className="mt-4">
          <ResponsiveContainer width="100%" height={260}>
            {period === "monthly" ? (
              <AreaChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <defs>
                  <linearGradient id="gReports" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#22d3ee" stopOpacity={0.4} />
                    <stop offset="100%" stopColor="#22d3ee" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey={xKey} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} />
                <Area type="monotone" dataKey="count" name="Reports" stroke="#22d3ee" strokeWidth={2} fill="url(#gReports)" />
              </AreaChart>
            ) : (
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
                <XAxis dataKey={xKey} tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(56,189,248,0.08)" }} />
                <Bar dataKey="count" name="Reports" fill="#38bdf8" radius={[5, 5, 0, 0]} />
              </BarChart>
            )}
          </ResponsiveContainer>
        </div>
      </ChartCard>

      {/* Filters */}
      <Card className="glass p-4">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <span className="flex items-center gap-1.5 text-sm font-medium text-muted-foreground"><Filter size={14} /> Filters:</span>
          <div className="grid flex-1 gap-3 sm:grid-cols-2">
            <Select value={riskFilter} onValueChange={setRiskFilter}>
              <SelectTrigger className="border-border bg-muted/30"><SelectValue placeholder="Risk Level" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Risk Levels</SelectItem>
                <SelectItem value="LOW">Low</SelectItem>
                <SelectItem value="MEDIUM">Medium</SelectItem>
                <SelectItem value="HIGH">High</SelectItem>
                <SelectItem value="CRITICAL">Critical</SelectItem>
              </SelectContent>
            </Select>
            <Select value={typeFilter} onValueChange={setTypeFilter}>
              <SelectTrigger className="border-border bg-muted/30"><SelectValue placeholder="Media Type" /></SelectTrigger>
              <SelectContent>
                <SelectItem value="ALL">All Media Types</SelectItem>
                <SelectItem value="Video">Video</SelectItem>
                <SelectItem value="Audio">Audio</SelectItem>
                <SelectItem value="Image">Image</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </Card>

      {/* Report cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.slice(0, 12).map((r, i) => {
          const Icon = mediaIcon(r.mediaType);
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              whileHover={{ y: -4 }}
            >
              <Card className="glass group h-full p-5 ring-1 ring-transparent transition-all hover:ring-primary/30">
                <div className="flex items-start justify-between">
                  <div className="grid h-11 w-11 place-items-center rounded-xl bg-gradient-to-br from-primary/20 to-secondary/10 ring-1 ring-primary/30">
                    <Icon size={20} className="text-secondary" />
                  </div>
                  <span className="font-mono text-[11px] text-muted-foreground">{r.id}</span>
                </div>

                <h3 className="mt-4 truncate text-sm font-semibold text-foreground">{r.title}</h3>

                <div className="mt-2 flex items-center gap-2 text-[11px] text-muted-foreground">
                  <Calendar size={11} /> {formatDate(r.date)}
                  <span>·</span>
                  <span>{r.pages} pages</span>
                  <span>·</span>
                  <span>{r.fileSize}</span>
                </div>

                <div className="mt-3 flex items-center gap-2">
                  <RiskBadge risk={r.risk} size="sm" />
                  <ResultBadge verdict={r.verdict} size="sm" />
                </div>

                <div className="mt-3 flex items-center justify-between rounded-lg bg-muted/40 px-3 py-2">
                  <span className="text-xs text-muted-foreground">Trust Score</span>
                  <span className={cn("text-sm font-bold tabular-nums", r.trustScore >= 70 ? "text-emerald-400" : r.trustScore >= 40 ? "text-yellow-400" : "text-red-400")}>
                    {r.trustScore}/100
                  </span>
                </div>

                <Button variant="outline" size="sm" className="mt-4 w-full border-border bg-transparent hover:bg-primary/10 hover:text-secondary">
                  <Download size={14} className="mr-1.5" /> Download PDF
                </Button>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {filtered.length === 0 && (
        <Card className="glass p-12 text-center text-muted-foreground">No reports match your filters.</Card>
      )}
    </div>
  );
}

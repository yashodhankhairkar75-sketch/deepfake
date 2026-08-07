import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import {
  AreaChart, Area, BarChart, Bar, PieChart, Pie, Cell,
  XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend,
} from "recharts";
import {
  ScanLine, ShieldAlert, Sparkles, Gauge, Upload, FileText, History,
  ArrowRight, Activity, PieChart as PieIcon, BarChart3, AlertCircle,
} from "lucide-react";
import { PageHeader } from "@/components/shared/PageHeader";
import { StatCard } from "@/components/shared/StatCard";
import { ChartCard } from "@/components/shared/ChartCard";
import { AlertCard } from "@/components/shared/AlertCard";
import { AnalysisCard } from "@/components/shared/AnalysisCard";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import {
  dashboardStats, scanTrend, riskDistribution, mediaTypeBreakdown,
  weeklyComparison, recentAnalysis, latestAlerts,
} from "@/data/dummy-data";
import { formatTime } from "@/lib/format";

const tooltipStyle = {
  backgroundColor: "rgba(15,23,42,0.95)",
  border: "1px solid rgba(56,189,248,0.3)",
  borderRadius: "0.75rem",
  fontSize: "12px",
  color: "#e2e8f0",
  padding: "8px 12px",
};

function WelcomeCard() {
  const hour = new Date().getHours();
  const greeting = hour < 12 ? "Good morning" : hour < 18 ? "Good afternoon" : "Good evening";
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Card className="glass relative overflow-hidden p-6 ring-1 ring-primary/20">
        <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/15 blur-3xl" />
        <div className="relative flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
          <div>
            <p className="text-sm text-muted-foreground">{greeting}, Alex 👋</p>
            <h2 className="mt-1 text-2xl font-bold tracking-tight text-foreground">
              Your threat landscape is <span className="text-gradient">active</span>
            </h2>
            <p className="mt-2 max-w-md text-sm text-muted-foreground">
              {dashboardStats.scansToday} scans today · {dashboardStats.deepfakeDetections} deepfakes detected. Stay alert.
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              <Button asChild size="sm" className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90">
                <Link to="/upload"><Upload size={15} className="mr-1.5" /> New Scan</Link>
              </Button>
              <Button asChild size="sm" variant="outline" className="border-border bg-transparent hover:bg-muted">
                <Link to="/reports"><FileText size={15} className="mr-1.5" /> View Reports</Link>
              </Button>
            </div>
          </div>
          <div className="grid h-24 w-24 shrink-0 place-items-center rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/10 ring-1 ring-primary/30">
            <Activity size={40} className="text-secondary" />
          </div>
        </div>
      </Card>
    </motion.div>
  );
}

function QuickActions() {
  const actions = [
    { label: "Upload Media", icon: Upload, to: "/upload", accent: "text-primary" },
    { label: "View History", icon: History, to: "/history", accent: "text-secondary" },
    { label: "Reports", icon: FileText, to: "/reports", accent: "text-success" },
    { label: "About", icon: Sparkles, to: "/about", accent: "text-warning" },
  ];
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: 0.1 }}
    >
      <Card className="glass p-5 ring-1 ring-transparent">
        <p className="text-sm font-semibold text-foreground">Quick Actions</p>
        <div className="mt-4 grid grid-cols-2 gap-2">
          {actions.map((a) => (
            <Link
              key={a.label}
              to={a.to}
              className="group flex items-center gap-2.5 rounded-lg border border-border bg-muted/40 px-3 py-2.5 text-sm font-medium text-muted-foreground transition-all hover:border-primary/40 hover:bg-primary/10 hover:text-foreground"
            >
              <a.icon size={16} className={a.accent} />
              {a.label}
              <ArrowRight size={13} className="ml-auto opacity-0 transition-opacity group-hover:opacity-100" />
            </Link>
          ))}
        </div>
      </Card>
    </motion.div>
  );
}

export default function DashboardPage() {
  return (
    <div className="space-y-6">
      <PageHeader
        title="Dashboard"
        description="Real-time threat intelligence and analysis overview"
        icon={ScanLine}
        action={
          <Button asChild className="bg-gradient-to-r from-primary to-secondary text-white hover:opacity-90">
            <Link to="/upload"><Upload size={15} className="mr-1.5" /> New Scan</Link>
          </Button>
        }
      />

      <WelcomeCard />

      {/* Stat cards */}
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard index={0} label="Today's Scans" value={dashboardStats.scansToday} icon={ScanLine} trend={dashboardStats.scansTodayTrend} trendLabel="vs yesterday" accent="primary" />
        <StatCard index={1} label="Threat Detection Rate" value={`${dashboardStats.threatRate}%`} icon={ShieldAlert} trend={dashboardStats.threatRateTrend} trendLabel="vs last week" accent="danger" />
        <StatCard index={2} label="Deepfake Detections" value={dashboardStats.deepfakeDetections} icon={Sparkles} trend={dashboardStats.deepfakeTrend} trendLabel="vs yesterday" accent="warning" />
        <StatCard index={3} label="Avg Trust Score" value={dashboardStats.trustScore} suffix="%" icon={Gauge} trend={dashboardStats.trustScoreTrend} trendLabel="vs last week" accent="success" />
      </div>

      {/* Charts row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard
          index={0}
          className="lg:col-span-2"
          title="Scan & Threat Trend"
          description="Last 14 days"
          icon={Activity}
        >
          <ResponsiveContainer width="100%" height={280}>
            <AreaChart data={scanTrend} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <defs>
                <linearGradient id="gScans" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#38bdf8" stopOpacity={0.4} />
                  <stop offset="100%" stopColor="#38bdf8" stopOpacity={0} />
                </linearGradient>
                <linearGradient id="gThreats" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#ef4444" stopOpacity={0.35} />
                  <stop offset="100%" stopColor="#ef4444" stopOpacity={0} />
                </linearGradient>
              </defs>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="day" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} />
              <Area type="monotone" dataKey="scans" name="Scans" stroke="#38bdf8" strokeWidth={2} fill="url(#gScans)" />
              <Area type="monotone" dataKey="threats" name="Threats" stroke="#ef4444" strokeWidth={2} fill="url(#gThreats)" />
            </AreaChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard index={1} title="Risk Distribution" description="By severity" icon={PieIcon}>
          <ResponsiveContainer width="100%" height={280}>
            <PieChart>
              <Pie data={riskDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={60} outerRadius={95} paddingAngle={3}>
                {riskDistribution.map((e) => (
                  <Cell key={e.name} fill={e.color} stroke="rgba(15,23,42,0.6)" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
              <Legend formatter={(v) => <span className="text-xs text-muted-foreground">{v}</span>} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>
      </div>

      {/* Second row */}
      <div className="grid gap-4 lg:grid-cols-3">
        <ChartCard index={0} title="Weekly Detection Comparison" description="Real vs Fake vs Suspicious" icon={BarChart3}>
          <ResponsiveContainer width="100%" height={260}>
            <BarChart data={weeklyComparison} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="rgba(148,163,184,0.1)" />
              <XAxis dataKey="week" tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <YAxis tick={{ fill: "#94a3b8", fontSize: 11 }} axisLine={false} tickLine={false} />
              <Tooltip contentStyle={tooltipStyle} cursor={{ fill: "rgba(56,189,248,0.08)" }} />
              <Legend formatter={(v) => <span className="text-xs text-muted-foreground">{v}</span>} />
              <Bar dataKey="real" name="Real" fill="#22c55e" radius={[4, 4, 0, 0]} />
              <Bar dataKey="fake" name="Fake" fill="#ef4444" radius={[4, 4, 0, 0]} />
              <Bar dataKey="suspicious" name="Suspicious" fill="#eab308" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </ChartCard>

        <ChartCard index={1} title="Media Type Breakdown" description="Upload composition" icon={PieIcon}>
          <ResponsiveContainer width="100%" height={260}>
            <PieChart>
              <Pie data={mediaTypeBreakdown} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={95} paddingAngle={2} label={({ name, value }) => `${name} ${value}%`} labelLine={false} style={{ fontSize: 11, fill: "#cbd5e1" }}>
                {mediaTypeBreakdown.map((e) => (
                  <Cell key={e.name} fill={e.color} stroke="rgba(15,23,42,0.6)" strokeWidth={2} />
                ))}
              </Pie>
              <Tooltip contentStyle={tooltipStyle} />
            </PieChart>
          </ResponsiveContainer>
        </ChartCard>

        <QuickActions />
      </div>

      {/* Recent + Alerts */}
      <div className="grid gap-4 lg:grid-cols-2">
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
              <Activity size={17} className="text-secondary" /> Recent Analysis
            </h3>
            <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-secondary">
              <Link to="/history">View all <ArrowRight size={13} className="ml-1" /></Link>
            </Button>
          </div>
          {recentAnalysis.slice(0, 4).map((r, i) => (
            <AnalysisCard key={r.id} record={r} index={i} />
          ))}
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
              <AlertCircle size={17} className="text-destructive" /> Latest Alerts
            </h3>
            <span className="rounded-full bg-destructive/15 px-2 py-0.5 text-[10px] font-semibold text-destructive">
              {latestAlerts.length} active
            </span>
          </div>
          {latestAlerts.map((a, i) => (
            <AlertCard key={a.id} alert={a} index={i} />
          ))}
        </div>
      </div>

      {/* Recent reports preview */}
      <div className="space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="flex items-center gap-2 text-base font-semibold text-foreground">
            <FileText size={17} className="text-secondary" /> Recent Reports
          </h3>
          <Button asChild variant="ghost" size="sm" className="text-muted-foreground hover:text-secondary">
            <Link to="/reports">View all <ArrowRight size={13} className="ml-1" /></Link>
          </Button>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {recentAnalysis.slice(0, 3).map((r, i) => (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4, delay: i * 0.07 }}
            >
              <Card className="glass p-5 ring-1 ring-transparent transition-all hover:ring-primary/30">
                <div className="flex items-center justify-between">
                  <span className="font-mono text-xs text-muted-foreground">{r.id}</span>
                  <span className="text-xs text-muted-foreground">{formatTime(r.date)}</span>
                </div>
                <p className="mt-2 truncate text-sm font-semibold text-foreground">{r.fileName}</p>
                <div className="mt-3 flex items-center justify-between text-xs">
                  <span className="text-muted-foreground">Trust Score</span>
                  <span className="font-semibold text-secondary">{r.trustScore}/100</span>
                </div>
                <Button asChild variant="outline" size="sm" className="mt-4 w-full border-border bg-transparent hover:bg-muted">
                  <Link to="/reports">Download Report</Link>
                </Button>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}

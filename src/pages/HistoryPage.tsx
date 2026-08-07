import { useState, useMemo } from "react";
import { motion } from "framer-motion";
import {
  History as HistoryIcon, Search, Video, AudioLines, Image as ImageIcon,
  ChevronLeft, ChevronRight, Filter, Download, Eye,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { PageHeader } from "@/components/shared/PageHeader";
import { RiskBadge } from "@/components/shared/RiskBadge";
import { ResultBadge } from "@/components/shared/ResultBadge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { historyRecords } from "@/data/dummy-data";
import type { RiskLevel, ResultVerdict, MediaType } from "@/data/dummy-data";
import { formatDateTime } from "@/lib/format";

const PAGE_SIZE = 8;

const mediaIcon = (t: MediaType) => (t === "Video" ? Video : t === "Audio" ? AudioLines : ImageIcon);

export default function HistoryPage() {
  const [search, setSearch] = useState("");
  const [risk, setRisk] = useState<string>("ALL");
  const [mediaType, setMediaType] = useState<string>("ALL");
  const [verdict, setVerdict] = useState<string>("ALL");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    return historyRecords.filter((r) => {
      if (search && !r.fileName.toLowerCase().includes(search.toLowerCase()) && !r.id.toLowerCase().includes(search.toLowerCase())) return false;
      if (risk !== "ALL" && r.risk !== risk) return false;
      if (mediaType !== "ALL" && r.mediaType !== mediaType) return false;
      if (verdict !== "ALL" && r.verdict !== verdict) return false;
      return true;
    });
  }, [search, risk, mediaType, verdict]);

  const totalPages = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const safePage = Math.min(page, totalPages);
  const pageItems = filtered.slice((safePage - 1) * PAGE_SIZE, safePage * PAGE_SIZE);

  const resetPage = () => setPage(1);

  return (
    <div className="space-y-6">
      <PageHeader
        title="Analysis History"
        description="Search and filter all your past media analyses"
        icon={HistoryIcon}
        action={
          <Button variant="outline" className="border-border bg-transparent hover:bg-muted">
            <Download size={15} className="mr-1.5" /> Export CSV
          </Button>
        }
      />

      {/* Filters */}
      <Card className="glass p-4">
        <div className="grid gap-3 md:grid-cols-2 lg:grid-cols-4">
          <div className="relative">
            <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder="Search by file or ID..."
              value={search}
              onChange={(e) => { setSearch(e.target.value); resetPage(); }}
              className="border-border bg-muted/30 pl-9 placeholder:text-muted-foreground/60"
            />
          </div>
          <Select value={risk} onValueChange={(v) => { setRisk(v); resetPage(); }}>
            <SelectTrigger className="border-border bg-muted/30"><Filter size={14} className="mr-1.5 text-muted-foreground" /><SelectValue placeholder="Risk" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Risks</SelectItem>
              <SelectItem value="LOW">Low</SelectItem>
              <SelectItem value="MEDIUM">Medium</SelectItem>
              <SelectItem value="HIGH">High</SelectItem>
              <SelectItem value="CRITICAL">Critical</SelectItem>
            </SelectContent>
          </Select>
          <Select value={mediaType} onValueChange={(v) => { setMediaType(v); resetPage(); }}>
            <SelectTrigger className="border-border bg-muted/30"><SelectValue placeholder="Media Type" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Types</SelectItem>
              <SelectItem value="Video">Video</SelectItem>
              <SelectItem value="Audio">Audio</SelectItem>
              <SelectItem value="Image">Image</SelectItem>
            </SelectContent>
          </Select>
          <Select value={verdict} onValueChange={(v) => { setVerdict(v); resetPage(); }}>
            <SelectTrigger className="border-border bg-muted/30"><SelectValue placeholder="Result" /></SelectTrigger>
            <SelectContent>
              <SelectItem value="ALL">All Results</SelectItem>
              <SelectItem value="REAL">Real</SelectItem>
              <SelectItem value="FAKE">Fake</SelectItem>
              <SelectItem value="SUSPICIOUS">Suspicious</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="mt-3 flex items-center justify-between text-xs text-muted-foreground">
          <span>{filtered.length} of {historyRecords.length} records</span>
          {(search || risk !== "ALL" || mediaType !== "ALL" || verdict !== "ALL") && (
            <button
              onClick={() => { setSearch(""); setRisk("ALL"); setMediaType("ALL"); setVerdict("ALL"); resetPage(); }}
              className="text-secondary hover:underline"
            >
              Clear filters
            </button>
          )}
        </div>
      </Card>

      {/* Table (desktop) */}
      <Card className="glass hidden overflow-hidden lg:block">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="border-b border-border text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="px-5 py-3 font-medium">File</th>
                <th className="px-5 py-3 font-medium">Type</th>
                <th className="px-5 py-3 font-medium">Date</th>
                <th className="px-5 py-3 font-medium">Risk</th>
                <th className="px-5 py-3 font-medium">Result</th>
                <th className="px-5 py-3 font-medium">Trust</th>
                <th className="px-5 py-3 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {pageItems.map((r, i) => {
                const Icon = mediaIcon(r.mediaType);
                return (
                  <motion.tr
                    key={r.id}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.3, delay: i * 0.04 }}
                    className="border-b border-border/50 transition-colors hover:bg-primary/5"
                  >
                    <td className="px-5 py-3">
                      <div className="flex items-center gap-3">
                        <div className="grid h-9 w-9 shrink-0 place-items-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                          <Icon size={15} className="text-secondary" />
                        </div>
                        <div className="min-w-0">
                          <p className="truncate text-sm font-medium text-foreground">{r.fileName}</p>
                          <p className="font-mono text-[11px] text-muted-foreground">{r.id}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-5 py-3 text-muted-foreground">{r.mediaType}</td>
                    <td className="px-5 py-3 text-muted-foreground">{formatDateTime(r.date)}</td>
                    <td className="px-5 py-3"><RiskBadge risk={r.risk} size="sm" /></td>
                    <td className="px-5 py-3"><ResultBadge verdict={r.verdict} size="sm" /></td>
                    <td className="px-5 py-3">
                      <span className={cn("font-semibold tabular-nums", r.trustScore >= 70 ? "text-emerald-400" : r.trustScore >= 40 ? "text-yellow-400" : "text-red-400")}>
                        {r.trustScore}
                      </span>
                    </td>
                    <td className="px-5 py-3">
                      <div className="flex items-center justify-end gap-1">
                        <button className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-primary/15 hover:text-secondary" title="View">
                          <Eye size={15} />
                        </button>
                        <button className="grid h-8 w-8 place-items-center rounded-md text-muted-foreground hover:bg-primary/15 hover:text-secondary" title="Download">
                          <Download size={15} />
                        </button>
                      </div>
                    </td>
                  </motion.tr>
                );
              })}
              {pageItems.length === 0 && (
                <tr><td colSpan={7} className="px-5 py-12 text-center text-muted-foreground">No records match your filters.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Cards (mobile/tablet) */}
      <div className="grid gap-3 sm:grid-cols-2 lg:hidden">
        {pageItems.map((r, i) => {
          const Icon = mediaIcon(r.mediaType);
          return (
            <motion.div
              key={r.id}
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: i * 0.04 }}
            >
              <Card className="glass p-4">
                <div className="flex items-start gap-3">
                  <div className="grid h-10 w-10 shrink-0 place-items-center rounded-lg bg-primary/10 ring-1 ring-primary/20">
                    <Icon size={17} className="text-secondary" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-sm font-semibold text-foreground">{r.fileName}</p>
                    <p className="font-mono text-[11px] text-muted-foreground">{r.id} · {formatDateTime(r.date)}</p>
                  </div>
                </div>
                <div className="mt-3 flex flex-wrap items-center gap-2">
                  <RiskBadge risk={r.risk} size="sm" />
                  <ResultBadge verdict={r.verdict} size="sm" />
                  <span className={cn("ml-auto text-sm font-semibold tabular-nums", r.trustScore >= 70 ? "text-emerald-400" : r.trustScore >= 40 ? "text-yellow-400" : "text-red-400")}>
                    Trust {r.trustScore}
                  </span>
                </div>
              </Card>
            </motion.div>
          );
        })}
        {pageItems.length === 0 && (
          <Card className="glass p-8 text-center text-muted-foreground sm:col-span-2">No records match your filters.</Card>
        )}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center gap-2">
          <Button
            variant="outline" size="icon"
            disabled={safePage === 1}
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            className="border-border bg-transparent hover:bg-muted"
          >
            <ChevronLeft size={16} />
          </Button>
          {Array.from({ length: totalPages }).map((_, i) => (
            <button
              key={i}
              onClick={() => setPage(i + 1)}
              className={cn(
                "h-9 w-9 rounded-lg text-sm font-medium transition-colors",
                safePage === i + 1 ? "bg-gradient-to-r from-primary to-secondary text-white" : "border border-border bg-transparent text-muted-foreground hover:bg-muted"
              )}
            >
              {i + 1}
            </button>
          ))}
          <Button
            variant="outline" size="icon"
            disabled={safePage === totalPages}
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            className="border-border bg-transparent hover:bg-muted"
          >
            <ChevronRight size={16} />
          </Button>
        </div>
      )}
    </div>
  );
}

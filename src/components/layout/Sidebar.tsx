import { NavLink, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard, Upload, Sparkles, History, FileText, Info,
  ShieldCheck, ChevronLeft, Settings, LifeBuoy,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/upload", label: "Upload Media", icon: Upload },
  { to: "/analyze", label: "Analysis", icon: Sparkles },
  { to: "/result", label: "Latest Result", icon: ShieldCheck },
  { to: "/history", label: "History", icon: History },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/about", label: "About", icon: Info },
];

export function Sidebar() {
  const location = useLocation();

  return (
    <aside className="sticky top-0 hidden h-screen w-64 shrink-0 flex-col border-r border-border/60 bg-sidebar/80 backdrop-blur-xl lg:flex">
      <div className="flex h-16 items-center border-b border-border/60 px-5">
        <NavLink to="/" className="transition-transform hover:scale-[1.02]">
          <Logo size="sm" />
        </NavLink>
      </div>

      <nav className="flex-1 space-y-1 overflow-y-auto p-3">
        <p className="px-3 pb-2 pt-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground/70">
          Workspace
        </p>
        {links.map((link) => {
          const active = location.pathname === link.to;
          return (
            <NavLink
              key={link.to}
              to={link.to}
              className={cn(
                "group relative flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all",
                active ? "text-secondary" : "text-muted-foreground hover:text-foreground hover:bg-sidebar-accent"
              )}
            >
              {active && (
                <motion.span
                  layoutId="sidebar-active"
                  className="absolute inset-0 rounded-lg bg-primary/12 ring-1 ring-primary/30"
                />
              )}
              <link.icon size={18} className={cn("relative z-10", active ? "text-secondary" : "")} />
              <span className="relative z-10">{link.label}</span>
              {active && <ChevronLeft size={14} className="relative z-10 ml-auto -rotate-180 text-secondary" />}
            </NavLink>
          );
        })}
      </nav>

      <div className="space-y-1 border-t border-border/60 p-3">
        <NavLink to="/about" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground">
          <Settings size={18} /> Settings
        </NavLink>
        <NavLink to="/about" className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium text-muted-foreground transition-colors hover:bg-sidebar-accent hover:text-foreground">
          <LifeBuoy size={18} /> Support
        </NavLink>
        <div className="mt-2 rounded-xl bg-gradient-to-br from-primary/15 to-secondary/10 p-3 ring-1 ring-primary/20">
          <p className="text-xs font-semibold text-foreground">Pro Plan</p>
          <p className="mt-0.5 text-[11px] text-muted-foreground">Unlimited scans & reports</p>
          <Button size="sm" variant="ghost" className="mt-2 h-7 w-full bg-primary/15 px-2 text-xs hover:bg-primary/25">
            Manage Plan
          </Button>
        </div>
      </div>
    </aside>
  );
}

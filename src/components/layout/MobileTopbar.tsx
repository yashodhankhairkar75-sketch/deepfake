import { useState } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu, X, LayoutDashboard, Upload, Sparkles, History, FileText, Info, ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { Logo } from "@/components/shared/Logo";
import { Button } from "@/components/ui/button";

const links = [
  { to: "/dashboard", label: "Dashboard", icon: LayoutDashboard },
  { to: "/upload", label: "Upload", icon: Upload },
  { to: "/analyze", label: "Analysis", icon: Sparkles },
  { to: "/result", label: "Result", icon: ShieldCheck },
  { to: "/history", label: "History", icon: History },
  { to: "/reports", label: "Reports", icon: FileText },
  { to: "/about", label: "About", icon: Info },
];

export function MobileTopbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  return (
    <div className="sticky top-0 z-40 border-b border-border/60 bg-background/80 backdrop-blur-xl lg:hidden">
      <div className="flex h-16 items-center justify-between px-4">
        <Link to="/">
          <Logo size="sm" />
        </Link>
        <button
          className="grid h-10 w-10 place-items-center rounded-lg text-muted-foreground hover:bg-muted"
          onClick={() => setOpen((v) => !v)}
          aria-label="Toggle menu"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="overflow-hidden border-t border-border/60"
          >
            <nav className="space-y-1 px-4 py-4">
              {links.map((link) => {
                const active = location.pathname === link.to;
                return (
                  <NavLink
                    key={link.to}
                    to={link.to}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-colors",
                      active ? "bg-primary/15 text-secondary" : "text-muted-foreground hover:bg-muted hover:text-foreground"
                    )}
                  >
                    <link.icon size={17} />
                    {link.label}
                  </NavLink>
                );
              })}
              <Button asChild className="mt-2 w-full bg-gradient-to-r from-primary to-secondary text-white">
                <Link to="/upload" onClick={() => setOpen(false)}>
                  <ShieldCheck size={15} className="mr-1.5" />
                  New Scan
                </Link>
              </Button>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

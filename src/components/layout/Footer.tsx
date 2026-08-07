import { Link } from "react-router-dom";
import { ShieldCheck, Twitter, Github, Linkedin, Mail } from "lucide-react";
import { Logo } from "@/components/shared/Logo";

const columns = [
  {
    title: "Product",
    links: [
      { label: "Dashboard", to: "/dashboard" },
      { label: "Upload Media", to: "/upload" },
      { label: "History", to: "/history" },
      { label: "Reports", to: "/reports" },
    ],
  },
  {
    title: "Company",
    links: [
      { label: "About Us", to: "/about" },
      { label: "Technology", to: "/about" },
      { label: "Mission", to: "/about" },
      { label: "Contact", to: "/about" },
    ],
  },
  {
    title: "Resources",
    links: [
      { label: "Documentation", to: "/about" },
      { label: "API Reference", to: "/about" },
      { label: "Security", to: "/about" },
      { label: "Privacy", to: "/about" },
    ],
  },
];

const socials = [
  { Icon: Twitter, label: "Twitter" },
  { Icon: Github, label: "GitHub" },
  { Icon: Linkedin, label: "LinkedIn" },
  { Icon: Mail, label: "Email" },
];

export function Footer() {
  return (
    <footer className="relative mt-24 border-t border-border/60 bg-background/60">
      <div className="absolute inset-x-0 -top-px mx-auto h-px w-2/3 bg-gradient-to-r from-transparent via-primary/40 to-transparent" />
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 lg:px-8">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-5">
          <div className="lg:col-span-2">
            <Logo />
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              AI-powered deepfake and social engineering detection. Verify the
              authenticity of any video, audio, or image in seconds — with
              explainable, forensic-grade analysis.
            </p>
            <div className="mt-5 flex items-center gap-2">
              {socials.map(({ Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="grid h-9 w-9 place-items-center rounded-lg bg-muted/60 text-muted-foreground transition-all hover:bg-primary/15 hover:text-secondary"
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {columns.map((col) => (
            <div key={col.title}>
              <h4 className="text-sm font-semibold text-foreground">{col.title}</h4>
              <ul className="mt-4 space-y-2.5">
                {col.links.map((link) => (
                  <li key={link.label}>
                    <Link to={link.to} className="text-sm text-muted-foreground transition-colors hover:text-secondary">
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-border/60 pt-6 sm:flex-row">
          <p className="text-xs text-muted-foreground">
            © 2026 TruthShield AI. All rights reserved.
          </p>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <ShieldCheck size={14} className="text-success" />
            SOC 2 Type II · GDPR · ISO 27001
          </div>
        </div>
      </div>
    </footer>
  );
}

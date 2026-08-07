import { cn } from "@/lib/utils";

/** Animated cyber background with grid, floating orbs, and radial glow. */
export function Background({ className }: { className?: string }) {
  return (
    <div className={cn("pointer-events-none fixed inset-0 -z-10 overflow-hidden", className)}>
      {/* base */}
      <div className="absolute inset-0 bg-[hsl(222_47%_6%)]" />
      {/* grid with fade mask */}
      <div className="absolute inset-0 grid-bg mask-fade opacity-60" />
      {/* top radial glow */}
      <div className="absolute -top-40 left-1/2 h-[520px] w-[820px] -translate-x-1/2 rounded-full bg-primary/20 blur-[120px]" />
      {/* floating orbs */}
      <div className="float-slow absolute top-1/3 -left-20 h-72 w-72 rounded-full bg-secondary/15 blur-[100px]" />
      <div className="float-slow-2 absolute bottom-1/4 right-0 h-80 w-80 rounded-full bg-primary/10 blur-[110px]" />
      {/* vignette */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-black/40" />
    </div>
  );
}

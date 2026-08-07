import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Plus, ChevronDown } from "lucide-react";
import * as Accordion from "@radix-ui/react-accordion";

interface FaqItem {
  question: string;
  answer: string;
}

interface FaqCardProps {
  items: FaqItem[];
  className?: string;
}

export function FaqCard({ items, className }: FaqCardProps) {
  return (
    <Accordion.Root type="single" collapsible className={cn("space-y-3", className)}>
      {items.map((item, i) => (
        <motion.div
          key={i}
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-40px" }}
          transition={{ duration: 0.4, delay: i * 0.06 }}
        >
          <Accordion.Item value={`item-${i}`} className="glass overflow-hidden rounded-xl ring-1 ring-transparent transition-colors data-[state=open]:ring-primary/30">
            <Accordion.Header>
              <Accordion.Trigger className="group flex w-full items-center justify-between gap-4 p-5 text-left">
                <span className="flex items-center gap-3 text-sm font-semibold text-foreground">
                  <Plus size={16} className="text-secondary transition-transform duration-300 group-data-[state=open]:rotate-45" />
                  {item.question}
                </span>
                <ChevronDown size={16} className="shrink-0 text-muted-foreground transition-transform duration-300 group-data-[state=open]:rotate-180" />
              </Accordion.Trigger>
            </Accordion.Header>
            <Accordion.Content className="overflow-hidden data-[state=closed]:animate-accordion-up data-[state=open]:animate-accordion-down">
              <p className="px-5 pb-5 pl-12 text-sm leading-relaxed text-muted-foreground">{item.answer}</p>
            </Accordion.Content>
          </Accordion.Item>
        </motion.div>
      ))}
    </Accordion.Root>
  );
}

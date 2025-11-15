import { cva, type VariantProps } from "class-variance-authority";
import { cn } from "@/lib/utils";

const badgeVariants = cva(
  "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-wide",
  {
    variants: {
      variant: {
        default: "border-purple-400/40 bg-purple-500/15 text-purple-100",
        sky: "border-sky-400/50 bg-sky-400/15 text-sky-100",
        success: "border-emerald-400/40 bg-emerald-400/15 text-emerald-100"
      }
    },
    defaultVariants: {
      variant: "default"
    }
  }
);

export interface BadgeProps extends VariantProps<typeof badgeVariants> {
  className?: string;
  children: React.ReactNode;
}

export function Badge({ className, variant, children }: BadgeProps) {
  return <span className={cn(badgeVariants({ variant, className }))}>{children}</span>;
}


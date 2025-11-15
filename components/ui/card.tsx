import { cn } from "@/lib/utils";

export function Card({
  className,
  children
}: {
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <div className={cn("glass-panel rounded-3xl border border-white/10 p-6", className)}>
      {children}
    </div>
  );
}

export function CardTitle({ children, className }: { children: React.ReactNode; className?: string }) {
  return <h3 className={cn("text-lg font-semibold text-white", className)}>{children}</h3>;
}

export function CardDescription({
  children,
  className
}: {
  children: React.ReactNode;
  className?: string;
}) {
  return <p className={cn("mt-1 text-sm text-muted", className)}>{children}</p>;
}


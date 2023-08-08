import { cn } from "@/lib/utils";

export function SideBySide({ className, children }: { className?: string; children: React.ReactNode }) {
  return <div className={cn("md:flex md:items-center even:md:flex-row-reverse", className)}>{children}</div>;
}

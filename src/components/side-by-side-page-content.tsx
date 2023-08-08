import { cn } from "@/lib/utils";

export function SideBySidePageContent({
  image,
  className,
  children,
}: {
  image: string | undefined;
  className?: string;
  children?: React.ReactNode;
}) {
  return (
    <div className={cn("md:flex md:items-center even:md:flex-row-reverse", className)}>
      <div className={image ? "basis-3/4" : undefined}>{children}</div>
      {image ? (
        <div className="hidden md:block md:basis-1/4 md:p-4">
          <img src={image} alt="" loading="lazy" />
        </div>
      ) : null}
    </div>
  );
}

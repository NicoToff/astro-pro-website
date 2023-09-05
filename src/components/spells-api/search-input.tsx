import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Input, type InputProps } from "@/shadcn/ui/input";
import { Search, Loader, SearchX, Disc3 } from "lucide-react";

export interface SearchInputProps extends InputProps {
  icon?: React.ReactNode;
  iconPlacement?: "left" | "right";
  isLoading?: boolean;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, icon, iconPlacement = "left", isLoading, ...props }, ref) => {
    if (!icon) icon = <Search size={24} />;
    if (isLoading) icon = <Disc3 className="animate-spin" size={24} />;
    return (
      <div className={cn("relative", className)}>
        <Input ref={ref} className={cn("pl-10", iconPlacement === "right" ? "pr-10" : null)} {...props} />
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 flex items-center",
            iconPlacement === "right" ? "right-2" : "left-2"
          )}
        >
          {icon}
        </div>
      </div>
    );
  }
);
SearchInput.displayName = "SearchInput";

export { SearchInput };

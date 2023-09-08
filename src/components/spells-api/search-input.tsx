import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { Input, type InputProps } from "@/shadcn/ui/input";
import { Search, Disc3 } from "lucide-react";

export interface SearchInputProps extends InputProps {
  icon?: React.ReactNode;
  iconPlacement?: "left" | "right";
  isLoading?: boolean;
  inputClassName?: string;
  iconDivClassName?: string;
}

const SearchInput = forwardRef<HTMLInputElement, SearchInputProps>(
  ({ className, icon, iconPlacement = "left", isLoading, inputClassName, iconDivClassName, ...props }, ref) => {
    if (!icon) icon = <Search size={24} />;
    if (isLoading) icon = <Disc3 className="animate-spin" size={24} />;
    return (
      <div className={cn("relative", className)}>
        <Input
          ref={ref}
          className={cn("text-md", iconPlacement === "right" ? "pr-10" : "pl-10", inputClassName)}
          {...props}
        />
        <div
          className={cn(
            "pointer-events-none absolute inset-y-0 flex items-center",
            iconPlacement === "right" ? "right-2" : "left-2",
            iconDivClassName
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

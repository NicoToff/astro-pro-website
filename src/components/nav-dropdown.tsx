import {
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuTrigger,
  NavigationMenuContent,
} from "@/shadcn/ui/navigation-menu";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import type { ProjectInfo } from "@/types/dropdown";

type DropdownProps = {
  children?: React.ReactNode;
  dropdownItems: ProjectInfo;
};

export function Dropdown({ children = "Dropdown", dropdownItems }: DropdownProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuTrigger>{children}</NavigationMenuTrigger>
      <NavigationMenuContent>
        <ul className="grid w-[99vw] gap-3 p-4 sm:w-[640px] md:w-[768px] md:grid-cols-2 lg:w-[1024px] xl:w-[1280px] xl:grid-cols-3 2xl:w-[1536px] 2xl:grid-cols-4">
          {dropdownItems.map((it) => (
            <ListItem key={it.title} title={it.title} href={it.href}>
              {it.description}
            </ListItem>
          ))}
        </ul>
      </NavigationMenuContent>
    </NavigationMenuItem>
  );
}
Dropdown.displayName = "Dropdown";

const ListItem = forwardRef<React.ElementRef<"a">, React.ComponentPropsWithoutRef<"a">>(
  ({ className, title, children, ...props }, ref) => {
    return (
      <li>
        <NavigationMenuLink asChild>
          <a
            ref={ref}
            className={cn(
              "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
              className
            )}
            {...props}
          >
            <div className="text-sm font-medium leading-none">{title}</div>
            <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
          </a>
        </NavigationMenuLink>
      </li>
    );
  }
);
ListItem.displayName = "ListItem";

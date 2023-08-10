import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuContent,
  navigationMenuTriggerStyle,
} from "@/shadcn/ui/navigation-menu";
import { forwardRef } from "react";
import { cn } from "@/lib/utils";
import { getParsedCollection } from "@/lib/helpers";

const collectionToGet = "projects";

const dropdownItems = (await getParsedCollection(collectionToGet))
  .map(({ frontmatter }) => ({
    title: frontmatter.title,
    href: `/${collectionToGet}/${frontmatter.href}`,
    description: frontmatter.shortDescription,
  }))
  .reverse()
  .splice(0, 11); // Only show the 11 most recent projects

dropdownItems.push({
  title: "All Projects",
  href: `/${collectionToGet}`,
  description: "See all projects",
});

const navigationLinks = [
  { href: "/skills", text: "Skills" },
  { href: "/hobbies", text: "Hobbies" },
  { href: "/contact", text: "Contact" },
];

export function Nav({ children }: { children?: React.ReactNode }) {
  return (
    <NavigationMenu className={`mb-2 mt-4 max-w-none border-b pb-2 print:hidden`}>
      <NavigationMenuList>
        <NavigationMenuItem className="px-2" aria-description="Go to home page">
          <NavigationMenuLink href="/">
            <img src="/images/logos/nt256.png" className="h-9 w-9 dark:border dark:border-primary" alt="" />
          </NavigationMenuLink>
        </NavigationMenuItem>
        <Dropdown dropdownItems={dropdownItems}>Projects</Dropdown>
        {navigationLinks.map((elem, i) => (
          <NavItem key={i} {...elem} />
        ))}
        {children ? <NavigationMenuItem>{children}</NavigationMenuItem> : null}
      </NavigationMenuList>
    </NavigationMenu>
  );
}
Nav.displayName = "Nav";

type NavItemProps = { href: string; text: string };

function NavItem({ href, text }: NavItemProps) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink href={href} className={navigationMenuTriggerStyle()}>
        {text}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}
NavItem.displayName = "NavItem";

type DropdownProps = {
  children?: React.ReactNode;
  dropdownItems: { title: string; href: string; description: string }[];
};

function Dropdown({ children = "Dropdown", dropdownItems }: DropdownProps) {
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

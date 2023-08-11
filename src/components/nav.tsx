import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/shadcn/ui/navigation-menu";
import { Dropdown } from "./nav-dropdown";

import { Menu, PlusCircle } from "lucide-react";

import { Button } from "@/shadcn/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/shadcn/ui/dropdown-menu";
import type { ProjectInfo } from "@/types/dropdown";

const navigationLinks = [
  { href: "/skills", text: "Skills" },
  { href: "/hobbies", text: "Hobbies" },
  { href: "/contact", text: "Contact" },
] as const;

type NavProps = { children?: React.ReactNode; dropdownItems: ProjectInfo };
export function Nav({ children, dropdownItems }: NavProps) {
  return (
    <NavigationMenu
      className={`mx-4 mb-2 mt-4 max-w-none flex-row-reverse justify-end border-b pb-2 print:hidden sm:mx-0 sm:flex-row sm:justify-center`}
    >
      <NavigationMenuList className="hidden sm:flex">
        <NavigationMenuItem className="px-2" aria-description="Go to home page">
          <NavigationMenuLink href="/">
            <img src="/images/logos/nt256.png" className="h-9 w-9 dark:border dark:border-primary" alt="" />
          </NavigationMenuLink>
        </NavigationMenuItem>
        <Dropdown dropdownItems={dropdownItems}>Projects</Dropdown>
        {navigationLinks.map((elem, i) => (
          <NavItem key={i} {...elem} />
        ))}
      </NavigationMenuList>
      {children}
      <div className="sm:hidden">
        <MobileNav dropdownItems={dropdownItems} />
      </div>
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

export function MobileNav({ dropdownItems }: { dropdownItems: ProjectInfo }) {
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline">
          <Menu />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <a href={"/"}>
          <DropdownMenuItem>
            <span>Home</span>
          </DropdownMenuItem>
        </a>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>
            <span>Projects</span>
          </DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              {dropdownItems.slice(0, dropdownItems.length - 1).map((it) => (
                <a href={it.href} key={it.title}>
                  <DropdownMenuItem>
                    <span>{it.title}</span>
                  </DropdownMenuItem>
                </a>
              ))}
              <DropdownMenuSeparator />
              {dropdownItems.slice(dropdownItems.length - 1, dropdownItems.length).map((it) => (
                <a href={it.href} key={it.title}>
                  <DropdownMenuItem>
                    <PlusCircle className="mr-2 h-4 w-4" />
                    <span>{it.title}</span>
                  </DropdownMenuItem>
                </a>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        {navigationLinks.map((elem) => (
          <a href={elem.href} key={elem.href}>
            <DropdownMenuItem>
              <span>{elem.text}</span>
            </DropdownMenuItem>
          </a>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
MobileNav.displayName = "DropdownMenuDemo";

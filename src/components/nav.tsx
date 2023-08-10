import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/shadcn/ui/navigation-menu";
import { Dropdown } from "./nav-dropdown";

const navigationLinks = [
  { href: "/skills", text: "Skills" },
  { href: "/hobbies", text: "Hobbies" },
  { href: "/contact", text: "Contact" },
];

export function Nav({ children, dropdownItems }: { children?: React.ReactNode; dropdownItems: any }) {
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

import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/shadcn/ui/navigation-menu";

export function Nav({ children }: { children?: React.ReactNode }) {
  const navigationLinks = [
    { href: "/", text: "Home" },
    { href: "/contact", text: "Contact" },
  ];
  return (
    <NavigationMenu className="max-w-none mx-4 mt-4 mb-2 pb-2 border-b">
      <NavigationMenuList>
        <NavigationMenuItem className="px-2">
          <NavigationMenuLink href="/">
            <img src="/logos/nt256.png" className="h-9 w-9 dark:border dark:border-primary" alt="logo home button" />
          </NavigationMenuLink>
        </NavigationMenuItem>
        {navigationLinks.map((elem) => (
          <NavItem {...elem} />
        ))}
        {children ? <NavigationMenuItem>{children}</NavigationMenuItem> : null}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavItem({ href, text }: { href: string; text: string }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink href={href} className={navigationMenuTriggerStyle()}>
        {text}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

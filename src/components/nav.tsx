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
    { href: "/skills", text: "Skills" },
    { href: "/hobbies", text: "Hobbies" },
    { href: "/contact", text: "Contact" },
  ];
  return (
    <NavigationMenu className="mx-4 mb-2 mt-4 max-w-none border-b pb-2">
      <NavigationMenuList>
        <NavigationMenuItem className="px-2">
          <NavigationMenuLink href="/">
            <img
              src="images/logos/nt256.png"
              className="h-9 w-9 dark:border dark:border-primary"
              alt="logo home button"
            />
          </NavigationMenuLink>
        </NavigationMenuItem>
        {navigationLinks.map((elem, i) => (
          <NavItem key={i} {...elem} hideIf={elem.href === "/"} />
        ))}
        {children ? <NavigationMenuItem>{children}</NavigationMenuItem> : null}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

function NavItem({ href, text, hideIf }: { href: string; text: string; hideIf?: boolean }) {
  return (
    <NavigationMenuItem className={hideIf ? "hidden md:block" : undefined} aria-hidden={hideIf}>
      <NavigationMenuLink href={href} className={navigationMenuTriggerStyle()}>
        {text}
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

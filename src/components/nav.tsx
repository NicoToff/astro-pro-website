import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/shadcn/ui/navigation-menu";

export function Nav({ children }: { children?: React.ReactNode }) {
  const style = navigationMenuTriggerStyle();
  return (
    <NavigationMenu className="max-w-none mx-4 mt-4 mb-2 pb-2 border-b">
      <NavigationMenuList>
        <NavigationMenuItem className="px-2">
          <NavigationMenuLink href="/">
            <img src="/logos/nt256.png" alt="logo" className="h-9 w-9" />
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/" className={style}>
            Home
          </NavigationMenuLink>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <NavigationMenuLink href="/about" className={style}>
            About
          </NavigationMenuLink>
        </NavigationMenuItem>
        {children ? <NavigationMenuItem>{children}</NavigationMenuItem> : null}
      </NavigationMenuList>
    </NavigationMenu>
  );
}

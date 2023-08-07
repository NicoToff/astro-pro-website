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
    <NavigationMenu>
      <NavigationMenuList>
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

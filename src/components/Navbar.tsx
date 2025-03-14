import Link from "next/link";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

const menuButtons = [
  { id: 1, name: "Usuarios", href: "/users" },
  { id: 2, name: "Publicaciones", href: "/posts" },
];

function Navbar() {
  return (
    <NavigationMenu>
      <NavigationMenuList>
        <NavigationMenuItem>
          {menuButtons.map((menu) => {
            return (
              <Link key={menu.id} href={menu.href} legacyBehavior passHref>
                <NavigationMenuLink className={navigationMenuTriggerStyle()}>
                  {menu.name}
                </NavigationMenuLink>
              </Link>
            );
          })}
        </NavigationMenuItem>
      </NavigationMenuList>
    </NavigationMenu>
  );
}

export default Navbar;

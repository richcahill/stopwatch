"use client";

import Link from "next/link";
import { Timer } from "lucide-react";
import {
  NavigationMenu,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";
import { ThemePicker } from "@/components/theme-picker";

export function Navbar() {
  return (
    <header className="border-b">
      <div className="h-16 items-center justify-between px-4 grid grid-cols-[auto_1fr_auto]">
        <Link href="/" className="flex items-center gap-2">
          <Timer className="h-6 w-6" />
        </Link>

        <NavigationMenu className="justify-self-center">
          <NavigationMenuList>
            <NavigationMenuItem>
              <NavigationMenuLink
                asChild
                className={navigationMenuTriggerStyle()}
              >
                <Link href="/">stopwatch</Link>
              </NavigationMenuLink>
            </NavigationMenuItem>
          </NavigationMenuList>
        </NavigationMenu>

        <ThemePicker />
      </div>
    </header>
  );
}

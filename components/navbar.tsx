"use client";

import Link from "next/link";
import { Timer } from "lucide-react";
import { ThemePicker } from "@/components/theme-picker";

export function Navbar() {
  return (
    <header className="">
      <div className="h-16 items-center justify-between px-4 flex">
        <Link href="/" className="flex items-center gap-2">
          <Timer className="h-6 w-6" />
        </Link>
        <ThemePicker />
      </div>
    </header>
  );
}

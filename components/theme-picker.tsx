"use client"

import * as React from "react"
import { Moon, Sun, Monitor } from "lucide-react"
import { useTheme } from "next-themes"

export function ThemePicker() {
  const { theme, setTheme } = useTheme()
  const [mounted, setMounted] = React.useState(false)

  React.useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return null
  }

  return (
    <div className="inline-flex items-center gap-0.5 border bg-background p-0.5">
      <button
        onClick={() => setTheme("system")}
        className={`p-1.5 transition-colors ${
          theme === "system" ? "bg-muted" : "hover:bg-muted/50"
        }`}
        aria-label="system theme"
      >
        <Monitor className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("light")}
        className={`p-1.5 transition-colors ${
          theme === "light" ? "bg-muted" : "hover:bg-muted/50"
        }`}
        aria-label="light theme"
      >
        <Sun className="h-4 w-4" />
      </button>
      <button
        onClick={() => setTheme("dark")}
        className={`p-1.5 transition-colors ${
          theme === "dark" ? "bg-muted" : "hover:bg-muted/50"
        }`}
        aria-label="dark theme"
      >
        <Moon className="h-4 w-4" />
      </button>
    </div>
  )
}


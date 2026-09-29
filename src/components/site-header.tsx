"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { Cat, Play } from "lucide-react"

import { buttonVariants } from "@/components/ui/button"
import { navLinks, site } from "@/lib/site"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const pathname = usePathname()

  return (
    <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-4 px-4 sm:px-6">
        <Link href="/" className="flex shrink-0 items-center gap-2">
          <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
            <Cat className="size-5" />
          </span>
          <span className="hidden font-heading text-xl font-semibold tracking-tight sm:inline">
            {site.name}
          </span>
        </Link>

        <nav className="flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={cn(
                "rounded-full px-3 py-1.5 text-sm font-medium transition-colors",
                pathname === link.href
                  ? "bg-accent text-accent-foreground"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <a
          href={site.youtubeUrl}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Watch on YouTube"
          className={cn(
            buttonVariants({ variant: "outline" }),
            "shrink-0 rounded-full max-sm:size-8 max-sm:px-0"
          )}
        >
          <Play data-icon="inline-start" />
          <span className="hidden sm:inline">Watch on YouTube</span>
        </a>
      </div>
    </header>
  )
}

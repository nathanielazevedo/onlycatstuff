import { useState } from "react"
import { Cat, PawPrint, Play, Search } from "lucide-react"

import { ProductCard } from "@/components/product-card"
import { buttonVariants } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { categories, partners, products, type Category } from "@/data/products"
import { cn } from "@/lib/utils"

// TODO: swap in the real channel URL
const YOUTUBE_URL = "https://www.youtube.com/"

type Filter = Category | "all"

function App() {
  const [filter, setFilter] = useState<Filter>("all")
  const [query, setQuery] = useState("")

  // Only show category chips that actually have products
  const availableCategories = categories.filter((c) =>
    products.some((p) => p.category === c.id)
  )

  const q = query.trim().toLowerCase()
  const visibleProducts = products.filter(
    (p) =>
      (filter === "all" || p.category === filter) &&
      (!q ||
        p.name.toLowerCase().includes(q) ||
        p.description.toLowerCase().includes(q))
  )

  return (
    <div className="min-h-svh">
      <header className="sticky top-0 z-10 border-b bg-background/80 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4 sm:px-6">
          <a href="/" className="flex items-center gap-2">
            <span className="flex size-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Cat className="size-5" />
            </span>
            <span className="font-heading text-xl font-semibold tracking-tight">
              only cat stuff
            </span>
          </a>
          <a
            href={YOUTUBE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(buttonVariants({ variant: "outline" }), "rounded-full")}
          >
            <Play data-icon="inline-start" />
            <span className="sm:hidden">YouTube</span>
            <span className="hidden sm:inline">Watch on YouTube</span>
          </a>
        </div>
      </header>

      <main className="mx-auto max-w-6xl px-4 sm:px-6">
        <section className="relative py-16 text-center sm:py-24">
          <PawPrint className="absolute top-10 left-[8%] size-8 -rotate-12 text-primary/15" />
          <PawPrint className="absolute right-[10%] bottom-12 size-10 rotate-12 text-primary/15" />
          <span className="inline-flex items-center gap-1.5 rounded-full bg-accent px-3 py-1 text-sm font-medium text-accent-foreground">
            <PawPrint className="size-3.5" />
            Tested by our cats
          </span>
          <h1 className="mx-auto mt-5 max-w-2xl font-heading text-4xl font-semibold tracking-tight text-balance sm:text-6xl">
            The stuff our cats actually love
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-lg text-pretty text-muted-foreground">
            Toys, scratchers and treats we've featured on the channel, all in
            one cozy place.
          </p>
        </section>

        <section id="shop" className="pb-20">
          <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex flex-wrap gap-2">
              {[{ id: "all" as const, label: "All" }, ...availableCategories].map(
                (c) => (
                  <button
                    key={c.id}
                    onClick={() => setFilter(c.id)}
                    className={cn(
                      "rounded-full border px-4 py-1.5 text-sm font-medium transition-colors",
                      filter === c.id
                        ? "border-primary bg-primary text-primary-foreground"
                        : "bg-card hover:bg-accent hover:text-accent-foreground"
                    )}
                  >
                    {c.label}
                  </button>
                )
              )}
            </div>
            <div className="relative sm:w-64">
              <Search className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground" />
              <Input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search products"
                className="h-9 rounded-full bg-card pl-9"
              />
            </div>
          </div>

          {visibleProducts.length > 0 ? (
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {visibleProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center gap-3 rounded-2xl border border-dashed py-16 text-center text-muted-foreground">
              <Cat className="size-10 text-primary/40" />
              <p>No products match that search. Try something else?</p>
            </div>
          )}
        </section>
      </main>

      <footer className="border-t bg-secondary/40">
        <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <span className="font-heading text-lg font-semibold">
              only cat stuff
            </span>
            <p className="text-sm text-muted-foreground">
              Partners: {partners.map((p) => p.name).join(", ")}
            </p>
          </div>
          <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
            Some links on this site are affiliate links. If you buy through
            them, we may earn a small commission at no extra cost to you. As an
            Amazon Associate we earn from qualifying purchases.
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App

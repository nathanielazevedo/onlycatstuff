"use client"

import { useState } from "react"
import { Cat, Search } from "lucide-react"

import { ProductCard } from "@/components/product-card"
import { Input } from "@/components/ui/input"
import { categories, products, type Category } from "@/data/products"
import { cn } from "@/lib/utils"

type Filter = Category | "all"

export function ProductBrowser() {
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
    <>
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
            aria-label="Search products"
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
    </>
  )
}

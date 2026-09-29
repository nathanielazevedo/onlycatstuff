import { partners } from "@/data/products"
import { site } from "@/lib/site"

export function SiteFooter() {
  return (
    <footer className="border-t bg-secondary/40">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-10 sm:px-6">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <span className="font-heading text-lg font-semibold">{site.name}</span>
          <p className="text-sm text-muted-foreground">
            Partners: {partners.map((p) => p.name).join(", ")}
          </p>
        </div>
        <p className="max-w-3xl text-xs leading-relaxed text-muted-foreground">
          Some links on this site are affiliate links. If you buy through them,
          we may earn a small commission at no extra cost to you. As an Amazon
          Associate we earn from qualifying purchases.
        </p>
      </div>
    </footer>
  )
}

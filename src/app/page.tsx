import Link from "next/link"
import { ArrowRight, CalendarHeart, PawPrint, Sparkles } from "lucide-react"

import { ProductBrowser } from "@/components/product-browser"

const tools = [
  {
    href: "/quiz",
    icon: Sparkles,
    title: "What toy will my cat love?",
    description: "Answer 5 quick questions about your cat's play style.",
  },
  {
    href: "/cat-age-calculator",
    icon: CalendarHeart,
    title: "Cat age calculator",
    description: "Find out how old your cat is in human years.",
  },
]

export default function HomePage() {
  return (
    <>
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
          Toys, scratchers and treats we've featured on the channel, all in one
          cozy place.
        </p>
      </section>

      <section id="shop" className="pb-16">
        <ProductBrowser />
      </section>

      <section className="pb-20">
        <h2 className="mb-6 font-heading text-2xl font-semibold tracking-tight">
          Free tools for cat people
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {tools.map((tool) => (
            <Link
              key={tool.href}
              href={tool.href}
              className="group flex items-center gap-4 rounded-2xl bg-card p-5 ring-1 ring-foreground/10 transition-all hover:-translate-y-0.5 hover:shadow-lg hover:shadow-primary/10"
            >
              <span className="flex size-12 shrink-0 items-center justify-center rounded-full bg-accent text-accent-foreground">
                <tool.icon className="size-6" />
              </span>
              <span className="flex-1">
                <span className="block font-heading text-lg font-medium">
                  {tool.title}
                </span>
                <span className="block text-sm text-muted-foreground">
                  {tool.description}
                </span>
              </span>
              <ArrowRight className="size-5 text-muted-foreground transition-transform group-hover:translate-x-1" />
            </Link>
          ))}
        </div>
      </section>
    </>
  )
}

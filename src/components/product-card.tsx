import { Cat, ExternalLink, Play } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { buttonVariants } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import { partners, retailerLabels, type Product } from "@/data/products"
import { cn } from "@/lib/utils"

// Soft pastel backdrops for products without a photo yet
const placeholderTints = [
  "from-rose-100 to-orange-50",
  "from-amber-100 to-yellow-50",
  "from-sky-100 to-indigo-50",
  "from-emerald-100 to-teal-50",
  "from-violet-100 to-pink-50",
]

function tintFor(id: string) {
  let hash = 0
  for (const ch of id) hash = (hash * 31 + ch.charCodeAt(0)) >>> 0
  return placeholderTints[hash % placeholderTints.length]
}

export function ProductCard({ product }: { product: Product }) {
  const partner = partners.find((p) => p.id === product.partnerId)

  return (
    <Card className="group gap-4 pt-0 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-primary/10">
      <div className="relative aspect-square overflow-hidden bg-muted">
        {product.image ? (
          <img
            src={product.image}
            alt={product.name}
            loading="lazy"
            className="size-full object-cover transition-transform duration-500 group-hover:scale-105"
          />
        ) : (
          <div
            className={cn(
              "flex size-full items-center justify-center bg-gradient-to-br",
              tintFor(product.id)
            )}
          >
            <Cat
              className="size-16 text-foreground/15 transition-transform duration-500 group-hover:scale-110 group-hover:-rotate-6"
              strokeWidth={1.5}
            />
          </div>
        )}
        {product.badge && (
          <Badge className="absolute top-3 left-3 bg-background/90 text-foreground shadow-sm backdrop-blur">
            {product.badge}
          </Badge>
        )}
      </div>

      <CardHeader>
        {partner && (
          <span className="text-xs font-medium tracking-wide text-primary uppercase">
            {partner.name}
          </span>
        )}
        <CardTitle className="text-lg">{product.name}</CardTitle>
      </CardHeader>

      <CardContent className="flex-1">
        <CardDescription className="leading-relaxed">
          {product.description}
        </CardDescription>
      </CardContent>

      <CardFooter className="gap-2 border-t-0 bg-transparent pt-0 pb-4">
        <a
          href={product.url}
          target="_blank"
          rel="sponsored noopener noreferrer"
          className={cn(buttonVariants({ size: "lg" }), "flex-1 rounded-full")}
        >
          View on {retailerLabels[product.retailer]}
          <ExternalLink data-icon="inline-end" />
        </a>
        {product.videoUrl && (
          <a
            href={product.videoUrl}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Watch our video about ${product.name}`}
            className={cn(
              buttonVariants({ variant: "outline", size: "icon-lg" }),
              "rounded-full"
            )}
          >
            <Play />
          </a>
        )}
      </CardFooter>
    </Card>
  )
}

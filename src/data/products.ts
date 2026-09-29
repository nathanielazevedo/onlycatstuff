export type Retailer = "amazon" | "chewy" | "brand"

export type Category = "toys" | "scratchers" | "catnip" | "beds" | "feeding"

/** Play styles used by the toy quiz to match cats to products */
export type Trait =
  | "hunter"
  | "batter"
  | "catnip"
  | "scratcher"
  | "lounger"
  | "solo"
  | "interactive"

export interface Partner {
  id: string
  name: string
  website?: string
}

export interface Product {
  id: string
  name: string
  partnerId: Partner["id"]
  description: string
  category: Category
  /** Which kinds of cats this suits. Drives toy quiz recommendations. */
  traits: Trait[]
  /** Affiliate link supplied by the partner (Amazon, Chewy, etc.) */
  url: string
  retailer: Retailer
  /** Optional product photo. Drop files in /public/products and reference as "/products/name.jpg" */
  image?: string
  /** Short label shown on the card, e.g. "Staff pick" or "Seen on YouTube" */
  badge?: string
  /** Link to the YouTube video where we featured this product */
  videoUrl?: string
}

export const partners: Partner[] = [
  { id: "smartykat", name: "SmartyKat", website: "https://www.smartykat.com" },
]

export const categories: { id: Category; label: string }[] = [
  { id: "toys", label: "Toys" },
  { id: "catnip", label: "Catnip" },
  { id: "scratchers", label: "Scratchers" },
  { id: "beds", label: "Beds" },
  { id: "feeding", label: "Feeding" },
]

export const retailerLabels: Record<Retailer, string> = {
  amazon: "Amazon",
  chewy: "Chewy",
  brand: "Store",
}

// TODO: replace the placeholder "#" urls with the affiliate links SmartyKat sends over.
export const products: Product[] = [
  {
    id: "smartykat-skitter-critters",
    name: "Skitter Critters Catnip Mice",
    partnerId: "smartykat",
    description: "Classic little catnip mice that get batted under every couch in the house.",
    category: "catnip",
    traits: ["catnip", "batter", "solo"],
    url: "#",
    retailer: "amazon",
    badge: "Staff pick",
  },
  {
    id: "smartykat-hot-pursuit",
    name: "Hot Pursuit Electronic Toy",
    partnerId: "smartykat",
    description: "A wand that spins and hides under a cover, so your cat can hunt without you.",
    category: "toys",
    traits: ["hunter", "solo"],
    url: "#",
    retailer: "amazon",
    badge: "Seen on YouTube",
  },
  {
    id: "smartykat-madcap-mice",
    name: "Madcap Mice Catnip Toys",
    partnerId: "smartykat",
    description: "Soft, crinkly mice stuffed with catnip for short bursts of zoomies.",
    category: "catnip",
    traits: ["catnip", "batter"],
    url: "#",
    retailer: "amazon",
  },
  {
    id: "smartykat-scratch-lounge",
    name: "Corrugated Scratcher Lounge",
    partnerId: "smartykat",
    description: "Cardboard scratcher that doubles as a nap spot. Comes with catnip.",
    category: "scratchers",
    traits: ["scratcher", "lounger", "catnip"],
    url: "#",
    retailer: "amazon",
  },
  {
    id: "smartykat-feather-wand",
    name: "Feather Whirl Wand",
    partnerId: "smartykat",
    description: "A fluttery feather wand for interactive play sessions before bedtime.",
    category: "toys",
    traits: ["hunter", "interactive"],
    url: "#",
    retailer: "amazon",
  },
  {
    id: "smartykat-crackle-balls",
    name: "Crackle Ball Toys",
    partnerId: "smartykat",
    description: "Lightweight crinkle balls that make a satisfying sound when pounced on.",
    category: "toys",
    traits: ["batter", "solo"],
    url: "#",
    retailer: "amazon",
  },
]

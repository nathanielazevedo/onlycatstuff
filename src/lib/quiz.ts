import { products, type Product, type Trait } from "@/data/products"

type Weights = Partial<Record<Trait, number>>

export interface QuizOption {
  label: string
  emoji: string
  weights: Weights
}

export interface QuizQuestion {
  id: string
  question: string
  options: QuizOption[]
}

export const questions: QuizQuestion[] = [
  {
    id: "play",
    question: "When your cat plays, what do they do most?",
    options: [
      { label: "Stalk, wiggle, then chase", emoji: "🐆", weights: { hunter: 3 } },
      { label: "Bat things across the floor", emoji: "⚽", weights: { batter: 3 } },
      { label: "Grab it and bunny-kick it", emoji: "🥋", weights: { catnip: 2, batter: 1 } },
      { label: "Scratch whatever's nearby", emoji: "🪵", weights: { scratcher: 3 } },
    ],
  },
  {
    id: "catnip",
    question: "How does your cat react to catnip?",
    options: [
      { label: "Loses their entire mind", emoji: "🤪", weights: { catnip: 4 } },
      { label: "Mildly interested", emoji: "🙂", weights: { catnip: 1 } },
      { label: "Couldn't care less", emoji: "😐", weights: { catnip: -4 } },
      { label: "Never tried it", emoji: "🤷", weights: {} },
    ],
  },
  {
    id: "energy",
    question: "What's their energy level?",
    options: [
      { label: "3am zoomies, every night", emoji: "⚡", weights: { hunter: 2, solo: 1 } },
      { label: "Short bursts, then a nap", emoji: "🔋", weights: { batter: 2 } },
      { label: "Professional napper", emoji: "😴", weights: { lounger: 3 } },
    ],
  },
  {
    id: "company",
    question: "Who's around during the day?",
    options: [
      { label: "They're home alone a lot", emoji: "🏠", weights: { solo: 3 } },
      { label: "Someone's usually home to play", emoji: "👋", weights: { interactive: 3 } },
      { label: "A bit of both", emoji: "🔄", weights: { solo: 1, interactive: 1 } },
    ],
  },
  {
    id: "destroy",
    question: "What's most likely to get wrecked in your house?",
    options: [
      { label: "The couch or the rug", emoji: "🛋️", weights: { scratcher: 3 } },
      { label: "Anything dangly: cords, strings, blinds", emoji: "🧶", weights: { hunter: 2, interactive: 1 } },
      { label: "Small stuff knocked off tables", emoji: "🖊️", weights: { batter: 2 } },
      { label: "Nothing, they're an angel", emoji: "😇", weights: { lounger: 2 } },
    ],
  },
]

export interface Persona {
  name: string
  emoji: string
  description: string
}

export const personas: Record<Trait, Persona> = {
  hunter: {
    name: "The Stealthy Hunter",
    emoji: "🐆",
    description:
      "Your cat lives for the stalk and the chase. Toys that move unpredictably and hide will keep those instincts busy.",
  },
  batter: {
    name: "The Soccer Star",
    emoji: "⚽",
    description:
      "Small, light things that skid across the floor are your cat's favorite. Keep plenty around, because they will vanish under the couch.",
  },
  catnip: {
    name: "The Nip Connoisseur",
    emoji: "🌿",
    description:
      "Catnip is your cat's love language. Stuffed toys they can grab, roll and bunny-kick are a guaranteed hit.",
  },
  scratcher: {
    name: "The Renovator",
    emoji: "🪵",
    description:
      "Your cat has strong opinions about your furniture. Giving them a better place to scratch saves the couch and makes them happy.",
  },
  lounger: {
    name: "The Cozy Loaf",
    emoji: "🍞",
    description:
      "Your cat plays on their own terms and naps on everyone else's. Comfy spots and low-effort fun are the way to their heart.",
  },
  solo: {
    name: "The Independent Adventurer",
    emoji: "🧭",
    description:
      "Your cat keeps themselves entertained. Toys that work without you will keep them busy while you're out.",
  },
  interactive: {
    name: "The Social Butterfly",
    emoji: "🦋",
    description:
      "Your cat wants to play with you. Wand toys and play sessions together are where they really shine.",
  },
}

export interface QuizResult {
  persona: Persona
  recommendations: Product[]
}

/** answers[i] is the chosen option index for questions[i] */
export function scoreQuiz(answers: number[], limit = 3): QuizResult {
  const totals: Partial<Record<Trait, number>> = {}
  answers.forEach((optionIndex, i) => {
    const weights = questions[i].options[optionIndex].weights
    for (const [trait, weight] of Object.entries(weights) as [Trait, number][]) {
      totals[trait] = (totals[trait] ?? 0) + weight
    }
  })

  const topTrait = (Object.keys(personas) as Trait[]).reduce((best, trait) =>
    (totals[trait] ?? 0) > (totals[best] ?? 0) ? trait : best
  )

  const recommendations = products
    .map((product) => ({
      product,
      score: product.traits.reduce((sum, t) => sum + (totals[t] ?? 0), 0),
    }))
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map(({ product }) => product)

  return { persona: personas[topTrait], recommendations }
}

// Based on the International Cat Care age chart: a cat reaches ~15 human years
// by its first birthday, ~24 by its second, then ages ~4 human years per year.
const kittenChart: [months: number, humanYears: number][] = [
  [0, 0],
  [1, 1],
  [3, 4],
  [4, 7],
  [6, 10],
  [7, 12],
  [12, 15],
  [18, 21],
  [24, 24],
]

export function catToHumanYears(totalMonths: number): number {
  if (totalMonths <= 0) return 0
  if (totalMonths >= 24) return 24 + ((totalMonths - 24) / 12) * 4

  for (let i = 1; i < kittenChart.length; i++) {
    const [m1, h1] = kittenChart[i]
    if (totalMonths <= m1) {
      const [m0, h0] = kittenChart[i - 1]
      return h0 + ((totalMonths - m0) / (m1 - m0)) * (h1 - h0)
    }
  }
  return 24
}

export interface LifeStage {
  id: "kitten" | "young-adult" | "mature" | "senior"
  name: string
  range: string
  /** Stage starts at this many cat years */
  from: number
  emoji: string
  tips: string[]
}

// Life stages from the 2021 AAHA/AAFP Feline Life Stage Guidelines
export const lifeStages: LifeStage[] = [
  {
    id: "kitten",
    name: "Kitten",
    range: "Birth to 1 year",
    from: 0,
    emoji: "🍼",
    tips: [
      "Lots of short play sessions help them build confidence and burn off energy.",
      "Get them used to handling, brushing and their carrier early.",
      "Keep up with their vet visits and vaccinations.",
    ],
  },
  {
    id: "young-adult",
    name: "Young adult",
    range: "1 to 6 years",
    from: 1,
    emoji: "⚡",
    tips: [
      "Daily play keeps them fit and helps prevent boredom behaviors.",
      "Rotate toys every week or so to keep things new and exciting.",
      "Plan on a yearly vet checkup.",
    ],
  },
  {
    id: "mature",
    name: "Mature adult",
    range: "7 to 10 years",
    from: 7,
    emoji: "🧘",
    tips: [
      "Metabolism slows down, so keep an eye on their weight.",
      "Puzzle feeders and hunting-style play keep body and mind active.",
      "Ask your vet whether routine bloodwork makes sense.",
    ],
  },
  {
    id: "senior",
    name: "Senior",
    range: "10 years and up",
    from: 10,
    emoji: "👑",
    tips: [
      "Make favorite spots, beds and litter boxes easy to reach.",
      "Gentle, low-impact play still matters for their mood and mobility.",
      "Vets often recommend checkups every 6 months for seniors.",
    ],
  },
]

export function lifeStageFor(totalMonths: number): LifeStage {
  const years = totalMonths / 12
  return [...lifeStages].reverse().find((s) => years >= s.from) ?? lifeStages[0]
}

/** Rows for the reference chart shown on the calculator page */
export const ageChart: { label: string; months: number }[] = [
  { label: "1 month", months: 1 },
  { label: "3 months", months: 3 },
  { label: "6 months", months: 6 },
  { label: "1 year", months: 12 },
  { label: "18 months", months: 18 },
  ...Array.from({ length: 19 }, (_, i) => ({
    label: `${i + 2} years`,
    months: (i + 2) * 12,
  })),
]

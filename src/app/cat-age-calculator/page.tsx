import type { Metadata } from "next"

import { AgeCalculator } from "@/components/age-calculator"
import { ageChart, catToHumanYears, lifeStages } from "@/lib/cat-age"

export const metadata: Metadata = {
  title: "Cat Age Calculator: Cat Years to Human Years",
  description:
    "Convert your cat's age to human years and see which life stage they're in, with care tips for kittens, adults and senior cats.",
}

export default function CatAgeCalculatorPage() {
  return (
    <div className="py-12 sm:py-16">
      <div className="mx-auto mb-10 max-w-2xl text-center">
        <h1 className="font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          Cat age calculator
        </h1>
        <p className="mt-4 text-lg text-pretty text-muted-foreground">
          How old is your cat in human years? Enter their age to find out, plus
          what their life stage means for care and play.
        </p>
      </div>

      <AgeCalculator />

      <section className="mx-auto mt-20 grid max-w-4xl gap-12 md:grid-cols-2">
        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            How cat years work
          </h2>
          <div className="mt-4 space-y-4 leading-relaxed text-muted-foreground">
            <p>
              The old "multiply by 7" rule doesn't work for cats. Cats grow up
              fast: by their first birthday they're roughly equal to a
              15-year-old human, and by two they're about 24.
            </p>
            <p>
              After that, each cat year adds about 4 human years. So a 10-year-old
              cat is roughly 56 in human years. This calculator uses the age chart
              from International Cat Care.
            </p>
            <p>
              Vets group cats into life stages based on the AAHA/AAFP Feline Life
              Stage Guidelines:
            </p>
            <ul className="space-y-2">
              {lifeStages.map((s) => (
                <li key={s.id}>
                  <span className="font-medium text-foreground">
                    {s.emoji} {s.name}:
                  </span>{" "}
                  {s.range.toLowerCase()}
                </li>
              ))}
            </ul>
            <p className="text-sm">
              Every cat is different. This is a fun estimate, not medical
              advice. Your vet is the best guide to your cat's health.
            </p>
          </div>
        </div>

        <div>
          <h2 className="font-heading text-2xl font-semibold tracking-tight">
            Cat age chart
          </h2>
          <table className="mt-4 w-full overflow-hidden rounded-2xl bg-card text-sm ring-1 ring-foreground/10">
            <thead className="bg-secondary/60 text-left">
              <tr>
                <th className="px-4 py-2.5 font-medium">Cat age</th>
                <th className="px-4 py-2.5 text-right font-medium">Human age</th>
              </tr>
            </thead>
            <tbody>
              {ageChart.map((row) => (
                <tr key={row.label} className="border-t">
                  <td className="px-4 py-2">{row.label}</td>
                  <td className="px-4 py-2 text-right tabular-nums">
                    {Math.round(catToHumanYears(row.months))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>
    </div>
  )
}

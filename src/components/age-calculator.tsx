"use client"

import { useState } from "react"
import Link from "next/link"
import { Minus, Plus, Sparkles } from "lucide-react"

import { Button, buttonVariants } from "@/components/ui/button"
import { catToHumanYears, lifeStageFor, lifeStages } from "@/lib/cat-age"
import { cn } from "@/lib/utils"

function Stepper({
  label,
  value,
  min,
  max,
  onChange,
}: {
  label: string
  value: number
  min: number
  max: number
  onChange: (value: number) => void
}) {
  const clamp = (n: number) => Math.min(max, Math.max(min, n))
  return (
    <div className="flex flex-col items-center gap-2">
      <span className="text-sm font-medium text-muted-foreground">{label}</span>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="icon-lg"
          className="rounded-full"
          aria-label={`Fewer ${label.toLowerCase()}`}
          disabled={value <= min}
          onClick={() => onChange(clamp(value - 1))}
        >
          <Minus />
        </Button>
        <input
          type="number"
          inputMode="numeric"
          aria-label={label}
          min={min}
          max={max}
          value={value}
          onChange={(e) => onChange(clamp(Number(e.target.value) || 0))}
          className="w-16 appearance-none rounded-xl bg-transparent text-center font-heading text-4xl font-semibold tabular-nums outline-none focus-visible:ring-2 focus-visible:ring-ring [&::-webkit-inner-spin-button]:appearance-none"
        />
        <Button
          variant="outline"
          size="icon-lg"
          className="rounded-full"
          aria-label={`More ${label.toLowerCase()}`}
          disabled={value >= max}
          onClick={() => onChange(clamp(value + 1))}
        >
          <Plus />
        </Button>
      </div>
    </div>
  )
}

export function AgeCalculator() {
  const [years, setYears] = useState(3)
  const [months, setMonths] = useState(0)

  const totalMonths = years * 12 + months
  const humanYears = Math.round(catToHumanYears(totalMonths))
  const stage = lifeStageFor(totalMonths)

  return (
    <div className="grid gap-6 lg:grid-cols-2">
      <div className="flex flex-col items-center justify-center gap-8 rounded-3xl bg-card p-8 ring-1 ring-foreground/10">
        <p className="font-heading text-lg font-medium">How old is your cat?</p>
        <div className="flex flex-wrap justify-center gap-8">
          <Stepper label="Years" value={years} min={0} max={30} onChange={setYears} />
          <Stepper label="Months" value={months} min={0} max={11} onChange={setMonths} />
        </div>
      </div>

      <div className="flex flex-col items-center justify-center rounded-3xl bg-gradient-to-br from-rose-100 to-orange-50 p-8 text-center">
        <p className="text-sm font-medium tracking-wide text-accent-foreground uppercase">
          In human years
        </p>
        <p
          className="mt-2 font-heading text-7xl font-semibold tracking-tight tabular-nums sm:text-8xl"
          aria-live="polite"
        >
          {humanYears}
        </p>
        <span className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-background/80 px-3 py-1 text-sm font-medium">
          {stage.emoji} {stage.name}
        </span>

        <div className="mt-6 flex w-full max-w-sm gap-1" aria-hidden>
          {lifeStages.map((s) => (
            <div
              key={s.id}
              className={cn(
                "h-2 flex-1 rounded-full transition-colors",
                s.id === stage.id ? "bg-primary" : "bg-foreground/10"
              )}
            />
          ))}
        </div>
      </div>

      <div className="rounded-3xl bg-card p-8 ring-1 ring-foreground/10 lg:col-span-2">
        <h2 className="font-heading text-2xl font-semibold tracking-tight">
          {stage.emoji} Caring for your {stage.name.toLowerCase()} cat
        </h2>
        <p className="mt-1 text-sm text-muted-foreground">{stage.range}</p>
        <ul className="mt-5 grid gap-3 sm:grid-cols-3">
          {stage.tips.map((tip) => (
            <li key={tip} className="rounded-2xl bg-secondary/60 p-4 text-sm leading-relaxed">
              {tip}
            </li>
          ))}
        </ul>
        <div className="mt-6 flex flex-col items-start gap-3 border-t pt-6 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-sm text-muted-foreground">
            Not sure what toys suit your cat right now?
          </p>
          <Link href="/quiz" className={cn(buttonVariants(), "rounded-full")}>
            <Sparkles data-icon="inline-start" />
            Take the toy quiz
          </Link>
        </div>
      </div>
    </div>
  )
}

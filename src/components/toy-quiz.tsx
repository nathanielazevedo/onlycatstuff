"use client"

import { useState } from "react"
import { ArrowLeft, RotateCcw, Sparkles } from "lucide-react"

import { ProductCard } from "@/components/product-card"
import { Button } from "@/components/ui/button"
import { questions, scoreQuiz } from "@/lib/quiz"
import { cn } from "@/lib/utils"

export function ToyQuiz() {
  const [started, setStarted] = useState(false)
  const [answers, setAnswers] = useState<number[]>([])

  const step = answers.length
  const finished = step === questions.length

  function restart() {
    setAnswers([])
    setStarted(false)
  }

  if (!started) {
    return (
      <div className="mx-auto flex max-w-xl flex-col items-center py-16 text-center sm:py-24">
        <span className="flex size-16 items-center justify-center rounded-full bg-accent text-3xl">
          🐾
        </span>
        <h1 className="mt-6 font-heading text-4xl font-semibold tracking-tight text-balance sm:text-5xl">
          What toy will my cat love?
        </h1>
        <p className="mt-4 text-lg text-pretty text-muted-foreground">
          Answer {questions.length} quick questions about your cat and we'll
          match them with toys that fit their play style.
        </p>
        <Button
          size="lg"
          className="mt-8 h-11 rounded-full px-6 text-base"
          onClick={() => setStarted(true)}
        >
          <Sparkles data-icon="inline-start" />
          Start the quiz
        </Button>
      </div>
    )
  }

  if (finished) {
    const { persona, recommendations } = scoreQuiz(answers)
    return (
      <div className="py-12 sm:py-16">
        <div className="mx-auto max-w-xl text-center">
          <span className="text-sm font-medium tracking-wide text-primary uppercase">
            Your cat is
          </span>
          <div className="mt-4 text-6xl">{persona.emoji}</div>
          <h1 className="mt-4 font-heading text-4xl font-semibold tracking-tight sm:text-5xl">
            {persona.name}
          </h1>
          <p className="mt-4 text-lg text-pretty text-muted-foreground">
            {persona.description}
          </p>
        </div>

        <h2 className="mt-14 mb-6 font-heading text-2xl font-semibold tracking-tight">
          Toys we think they'll love
        </h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {recommendations.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>

        <div className="mt-10 flex justify-center">
          <Button variant="outline" size="lg" className="rounded-full" onClick={restart}>
            <RotateCcw data-icon="inline-start" />
            Take it again
          </Button>
        </div>
      </div>
    )
  }

  const current = questions[step]

  return (
    <div className="mx-auto max-w-xl py-12 sm:py-16">
      <div className="mb-8 flex items-center gap-4">
        <Button
          variant="ghost"
          size="icon"
          className="rounded-full"
          aria-label="Previous question"
          onClick={() => (step === 0 ? setStarted(false) : setAnswers(answers.slice(0, -1)))}
        >
          <ArrowLeft />
        </Button>
        <div
          className="h-2 flex-1 overflow-hidden rounded-full bg-muted"
          role="progressbar"
          aria-valuemin={0}
          aria-valuemax={questions.length}
          aria-valuenow={step + 1}
        >
          <div
            className="h-full rounded-full bg-primary transition-all duration-500"
            style={{ width: `${((step + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="text-sm text-muted-foreground tabular-nums">
          {step + 1}/{questions.length}
        </span>
      </div>

      <h1 key={current.id} className="animate-in font-heading text-3xl font-semibold tracking-tight text-balance duration-300 fade-in slide-in-from-bottom-2">
        {current.question}
      </h1>

      <div className="mt-8 grid gap-3">
        {current.options.map((option, i) => (
          <button
            key={`${current.id}-${i}`}
            onClick={() => setAnswers([...answers, i])}
            className={cn(
              "flex animate-in items-center gap-4 rounded-2xl bg-card p-4 text-left ring-1 ring-foreground/10 transition-all duration-300 fade-in slide-in-from-bottom-2 fill-mode-backwards",
              "hover:-translate-y-0.5 hover:bg-accent/50 hover:shadow-md hover:shadow-primary/10 hover:ring-primary/40 focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none"
            )}
            style={{ animationDelay: `${i * 50}ms` }}
          >
            <span className="flex size-11 shrink-0 items-center justify-center rounded-full bg-secondary text-xl">
              {option.emoji}
            </span>
            <span className="font-medium">{option.label}</span>
          </button>
        ))}
      </div>
    </div>
  )
}

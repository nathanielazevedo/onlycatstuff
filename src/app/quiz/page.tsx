import type { Metadata } from "next"

import { ToyQuiz } from "@/components/toy-quiz"

export const metadata: Metadata = {
  title: "What Toy Will My Cat Love? Cat Play Style Quiz",
  description:
    "Take our free 5-question quiz to discover your cat's play personality and find toys that match it.",
}

export default function QuizPage() {
  return <ToyQuiz />
}

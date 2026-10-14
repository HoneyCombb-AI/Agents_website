"use client"

import { useEffect, useRef, useState } from "react"

import { Container } from "@/components/container"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

const stories = [
  {
    who: "Estimator",
    where: "Build-to-print shop, Pune",
    agent: "Quoting",
    quote:
      "The drawing used to wait until someone had an hour. Now the route and the price are drafted the same morning, and the estimator changes one line before it goes out.",
  },
  {
    who: "Planner",
    where: "Textile mill, Coimbatore",
    agent: "Scheduling",
    quote:
      "A rush order used to mean a whiteboard and a late night. The board now shows what moves, and the floor accepts it before the shift changes.",
  },
  {
    who: "Sales lead",
    where: "Industrial distributor, Ahmedabad",
    agent: "Prospecting",
    quote:
      "The first list had plants we had never written to. Two of them asked for a price before the month was out.",
  },
]

export function Proof() {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [index, setIndex] = useState(0)

  useEffect(() => {
    if (reduced) return
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const passed = Math.min(scrollable, Math.max(0, -rect.top))
      const progress = passed / scrollable
      setIndex(
        Math.min(
          stories.length - 1,
          Math.floor(progress * stories.length * 0.999)
        )
      )
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [reduced])

  const active = stories[index]

  return (
    <section ref={sectionRef} className="h-auto bg-ivory md:h-[260svh]">
      <div className="py-20 md:sticky md:top-[72px] md:flex md:h-[calc(100svh-72px)] md:items-center md:py-0">
        <Container className="grid items-start gap-10 md:grid-cols-[280px_1fr] md:gap-16">
          <div>
            <h2 className="font-body text-[clamp(32px,3.4vw,48px)] leading-[1.12] font-normal tracking-[-0.01em] text-charcoal">
              On the floor.
            </h2>
            <p className="mt-4 font-mono text-[13px] tracking-[0.08em] text-ink-3 uppercase">
              {index + 1} of {stories.length}
            </p>
            <ul className="mt-8 flex flex-col">
              {stories.map((story, storyIndex) => {
                const on = storyIndex === index
                return (
                  <li key={story.where}>
                    <button
                      type="button"
                      onClick={() => setIndex(storyIndex)}
                      className={cn(
                        "flex w-full items-baseline justify-between gap-4 border-t border-hairline py-4 text-left",
                        on ? "text-charcoal" : "text-stone"
                      )}
                    >
                      <span>
                        <span className="block text-[17px]">{story.who}</span>
                        <span className="mt-1 block text-[13px] text-ink-3">
                          {story.where}
                        </span>
                      </span>
                      <span className="font-mono text-[11px] tracking-[0.08em] uppercase">
                        {story.agent}
                      </span>
                    </button>
                  </li>
                )
              })}
            </ul>
          </div>
          <blockquote className="md:pt-16">
            <p className="font-body text-[clamp(26px,3vw,40px)] leading-[1.25] font-normal tracking-[-0.02em] text-charcoal">
              “{active.quote}”
            </p>
            <footer className="mt-8">
              <p className="font-mono text-[13px] tracking-[0.1em] text-charcoal uppercase">
                {active.who}
              </p>
              <p className="mt-2 text-[15px] text-ink-2">{active.where}</p>
            </footer>
          </blockquote>
        </Container>
      </div>
    </section>
  )
}

"use client"

import { useEffect, useRef, useState } from "react"

import { Container } from "@/components/container"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { cn } from "@/lib/utils"

const headline = ["Honeycomb", "AI", "builds", "agents."]
const definition =
  "Software that takes one job your team is stuck with, and gives those hours back to the work that grows the plant.".split(
    " "
  )

export function BuildsPanel() {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [progress, setProgress] = useState(reduced ? 1 : 0)

  useEffect(() => {
    if (reduced) return
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const passed = Math.min(scrollable, Math.max(0, -rect.top))
      setProgress(passed / scrollable)
    }

    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    window.addEventListener("resize", onScroll)
    return () => {
      window.removeEventListener("scroll", onScroll)
      window.removeEventListener("resize", onScroll)
    }
  }, [reduced])

  const p = reduced ? 1 : progress
  const frame = clamp((p - 0.08) / 0.55)
  const sub = clamp((p - 0.22) / 0.16)
  const kicker = clamp((p - 0.4) / 0.14)
  const labels = clamp((p - 0.82) / 0.14)

  return (
    <section ref={sectionRef} className="h-[220svh] bg-ivory md:h-[250svh]">
      <div className="sticky top-[72px] flex h-[calc(100svh-72px)] items-center">
        <Container>
          <div className="relative">
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 top-0 h-px origin-left bg-charcoal"
              style={{ transform: `scaleX(${frame})` }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 left-0 w-px origin-top bg-charcoal"
              style={{ transform: `scaleY(${frame})` }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-y-0 right-0 w-px origin-bottom bg-charcoal"
              style={{ transform: `scaleY(${frame})` }}
            />
            <span
              aria-hidden
              className="pointer-events-none absolute inset-x-0 bottom-0 h-px origin-right bg-charcoal"
              style={{ transform: `scaleX(${frame})` }}
            />

            <div className="relative flex items-center justify-between gap-6 px-4 py-4 md:px-6">
              <span
                className="font-mono text-[13px] tracking-[0.08em] text-charcoal uppercase"
                style={{
                  opacity: labels,
                  transform: `translateY(${(1 - labels) * 8}px)`,
                }}
              >
                What we build
              </span>
              <span
                className="font-mono text-[13px] tracking-[0.08em] text-charcoal uppercase"
                style={{
                  opacity: labels,
                  transform: `translateY(${(1 - labels) * 8}px)`,
                }}
              >
                Never from a template
              </span>
              <span className="pointer-events-none absolute inset-x-0 bottom-0 h-px bg-hairline" />
            </div>

            <div className="px-4 pt-[clamp(36px,7svh,88px)] pb-[clamp(28px,5svh,64px)] text-center md:px-8">
              <h2 className="font-body text-[clamp(40px,6.4vw,88px)] leading-[0.95] font-medium tracking-[-0.035em] text-charcoal">
                {headline.map((word, index) => {
                  const local = clamp((p - index * 0.04) / 0.18)
                  return (
                    <span
                      key={word}
                      className="mx-[0.18em] inline-block"
                      style={{
                        opacity: local,
                        transform: `translateY(${(1 - local) * 18}px)`,
                      }}
                    >
                      {word}
                    </span>
                  )
                })}
              </h2>
              <p
                className="mx-auto mt-[clamp(14px,2.4svh,28px)] max-w-[34ch] text-[clamp(18px,2.2vw,32px)] leading-snug text-charcoal"
                style={{
                  opacity: sub,
                  transform: `translateY(${(1 - sub) * 10}px)`,
                }}
              >
                With your team, on your floor, from the know-how they already
                carry.
              </p>
            </div>

            <div className="relative px-4 pt-[clamp(20px,3.4svh,36px)] pb-[clamp(24px,4svh,44px)] text-center">
              <span className="pointer-events-none absolute inset-x-0 top-0 h-px bg-hairline" />
              <p
                className="font-mono text-[13px] tracking-[0.08em] text-charcoal uppercase"
                style={{
                  opacity: kicker,
                  transform: `translateY(${(1 - kicker) * 8}px)`,
                }}
              >
                What are agents?
              </p>
              <p className="mx-auto mt-3 max-w-[46ch] text-[clamp(16px,1.7vw,24px)] leading-snug text-ink-2">
                {definition.map((word, index) => {
                  const local = clamp((p - 0.48 - index * 0.012) / 0.08)
                  return (
                    <span
                      key={`${word}-${index}`}
                      className={cn("inline-block", index > 0 && "ml-[0.3em]")}
                      style={{ opacity: local }}
                    >
                      {word}
                    </span>
                  )
                })}
              </p>
            </div>
          </div>
        </Container>
      </div>
    </section>
  )
}

function clamp(value: number) {
  return Math.min(1, Math.max(0, value))
}

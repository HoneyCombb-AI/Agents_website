"use client"

import { useEffect, useRef, useState } from "react"

import { Container } from "@/components/container"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { steps } from "@/lib/content"
import { cn } from "@/lib/utils"

export function Process() {
  const reduced = usePrefersReducedMotion()
  const sectionRef = useRef<HTMLElement>(null)
  const [active, setActive] = useState(0)

  useEffect(() => {
    if (reduced) return
    const section = sectionRef.current
    if (!section) return

    const onScroll = () => {
      if (window.innerWidth < 1024) return
      const rect = section.getBoundingClientRect()
      const scrollable = section.offsetHeight - window.innerHeight
      if (scrollable <= 0) return
      const passed = Math.min(scrollable, Math.max(0, -rect.top))
      const progress = passed / scrollable
      setActive(
        Math.min(steps.length - 1, Math.floor(progress * steps.length * 0.999))
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

  useEffect(() => {
    if (reduced) return
    const section = sectionRef.current
    if (!section) return
    const cards = Array.from(
      section.querySelectorAll<HTMLElement>("[data-step]")
    )
    const observer = new IntersectionObserver(
      (entries) => {
        if (window.innerWidth >= 1024) return
        const best = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (!best) return
        setActive(Number((best.target as HTMLElement).dataset.step))
      },
      { threshold: [0.45, 0.7] }
    )
    cards.forEach((card) => observer.observe(card))
    return () => observer.disconnect()
  }, [reduced])

  return (
    <section
      id="process"
      ref={sectionRef}
      className="scroll-mt-24 bg-ivory motion-reduce:h-auto lg:h-[340vh]"
    >
      <div className="py-20 motion-reduce:static motion-reduce:block motion-reduce:min-h-0 motion-reduce:py-24 md:py-28 lg:sticky lg:top-0 lg:flex lg:min-h-svh lg:items-center lg:py-0">
        <Container className="flex flex-col gap-12 md:gap-16">
          <h2 className="font-body text-[clamp(32px,3.4vw,48px)] leading-[1.12] font-normal tracking-[-0.01em] text-charcoal">
            On your floor, with your team.
          </h2>
          <div className="grid grid-cols-1 border-t border-l border-hairline sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, index) => {
              const on = !reduced && index === active
              return (
                <article
                  key={step.n}
                  data-step={index}
                  className={cn(
                    "flex flex-col border-r border-b px-5 py-7 transition-colors duration-500 ease-out md:px-6 md:py-10",
                    on
                      ? "border-charcoal bg-charcoal text-ivory"
                      : "border-hairline bg-transparent"
                  )}
                >
                  <p
                    className={cn(
                      "font-mono text-[15px] tracking-[0.08em] uppercase",
                      on ? "text-ivory/70" : "text-ink-3"
                    )}
                  >
                    {step.n}
                  </p>
                  <h3
                    className={cn(
                      "mt-4 font-body text-[22px] leading-[30px] font-medium md:text-2xl",
                      on ? "text-ivory" : "text-charcoal"
                    )}
                  >
                    {step.title}
                  </h3>
                  <p
                    className={cn(
                      "mt-3 text-[17px] leading-[26px] text-pretty md:text-[19px] md:leading-[29px]",
                      on ? "text-ivory/80" : "text-ink-2"
                    )}
                  >
                    {step.body}
                  </p>
                </article>
              )
            })}
          </div>
        </Container>
      </div>
    </section>
  )
}

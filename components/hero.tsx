"use client"

import Image from "next/image"
import { useEffect, useState } from "react"

import { Container } from "@/components/container"
import { Cta } from "@/components/ui/button"
import { usePrefersReducedMotion } from "@/hooks/use-prefers-reduced-motion"
import { DEMO_MAIL, heroImage, heroWords } from "@/lib/content"
import { cn } from "@/lib/utils"

export function Hero() {
  const reduced = usePrefersReducedMotion()
  const [index, setIndex] = useState(0)
  const [phase, setPhase] = useState<"in" | "out">("in")
  const [shift, setShift] = useState(0)

  useEffect(() => {
    if (reduced) return
    let swap = 0
    const timer = window.setInterval(() => {
      setPhase("out")
      swap = window.setTimeout(() => {
        setIndex((current) => (current + 1) % heroWords.length)
        setPhase("in")
      }, 480)
    }, 2600)
    return () => {
      window.clearInterval(timer)
      window.clearTimeout(swap)
    }
  }, [reduced])

  useEffect(() => {
    if (reduced) return
    let frame = 0
    const onScroll = () => {
      cancelAnimationFrame(frame)
      frame = requestAnimationFrame(() => {
        setShift(Math.min(window.scrollY, window.innerHeight) * 0.18)
      })
    }
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => {
      cancelAnimationFrame(frame)
      window.removeEventListener("scroll", onScroll)
    }
  }, [reduced])

  return (
    <section
      id="top"
      className="relative min-h-svh overflow-hidden bg-charcoal"
    >
      <div
        className="absolute inset-0 will-change-transform"
        style={{
          transform: `translate3d(0, ${shift * 0.35}px, 0) scale(1.06)`,
        }}
      >
        <Image
          src={heroImage}
          alt="Warehouse racking in a distribution floor"
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
        <div className="absolute inset-0 bg-charcoal/70" />
      </div>

      <Container className="relative z-10 flex min-h-svh flex-col justify-center pt-28 pb-16">
        <div
          className="will-change-transform"
          style={{ transform: `translate3d(0, ${shift * 0.12}px, 0)` }}
        >
          <p className="font-mono text-[clamp(12px,0.85vw,15px)] tracking-[0.14em] text-cream/75 uppercase">
            AI agents built for Indian manufacturers
          </p>
          <h1 className="mt-6 max-w-[14ch] font-display text-[min(7vw,12.5svh,calc((100vw-48px)/11.1),120px)] leading-[1.02] font-normal tracking-[0.005em] text-cream sm:max-w-none">
            <span className="sr-only">
              Automate your quotes, orders, and ERP.
            </span>
            <span aria-hidden className="block">
              AUTOMATE
            </span>
            <span aria-hidden className="block whitespace-nowrap">
              YOUR{" "}
              <span className="inline-block overflow-hidden align-bottom [clip-path:inset(0_-100vw_-0.15em_0)]">
                <span
                  key={`${heroWords[index]}-${phase}`}
                  className={cn(
                    "inline-block",
                    phase === "in" ? "animate-word-in" : "animate-word-out"
                  )}
                >
                  {heroWords[index]}
                </span>
              </span>
            </span>
          </h1>
          <p className="mt-8 max-w-[40rem] text-[clamp(17px,1.25vw,21px)] leading-[1.5] text-pretty text-cream/85">
            Estimators still rebuild every price from a drawing and a rate card.
            <br className="hidden md:block" /> Honeycomb reads the drawing and
            drafts the quote, the order, and the invoice.
          </p>
          <Cta href={DEMO_MAIL} tone="cream" size="pill" className="mt-8">
            Book a demo
          </Cta>
        </div>
      </Container>
    </section>
  )
}

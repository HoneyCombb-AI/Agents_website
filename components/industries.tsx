"use client"

import Image from "next/image"

import { Container } from "@/components/container"
import { useSite } from "@/components/site-state"
import { industries } from "@/lib/content"
import { cn } from "@/lib/utils"

export function Industries() {
  const { industryId, selectIndustry } = useSite()

  return (
    <section
      id="industries"
      className="scroll-mt-24 bg-ivory pt-24 pb-4 md:pt-40"
    >
      <Container className="flex flex-col items-start gap-6">
        <h2 className="font-body text-[clamp(32px,3.4vw,48px)] leading-[1.12] font-normal tracking-[-0.01em] text-charcoal">
          Tell us what you make.
        </h2>
        <p className="max-w-[46rem] text-[19px] leading-7 text-ink-2 lg:text-[clamp(17px,1.7vw,21px)] lg:leading-8">
          Each agent takes one job off the desk and answers your customers
          faster, with your own numbers.
        </p>

        <div
          role="group"
          aria-label="Industry"
          className="mt-6 grid w-full grid-cols-2 border-t border-l border-hairline sm:grid-cols-3 lg:grid-cols-6"
        >
          {industries.map((industry) => {
            const pressed = industryId === industry.id
            return (
              <button
                key={industry.id}
                type="button"
                aria-pressed={pressed}
                aria-label={industry.label}
                onClick={() => selectIndustry(pressed ? null : industry.id)}
                className={cn(
                  "group relative aspect-[3/2] overflow-hidden border-r border-b border-hairline bg-charcoal p-4 text-ivory focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-charcoal sm:aspect-square",
                  pressed && "outline outline-2 -outline-offset-2 outline-ivory"
                )}
              >
                <Image
                  src={industry.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 16vw, 50vw"
                  className="scale-110 object-cover blur-[6px]"
                />
                <Image
                  src={industry.image}
                  alt=""
                  fill
                  sizes="(min-width: 1024px) 16vw, 50vw"
                  className="scale-105 object-cover opacity-0 transition duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
                />
                <span className="absolute inset-0 bg-charcoal/70 transition duration-500 group-hover:opacity-0 group-focus-visible:opacity-0" />
                <span className="relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
                  <span className="text-[17px] leading-[24px] md:text-[19px] md:leading-[26px]">
                    {industry.short}
                  </span>
                  {pressed ? (
                    <span className="font-mono text-[13px] tracking-[0.08em] text-ivory/75 uppercase">
                      {industry.agents.length} agents
                    </span>
                  ) : null}
                </span>
              </button>
            )
          })}
          <button
            type="button"
            aria-pressed={industryId === null}
            onClick={() => selectIndustry(null)}
            className={cn(
              "group relative aspect-[3/2] overflow-hidden border-r border-b border-hairline bg-charcoal p-4 text-ivory focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-charcoal sm:aspect-square",
              industryId === null &&
                "outline outline-2 -outline-offset-2 outline-ivory"
            )}
          >
            <Image
              src="https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80"
              alt=""
              fill
              sizes="(min-width: 1024px) 16vw, 50vw"
              className="scale-110 object-cover blur-[6px]"
            />
            <Image
              src="https://images.unsplash.com/photo-1513828583688-c52646db42da?auto=format&fit=crop&w=900&q=80"
              alt=""
              fill
              sizes="(min-width: 1024px) 16vw, 50vw"
              className="scale-105 object-cover opacity-0 transition duration-500 ease-out group-hover:scale-100 group-hover:opacity-100 group-focus-visible:scale-100 group-focus-visible:opacity-100"
            />
            <span className="absolute inset-0 bg-charcoal/70 transition duration-500 group-hover:opacity-0 group-focus-visible:opacity-0" />
            <span className="relative z-10 flex h-full flex-col items-center justify-center gap-2 text-center transition-opacity duration-300 group-hover:opacity-0 group-focus-visible:opacity-0">
              <span className="text-[17px] leading-[24px] md:text-[19px] md:leading-[26px]">
                All industries
              </span>
              <span className="font-mono text-[13px] tracking-[0.08em] text-ivory/75 uppercase">
                6 agents
              </span>
            </span>
          </button>
        </div>
      </Container>
    </section>
  )
}

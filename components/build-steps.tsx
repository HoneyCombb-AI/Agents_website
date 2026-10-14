"use client"

import { useState } from "react"

import type { AgentStep } from "@/lib/content"
import { cn } from "@/lib/utils"

export function BuildSteps({ steps }: { steps: AgentStep[] }) {
  const [active, setActive] = useState(0)

  return (
    <div className="flex flex-col gap-3 lg:flex-row lg:items-stretch">
      {steps.map((step, index) => {
        const open = index === active
        return (
          <button
            key={step.n}
            type="button"
            aria-expanded={open}
            onClick={() => setActive(index)}
            className={cn(
              "flex min-w-0 flex-col rounded-[2px] border px-5 py-5 text-left transition-[flex-grow,background-color,color,border-color] duration-500 ease-[cubic-bezier(0.2,0,0,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal lg:basis-0 lg:px-4 lg:py-6 xl:px-6",
              open
                ? "border-charcoal bg-charcoal text-ivory lg:flex-[2.4]"
                : "border-rule bg-ivory text-charcoal hover:bg-mist lg:flex-1"
            )}
          >
            <span className="flex items-start justify-between gap-3">
              <span>
                <span
                  className={cn(
                    "font-mono text-[13px] tracking-[0.08em]",
                    open ? "text-ivory/70" : "text-ink-3"
                  )}
                >
                  {step.n}
                </span>
                <span className="mt-3 block text-[22px] leading-[28px] font-medium lg:text-[20px] xl:text-[24px] xl:leading-[30px]">
                  {step.title}
                </span>
                <span
                  className={cn(
                    "mt-2 block font-mono text-[12px] tracking-[0.08em] uppercase lg:hidden",
                    open ? "text-ivory/70" : "text-ink-3"
                  )}
                >
                  {step.kicker}
                </span>
              </span>
              <span
                aria-hidden
                className={cn(
                  "flex size-[22px] shrink-0 items-center justify-center rounded-[2px] border",
                  open ? "border-ivory/40" : "border-rule"
                )}
              >
                <svg
                  width="10"
                  height="6"
                  viewBox="0 0 10 6"
                  fill="none"
                  className={cn(
                    "transition-transform duration-300",
                    open && "rotate-180"
                  )}
                >
                  <path
                    d="M1 1l4 4 4-4"
                    stroke="currentColor"
                    strokeWidth="1.5"
                  />
                </svg>
              </span>
            </span>
            <span
              className={cn(
                "grid transition-[grid-template-rows,opacity] duration-500",
                open
                  ? "grid-rows-[1fr] opacity-100"
                  : "grid-rows-[0fr] opacity-0"
              )}
            >
              <span className="overflow-hidden">
                <span
                  className={cn(
                    "mt-4 block border-t pt-4 text-[17px] leading-[26px] lg:text-[18px] lg:leading-7",
                    open ? "border-ivory/20 text-ivory/85" : "border-hairline"
                  )}
                >
                  {step.body}
                </span>
              </span>
            </span>
            <span
              className={cn(
                "mt-auto hidden pt-8 font-mono text-[12px] tracking-[0.08em] uppercase lg:block",
                open ? "text-transparent" : "text-ink-3"
              )}
            >
              {step.kicker}
            </span>
          </button>
        )
      })}
    </div>
  )
}

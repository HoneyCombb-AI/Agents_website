"use client"

import { useState } from "react"

import type { AgentFaq } from "@/lib/content"
import { cn } from "@/lib/utils"

export function FaqList({ items }: { items: AgentFaq[] }) {
  const [open, setOpen] = useState(0)

  return (
    <div className="border border-rule">
      {items.map((item, index) => {
        const expanded = open === index
        const panelId = `faq-${index}`
        return (
          <div key={item.q} className="border-b border-rule last:border-b-0">
            <h3>
              <button
                type="button"
                id={`${panelId}-button`}
                aria-expanded={expanded}
                aria-controls={panelId}
                onClick={() => setOpen(expanded ? -1 : index)}
                className="flex w-full items-start justify-between gap-6 px-4 py-5 text-left transition-colors hover:bg-mist focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-2px] focus-visible:outline-charcoal md:px-6 md:py-6"
              >
                <span className="text-[17px] leading-[26px] font-medium text-charcoal md:text-[19px] md:leading-[28px]">
                  {item.q}
                </span>
                <span
                  aria-hidden
                  className="mt-1 flex size-[22px] shrink-0 items-center justify-center rounded-[2px] border border-rule"
                >
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    className={cn(
                      "transition-transform duration-300",
                      expanded && "rotate-180"
                    )}
                  >
                    <path
                      d="M1 1l4 4 4-4"
                      stroke="currentColor"
                      strokeWidth="1.5"
                    />
                  </svg>
                </span>
              </button>
            </h3>
            <div
              id={panelId}
              role="region"
              aria-labelledby={`${panelId}-button`}
              hidden={!expanded}
            >
              <p className="max-w-[70ch] px-4 pb-6 text-[16px] leading-[26px] text-ink-2 md:px-6 md:text-[17px] md:leading-[28px]">
                {item.a}
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}

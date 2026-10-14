"use client"

import Link from "next/link"
import { useState } from "react"

import { agentIcons } from "@/components/agent-icons"
import { agents } from "@/lib/content"
import { cn } from "@/lib/utils"

export function ProductGrid() {
  const [open, setOpen] = useState<string | null>(null)
  const selected = agents.find((agent) => agent.id === open) ?? null

  return (
    <div>
      <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-6">
        {agents.map((agent) => {
          const Icon = agentIcons[agent.icon]
          const expanded = open === agent.id
          return (
            <li key={agent.id}>
              <button
                type="button"
                aria-expanded={expanded}
                aria-controls="product-agent-detail"
                onClick={() => setOpen(expanded ? null : agent.id)}
                className={cn(
                  "flex aspect-square w-full flex-col rounded-[2px] border p-4 text-left transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal md:p-5",
                  expanded
                    ? "border-charcoal bg-charcoal text-ivory"
                    : "border-rule bg-ivory text-charcoal hover:bg-mist"
                )}
              >
                <span className="flex items-start justify-between gap-2">
                  <span
                    className={cn(
                      "flex size-12 items-center justify-center rounded-[2px] border",
                      expanded ? "border-ivory/30" : "border-rule"
                    )}
                  >
                    <Icon aria-hidden strokeWidth={1.4} className="size-6" />
                  </span>
                  <span
                    aria-hidden
                    className={cn(
                      "flex size-[22px] items-center justify-center rounded-[2px] border",
                      expanded ? "border-ivory/40" : "border-rule"
                    )}
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
                </span>
                <span className="mt-auto pt-4 text-[17px] leading-[22px] font-medium">
                  {agent.label}
                </span>
              </button>
            </li>
          )
        })}
      </ul>
      <div id="product-agent-detail" className="mt-4 min-h-[88px]">
        {selected ? (
          <div className="border border-rule bg-white px-5 py-5 md:px-6">
            <p className="font-mono text-[12px] tracking-[0.12em] text-stone uppercase">
              {selected.label}
            </p>
            <p className="mt-2 max-w-[62ch] text-[17px] leading-7 text-charcoal md:text-[19px]">
              {selected.oneLiner}
            </p>
            <Link
              href={`/${selected.id}`}
              className="mt-4 inline-block font-mono text-[13px] tracking-[0.08em] text-charcoal uppercase underline underline-offset-4 hover:text-ember"
            >
              See it work
            </Link>
          </div>
        ) : (
          <p className="font-mono text-[12px] tracking-[0.1em] text-ink-3 uppercase">
            Pick an agent to see the job.
          </p>
        )}
      </div>
    </div>
  )
}

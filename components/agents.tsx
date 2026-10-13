"use client"

import Image from "next/image"
import {
  BookOpen,
  CalendarClock,
  ClipboardCheck,
  IndianRupee,
  MessagesSquare,
  ReceiptText,
  type LucideIcon,
} from "lucide-react"
import type { KeyboardEvent } from "react"

import { Container } from "@/components/container"
import { useSite } from "@/components/site-state"
import {
  agents,
  agentsFor,
  demoMail,
  industries,
  type Agent,
  type AgentIcon,
} from "@/lib/content"
import { cn } from "@/lib/utils"

const icons: Record<AgentIcon, LucideIcon> = {
  quote: IndianRupee,
  order: ClipboardCheck,
  schedule: CalendarClock,
  follow: MessagesSquare,
  invoice: ReceiptText,
  catalogue: BookOpen,
}

function signedDistance(index: number, active: number, total: number) {
  let distance = index - active
  if (distance > total / 2) distance -= total
  if (distance < -total / 2) distance += total
  return distance
}

function AgentCard({
  agent,
  active,
  onSelect,
}: {
  agent: Agent
  active: boolean
  onSelect: () => void
}) {
  const Icon = icons[agent.icon]
  const className = cn(
    "relative isolate overflow-hidden border border-hairline bg-charcoal text-ivory transition-all duration-500 ease-out",
    active
      ? "h-[min(520px,68vh)] w-full max-w-[420px] lg:h-[var(--ch)] lg:w-[calc(var(--ch)*0.8)] lg:max-w-none"
      : "h-[calc(var(--ch)*0.48)] w-[calc(var(--ch)*0.384)]"
  )

  const inner = (
    <>
      <Image
        src={agent.image}
        alt=""
        fill
        sizes="(min-width: 1024px) 400px, 90vw"
        className="object-cover"
      />
      <span className="absolute inset-0 bg-charcoal/[0.78]" />
      <span className="absolute inset-x-0 top-4 text-center font-mono text-[13px] tracking-[0.08em] text-ivory uppercase">
        {agent.label}
      </span>
      <Icon
        aria-hidden
        strokeWidth={1.15}
        className={cn(
          "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 transition-all duration-500",
          active ? "size-24" : "size-12"
        )}
      />
    </>
  )

  if (!active) {
    return (
      <button
        type="button"
        onClick={onSelect}
        aria-label={`Show ${agent.label}`}
        className={className}
      >
        {inner}
      </button>
    )
  }

  return <div className={className}>{inner}</div>
}

export function Agents() {
  const { industryId, agentId, selectAgent, selectIndustry } = useSite()
  const filtered = agentsFor(industryId)
  const activeIndex = Math.max(
    0,
    filtered.findIndex((agent) => agent.id === agentId)
  )
  const active = filtered[activeIndex] ?? filtered[0]
  const industry = industries.find((item) => item.id === industryId)

  const placed = filtered
    .map((agent, index) => ({
      agent,
      distance: signedDistance(index, activeIndex, filtered.length),
    }))
    .filter((item) => Math.abs(item.distance) <= 2)
    .sort((a, b) => a.distance - b.distance)

  const left = placed.filter((item) => item.distance < 0)
  const right = placed.filter((item) => item.distance > 0)

  function step(direction: -1 | 1) {
    const next = (activeIndex + direction + filtered.length) % filtered.length
    selectAgent(filtered[next].id)
  }

  function onKeyDown(event: KeyboardEvent<HTMLElement>) {
    if (event.key === "ArrowLeft") {
      event.preventDefault()
      step(-1)
    }
    if (event.key === "ArrowRight") {
      event.preventDefault()
      step(1)
    }
  }

  return (
    <section
      id="agents"
      tabIndex={0}
      onKeyDown={onKeyDown}
      className="agent-stage scroll-mt-24 bg-ivory pt-16 pb-20 outline-none md:pt-28 md:pb-32"
    >
      <Container className="flex flex-col items-center gap-8">
        <div aria-live="polite" className="text-center">
          <p className="font-mono text-[15px] tracking-[0.08em] text-charcoal uppercase">
            {filtered.length === agents.length
              ? `${agents.length} agents`
              : `${filtered.length} of ${agents.length} agents`}
          </p>
          <p className="mt-2 font-mono text-[15px] tracking-[0.08em] text-ink-3 uppercase">
            {industry ? (
              <>
                Best fit for{" "}
                <span className="text-charcoal">{industry.label}</span>
                <span aria-hidden> · </span>
                <button
                  type="button"
                  onClick={() => selectIndustry(null)}
                  className="text-charcoal underline underline-offset-4"
                >
                  Show all
                </button>
              </>
            ) : (
              <span className="text-charcoal">All industries</span>
            )}
          </p>
        </div>

        <div className="home-agents-ctrl flex items-center gap-3">
          <button
            type="button"
            aria-label="Previous agent"
            onClick={() => step(-1)}
            className="flex size-9 items-center justify-center border border-rule bg-ivory font-mono text-[15px] text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-ivory"
          >
            ←
          </button>
          <div className="flex items-center">
            {filtered.map((agent) => {
              const current = agent.id === active.id
              return (
                <button
                  key={agent.id}
                  type="button"
                  aria-label={`Show ${agent.label}`}
                  aria-current={current ? "true" : undefined}
                  onClick={() => selectAgent(agent.id)}
                  className="flex h-9 w-4 items-center justify-center"
                >
                  <span
                    className={cn(
                      "w-px transition-all duration-300",
                      current ? "h-6 bg-charcoal" : "h-3.5 bg-rule"
                    )}
                  />
                </button>
              )
            })}
          </div>
          <button
            type="button"
            aria-label="Next agent"
            onClick={() => step(1)}
            className="flex size-9 items-center justify-center border border-rule bg-ivory font-mono text-[15px] text-charcoal transition-colors duration-300 hover:bg-charcoal hover:text-ivory"
          >
            →
          </button>
        </div>
      </Container>

      <div className="mt-10 overflow-hidden">
        <div key={active.id} className="animate-fade-up">
          <div className="grid grid-cols-1 items-start lg:grid-cols-[1fr_auto_1fr] lg:gap-10">
            <div className="hidden items-start justify-end gap-8 lg:flex xl:gap-10">
              {left.map(({ agent }) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  active={false}
                  onSelect={() => selectAgent(agent.id)}
                />
              ))}
            </div>
            <div className="flex justify-center px-6 lg:px-0">
              <AgentCard agent={active} active onSelect={() => undefined} />
            </div>
            <div className="hidden items-start justify-start gap-8 lg:flex xl:gap-10">
              {right.map(({ agent }) => (
                <AgentCard
                  key={agent.id}
                  agent={agent}
                  active={false}
                  onSelect={() => selectAgent(agent.id)}
                />
              ))}
            </div>
          </div>

          <div className="mx-auto mt-8 w-full max-w-[420px] px-6 lg:w-[calc(var(--ch)*0.8)] lg:max-w-none lg:px-0">
            <h3 className="font-body text-2xl leading-[30px] font-medium text-charcoal">
              {active.heading}
            </h3>
            <p className="mt-3 text-[19px] leading-[29px] text-ink-2">
              {active.body}
            </p>
            {active.stat ? (
              <p className="mt-4 font-mono text-[12px] tracking-[0.12em] text-stone uppercase">
                {active.stat}
              </p>
            ) : null}
            <a
              href={demoMail(active.label)}
              className="mt-5 inline-block font-mono text-[15px] tracking-[0.08em] text-charcoal uppercase underline underline-offset-4 transition-colors hover:text-ember"
            >
              See it work
            </a>
          </div>
        </div>
      </div>
    </section>
  )
}

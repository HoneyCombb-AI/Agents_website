"use client"

import Image from "next/image"
import Link from "next/link"
import type { KeyboardEvent } from "react"

import { agentIcons } from "@/components/agent-icons"
import { Container } from "@/components/container"
import { useSite } from "@/components/site-state"
import {
  agents,
  agentsFor,
  DEMO_MAIL,
  industries,
  type Agent,
} from "@/lib/content"
import { cn } from "@/lib/utils"

function signedDistance(index: number, active: number, total: number) {
  let distance = index - active
  if (distance > total / 2) distance -= total
  if (distance < -total / 2) distance += total
  return distance
}

function AgentCard({ agent, active }: { agent: Agent; active: boolean }) {
  const Icon = agentIcons[agent.icon]
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

  return (
    <Link
      href={`/${agent.id}`}
      aria-label={`${agent.label}. ${agent.oneLiner}`}
      aria-current={active ? "true" : undefined}
      className={className}
    >
      {inner}
    </Link>
  )
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
        <div className="text-center">
          <div aria-live="polite">
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
          <p className="mx-auto mt-6 max-w-[38rem] text-[19px] leading-7 text-ink-2">
            Start with these agents. As we work alongside your team, we build
            the next ones around your workflow.
          </p>
          <Link
            href="/product"
            className="mt-4 inline-block font-mono text-[13px] tracking-[0.08em] text-charcoal uppercase underline underline-offset-4 hover:text-ember"
          >
            See the product
          </Link>
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
                <AgentCard key={agent.id} agent={agent} active={false} />
              ))}
            </div>
            <div className="flex justify-center px-6 lg:px-0">
              <AgentCard agent={active} active />
            </div>
            <div className="hidden items-start justify-start gap-8 lg:flex xl:gap-10">
              {right.map(({ agent }) => (
                <AgentCard key={agent.id} agent={agent} active={false} />
              ))}
            </div>
          </div>

          <div className="mx-auto mt-8 w-full max-w-[420px] px-6 lg:w-[calc(var(--ch)*0.8)] lg:max-w-none lg:px-0">
            <h3 className="font-body text-2xl leading-[30px] font-medium text-charcoal">
              <Link href={`/${active.id}`} className="hover:text-ember">
                {active.heading}
              </Link>
            </h3>
            <p className="mt-3 text-[19px] leading-[29px] text-ink-2">
              {active.body}
            </p>
            <Link
              href={`/${active.id}#how-it-works`}
              className="mt-5 inline-block font-mono text-[15px] tracking-[0.08em] text-charcoal uppercase underline underline-offset-4 transition-colors hover:text-ember"
            >
              See it work
            </Link>
          </div>
        </div>
      </div>

      <Container className="mt-14 md:mt-16">
        <a
          href={DEMO_MAIL}
          className="flex flex-col items-start justify-between gap-4 border border-hairline bg-charcoal px-6 py-6 text-ivory transition-colors duration-300 hover:bg-graphite md:flex-row md:items-center md:px-8"
        >
          <span>
            <span className="font-mono text-[13px] tracking-[0.08em] text-ivory/70 uppercase">
              Your next agent
            </span>
            <span className="mt-2 block font-body text-[24px] leading-8">
              Built with your team
            </span>
          </span>
          <span className="font-mono text-[15px] tracking-[0.08em] uppercase underline underline-offset-4">
            Book a demo
          </span>
        </a>
      </Container>
    </section>
  )
}

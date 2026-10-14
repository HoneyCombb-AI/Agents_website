"use client"

import Image from "next/image"
import Link from "next/link"
import { useEffect, useRef, useState } from "react"

import { agentIcons } from "@/components/agent-icons"
import { Container } from "@/components/container"
import { agents, industries, type Agent, type AgentId } from "@/lib/content"
import { cn } from "@/lib/utils"

const GAP = 16

type Slot = {
  x: number
  y: number
  w: number
  h: number
  chip: boolean
  n?: string
}

function place(
  width: number,
  selected: AgentId[] | null,
  openId: string | null
): { slots: Slot[]; height: number } {
  const fullH = 132
  const openExtra = 96
  if (!selected) {
    const cols = 3
    const w = (width - GAP * (cols - 1)) / cols
    const slots = agents.map((agent, index) => {
      const row = Math.floor(index / cols)
      const col = index % cols
      const extra = agent.id === openId ? openExtra : 0
      return {
        x: col * (w + GAP),
        y:
          row * (fullH + GAP) +
          (row > 0 &&
          openId &&
          agents.findIndex((item) => item.id === openId) < cols
            ? openExtra
            : 0),
        w,
        h: fullH + extra,
        chip: false,
      }
    })
    const rows = 2
    const height = rows * fullH + GAP + (openId ? openExtra : 0)
    return { slots, height }
  }

  const included = selected
    .map((id) => agents.find((agent) => agent.id === id))
    .filter((agent): agent is Agent => Boolean(agent))
  const excluded = agents.filter((agent) => !selected.includes(agent.id))
  const n = included.length
  const w = (width - GAP * (n - 1)) / n
  const slots: Slot[] = agents.map(() => ({
    x: 0,
    y: 0,
    w: 0,
    h: 0,
    chip: false,
  }))

  included.forEach((agent, index) => {
    const at = agents.findIndex((item) => item.id === agent.id)
    const extra = agent.id === openId ? openExtra : 0
    slots[at] = {
      x: index * (w + GAP),
      y: 0,
      w,
      h: fullH + extra,
      chip: false,
      n: String(index + 1).padStart(2, "0"),
    }
  })

  const chipW = Math.min(
    220,
    (width - GAP * Math.max(excluded.length - 1, 0)) /
      Math.max(excluded.length, 1)
  )
  const rowW = excluded.length * chipW + GAP * Math.max(excluded.length - 1, 0)
  const startX = Math.max(0, (width - rowW) / 2)
  const chipY =
    fullH +
    (openId && selected.includes(openId as AgentId) ? openExtra : 0) +
    28
  excluded.forEach((agent, index) => {
    const at = agents.findIndex((item) => item.id === agent.id)
    slots[at] = {
      x: startX + index * (chipW + GAP),
      y: chipY,
      w: chipW,
      h: 44,
      chip: true,
    }
  })

  return { slots, height: chipY + 44 }
}

export function Industries() {
  const [industryId, setIndustryId] = useState<string | null>(null)
  const [openId, setOpenId] = useState<string | null>(null)
  const stageRef = useRef<HTMLDivElement>(null)
  const [width, setWidth] = useState(0)

  useEffect(() => {
    const el = stageRef.current
    if (!el) return
    const measure = () => setWidth(el.clientWidth)
    const observer = new ResizeObserver(measure)
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  const industry = industries.find((item) => item.id === industryId) ?? null
  const selected = industry ? industry.agents : null
  const { slots, height } = place(width || 1, selected, openId)
  const count = selected ? selected.length : agents.length
  const start = selected
    ? agents.find((agent) => agent.id === selected[0])
    : null

  return (
    <section
      id="agents"
      className="scroll-mt-24 bg-ivory pt-16 pb-20 md:pt-24 md:pb-32"
    >
      <Container className="flex flex-col gap-4">
        <div className="flex flex-col gap-3">
          <h2 className="font-body text-[clamp(32px,3.4vw,48px)] leading-[1.12] font-normal tracking-[-0.01em] text-charcoal">
            Tell us what you do.
          </h2>
          <p className="max-w-[46rem] text-[19px] leading-7 text-ink-2 lg:text-[clamp(17px,1.7vw,21px)]">
            The agents under each industry are the ones that fit.
          </p>
        </div>

        <div
          role="group"
          aria-label="Industry"
          className="-mx-6 flex [scrollbar-width:none] overflow-x-auto border-t border-rule px-6 md:mx-0 md:grid md:grid-cols-4 md:border-l md:px-0 lg:grid-cols-6 [&::-webkit-scrollbar]:hidden"
        >
          <IndustryTab
            label="All industries"
            image="/industries/all.jpg"
            pressed={industryId === null}
            onClick={() => {
              setIndustryId(null)
              setOpenId(null)
            }}
          />
          {industries.map((item) => (
            <IndustryTab
              key={item.id}
              label={item.label}
              image={item.image}
              pressed={industryId === item.id}
              onClick={() => {
                setIndustryId(item.id)
                setOpenId(null)
              }}
            />
          ))}
        </div>

        <div className="flex flex-col gap-3 md:flex-row md:items-end md:justify-between">
          <p className="flex flex-wrap items-center gap-x-3 font-mono text-[13px] tracking-[0.08em] text-ink-3 uppercase">
            <span className="text-charcoal">
              {selected
                ? `${count} of ${agents.length} agents`
                : `${agents.length} agents`}
            </span>
            <span>For {industry ? industry.label : "all industries"}</span>
            {start ? (
              <span className="text-charcoal">· Start with {start.label}</span>
            ) : null}
          </p>
          <p className="max-w-[36rem] text-[17px] leading-7 text-ink-2">
            Start with these agents. As we work alongside your team, we build
            the next ones around your workflow.
          </p>
        </div>

        <div className="relative lg:hidden">
          <ul className="flex flex-col gap-3">
            {(selected
              ? selected
                  .map((id) => agents.find((agent) => agent.id === id))
                  .filter((agent): agent is Agent => Boolean(agent))
              : agents
            ).map((agent, index) => (
              <li key={agent.id}>
                <AgentBody
                  agent={agent}
                  n={selected ? String(index + 1).padStart(2, "0") : undefined}
                  open={openId === agent.id}
                  onToggle={() =>
                    setOpenId((current) =>
                      current === agent.id ? null : agent.id
                    )
                  }
                />
              </li>
            ))}
          </ul>
          {selected ? (
            <div className="mt-4 flex flex-wrap gap-2">
              <p className="w-full font-mono text-[12px] tracking-[0.1em] text-stone uppercase">
                Also available
              </p>
              {agents
                .filter((agent) => !selected.includes(agent.id))
                .map((agent) => (
                  <Link
                    key={agent.id}
                    href={`/${agent.id}`}
                    className="border border-rule px-3 py-2 font-mono text-[12px] tracking-[0.08em] text-charcoal uppercase"
                  >
                    {agent.label}
                  </Link>
                ))}
            </div>
          ) : null}
        </div>

        <div
          ref={stageRef}
          className="relative hidden lg:block"
          style={{ height: width ? height : undefined }}
        >
          {width
            ? agents.map((agent, index) => {
                const slot = slots[index]
                return (
                  <div
                    key={agent.id}
                    className="absolute top-0 left-0"
                    style={{
                      width: slot.w,
                      height: slot.h,
                      transform: `translate(${slot.x}px, ${slot.y}px)`,
                      transition:
                        "transform 460ms cubic-bezier(0.2, 0, 0, 1), width 460ms cubic-bezier(0.2, 0, 0, 1), height 460ms cubic-bezier(0.2, 0, 0, 1)",
                      zIndex: openId === agent.id ? 3 : slot.chip ? 1 : 2,
                    }}
                  >
                    {slot.chip ? (
                      <Link
                        href={`/${agent.id}`}
                        className="flex h-full items-center justify-center border border-rule bg-ivory font-mono text-[12px] tracking-[0.08em] text-charcoal uppercase hover:border-charcoal"
                      >
                        {agent.label}
                      </Link>
                    ) : (
                      <AgentBody
                        agent={agent}
                        n={slot.n}
                        open={openId === agent.id}
                        onToggle={() =>
                          setOpenId((current) =>
                            current === agent.id ? null : agent.id
                          )
                        }
                      />
                    )}
                  </div>
                )
              })
            : null}
        </div>
        <p className="text-[12px] leading-5 text-stone">
          Stamping photo by Glenn McKechnie. Molding photo by Pedro Calamaro.
          Thermoforming photo by Rdd1901. Plating photo by Encik Tekateki.
          Wikimedia Commons, CC BY-SA.
        </p>
      </Container>
    </section>
  )
}

function IndustryTab({
  label,
  image,
  pressed,
  onClick,
}: {
  label: string
  image?: string
  pressed: boolean
  onClick: () => void
}) {
  return (
    <button
      type="button"
      aria-pressed={pressed}
      onClick={onClick}
      className="group relative aspect-[4/3] w-[168px] shrink-0 overflow-hidden border-r border-b border-rule text-left font-mono text-[13px] tracking-[0.08em] text-ivory uppercase first:border-l focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal md:w-auto md:first:border-l-0"
    >
      {image ? (
        <Image
          src={image}
          alt=""
          fill
          sizes="(min-width: 1024px) 16vw, 168px"
          className="object-cover"
        />
      ) : null}
      <span
        aria-hidden
        className={cn(
          "pointer-events-none absolute inset-0 bg-gradient-to-t from-charcoal/88 via-charcoal/50 to-charcoal/30",
          pressed && "from-charcoal/92 via-charcoal/72 to-charcoal/58"
        )}
      />
      <span className="relative z-10 flex h-full items-end px-3 py-3 md:px-4 md:py-4">
        {label}
      </span>
    </button>
  )
}

function AgentBody({
  agent,
  n,
  open,
  onToggle,
}: {
  agent: Agent
  n?: string
  open: boolean
  onToggle: () => void
}) {
  const Icon = agentIcons[agent.icon]
  return (
    <article className="flex h-full flex-col overflow-hidden rounded-[2px] border border-rule bg-ivory text-charcoal transition-colors hover:border-charcoal">
      <div className="flex items-center gap-4 px-5 py-5">
        {n ? (
          <span className="font-mono text-[13px] tracking-[0.08em] text-stone">
            {n}
          </span>
        ) : (
          <span className="flex size-12 shrink-0 items-center justify-center border border-rule">
            <Icon aria-hidden strokeWidth={1.4} className="size-6" />
          </span>
        )}
        <Link
          href={`/${agent.id}`}
          className="text-[18px] leading-6 font-medium hover:text-ember"
        >
          {agent.label}
        </Link>
        <button
          type="button"
          aria-expanded={open}
          aria-label={`More about ${agent.label}`}
          onClick={onToggle}
          className="ml-auto flex size-[22px] items-center justify-center rounded-[2px] border border-rule"
        >
          <span
            aria-hidden
            className={cn(
              "block size-[5px] border-r border-b border-current transition-transform duration-300",
              open
                ? "translate-y-[1px] -rotate-135"
                : "-translate-y-px rotate-45"
            )}
          />
        </button>
      </div>
      {open ? (
        <div className="px-5 pb-5">
          <p className="text-[15px] leading-6 text-ink-2">{agent.oneLiner}</p>
          <Link
            href={`/${agent.id}#how-it-works`}
            className="mt-3 inline-block font-mono text-[12px] tracking-[0.08em] uppercase underline underline-offset-4"
          >
            See it work
          </Link>
        </div>
      ) : null}
    </article>
  )
}

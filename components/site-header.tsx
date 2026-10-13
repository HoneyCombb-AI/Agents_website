"use client"

import { useEffect, useState } from "react"

import { Container } from "@/components/container"
import { Logo } from "@/components/logo"
import { useSite } from "@/components/site-state"
import { Cta } from "@/components/ui/button"
import { agents, DEMO_MAIL, navGroups, type AgentId } from "@/lib/content"
import { cn } from "@/lib/utils"

export function SiteHeader() {
  const { selectAgent, selectIndustry } = useSite()
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const [agentsOpen, setAgentsOpen] = useState(false)

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener("scroll", onScroll, { passive: true })
    return () => window.removeEventListener("scroll", onScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : ""
    return () => {
      document.body.style.overflow = ""
    }
  }, [menuOpen])

  function goToAgent(id: AgentId) {
    selectAgent(id)
    setMenuOpen(false)
    setAgentsOpen(false)
    document.getElementById("agents")?.scrollIntoView({ behavior: "smooth" })
  }

  function goToAll() {
    selectIndustry(null)
    setMenuOpen(false)
    setAgentsOpen(false)
    document.getElementById("agents")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <header
      className={cn(
        "fixed inset-x-0 top-0 z-50 h-[72px] border-b transition-all duration-500",
        scrolled
          ? "border-sand/50 bg-cream/95 backdrop-blur-md"
          : "border-transparent bg-cream"
      )}
    >
      <Container className="flex h-full items-center justify-between gap-4">
        <a href="#top" className="shrink-0" aria-label="Honeycomb home">
          <Logo />
        </a>

        <nav className="absolute left-1/2 hidden -translate-x-1/2 items-center gap-8 lg:flex">
          <div
            className="relative"
            onMouseEnter={() => setAgentsOpen(true)}
            onMouseLeave={() => setAgentsOpen(false)}
            onFocus={() => setAgentsOpen(true)}
            onBlur={(event) => {
              const next = event.relatedTarget
              if (
                !(next instanceof Node) ||
                !event.currentTarget.contains(next)
              ) {
                setAgentsOpen(false)
              }
            }}
          >
            <button
              type="button"
              className="inline-flex items-center gap-1 text-sm font-medium text-charcoal transition-colors hover:text-graphite"
              aria-expanded={agentsOpen}
              aria-haspopup="true"
            >
              Agents
              <span className="text-[11px] text-stone" aria-hidden>
                +
              </span>
            </button>
            <div
              className={cn(
                "absolute top-full left-1/2 z-50 w-[640px] -translate-x-1/2 pt-4 transition duration-200",
                agentsOpen
                  ? "visible translate-y-0 opacity-100"
                  : "invisible -translate-y-1 opacity-0"
              )}
            >
              <div className="border border-sand bg-cream px-8 py-7 shadow-[0_18px_50px_rgba(21,21,21,0.08)]">
                <div className="grid grid-cols-3 gap-8">
                  {navGroups.map((group) => (
                    <div key={group.label}>
                      <p className="mb-3 font-mono text-[12px] tracking-[0.14em] text-stone uppercase">
                        {group.label}
                      </p>
                      <ul className="space-y-1">
                        {group.ids.map((id) => {
                          const agent = agents.find((item) => item.id === id)
                          if (!agent) return null
                          return (
                            <li key={id}>
                              <button
                                type="button"
                                onClick={() => goToAgent(id)}
                                className="py-1.5 text-left text-sm text-graphite transition-colors hover:text-ember"
                              >
                                {agent.label}
                              </button>
                            </li>
                          )
                        })}
                      </ul>
                    </div>
                  ))}
                </div>
                <button
                  type="button"
                  onClick={goToAll}
                  className="mt-6 font-mono text-[12px] tracking-[0.14em] text-charcoal uppercase underline decoration-charcoal/40 underline-offset-4 transition-colors hover:text-ember hover:decoration-ember"
                >
                  View all solutions →
                </button>
              </div>
            </div>
          </div>
          <a
            href="#process"
            className="text-sm font-medium text-charcoal transition-colors hover:text-graphite"
          >
            How it works
          </a>
          <a
            href="#about"
            className="text-sm font-medium text-charcoal transition-colors hover:text-graphite"
          >
            About
          </a>
        </nav>

        <div className="flex items-center gap-3">
          <Cta
            href={DEMO_MAIL}
            tone="primary"
            size="nav"
            className="hidden sm:inline-flex"
          >
            Book a demo
          </Cta>
          <button
            type="button"
            className="relative flex size-10 flex-col items-center justify-center gap-[5px] lg:hidden"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span
              className={cn(
                "block h-[1.5px] w-6 bg-charcoal transition duration-300",
                menuOpen && "translate-y-[6.5px] rotate-45"
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-6 bg-charcoal transition duration-300",
                menuOpen && "opacity-0"
              )}
            />
            <span
              className={cn(
                "block h-[1.5px] w-6 bg-charcoal transition duration-300",
                menuOpen && "-translate-y-[6.5px] -rotate-45"
              )}
            />
          </button>
        </div>
      </Container>

      <div
        inert={menuOpen ? undefined : true}
        className={cn(
          "fixed inset-x-0 top-[72px] bottom-0 z-40 overflow-y-auto bg-ivory px-6 py-8 transition duration-300 lg:hidden",
          menuOpen
            ? "visible opacity-100"
            : "pointer-events-none invisible opacity-0"
        )}
      >
        <div className="space-y-8">
          {navGroups.map((group) => (
            <div key={group.label}>
              <p className="mb-2 font-mono text-[12px] tracking-[0.14em] text-stone uppercase">
                {group.label}
              </p>
              <ul>
                {group.ids.map((id) => {
                  const agent = agents.find((item) => item.id === id)
                  if (!agent) return null
                  return (
                    <li key={id}>
                      <button
                        type="button"
                        onClick={() => goToAgent(id)}
                        className="block w-full py-3 text-left text-lg text-charcoal"
                      >
                        {agent.label}
                      </button>
                    </li>
                  )
                })}
              </ul>
            </div>
          ))}
          <a
            href="#process"
            onClick={() => setMenuOpen(false)}
            className="block py-3 text-lg text-charcoal"
          >
            How it works
          </a>
          <a
            href="#about"
            onClick={() => setMenuOpen(false)}
            className="block py-3 text-lg text-charcoal"
          >
            About
          </a>
          <Cta href={DEMO_MAIL} tone="primary" size="pill" className="mt-2">
            Book a demo
          </Cta>
        </div>
      </div>
    </header>
  )
}

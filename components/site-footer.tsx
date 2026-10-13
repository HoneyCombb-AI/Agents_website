"use client"

import { Container } from "@/components/container"
import { Logo } from "@/components/logo"
import { useSite } from "@/components/site-state"
import { agents, DEMO_MAIL, type AgentId } from "@/lib/content"

const columns = [
  {
    title: "Solutions",
    links: agents.map((agent) => ({
      label: agent.label,
      href: `#agents`,
    })),
  },
  {
    title: "Company",
    links: [
      { label: "About", href: "#about" },
      { label: "How it works", href: "#process" },
    ],
  },
  {
    title: "Contact",
    links: [{ label: "Book a demo", href: DEMO_MAIL }],
  },
]

export function SiteFooter() {
  const { selectAgent } = useSite()

  function openAgent(id: AgentId) {
    selectAgent(id)
    document.getElementById("agents")?.scrollIntoView({ behavior: "smooth" })
  }

  return (
    <footer id="about" className="scroll-mt-24 border-t border-sand bg-cream">
      <Container className="py-20">
        <div className="grid gap-10 md:grid-cols-8 md:gap-8">
          <div className="md:col-span-3">
            <Logo />
            <p className="mt-4 max-w-[280px] text-sm leading-6 text-stone">
              AI agents for Indian manufacturers and distributors. Quoting from
              the drawing, order entry, invoicing, catalogue pricing,
              follow-ups, and scheduling, inside the ERP you already run.
            </p>
            <p className="mt-4 text-xs leading-5 text-stone">Bangalore</p>
            <p className="mt-3 text-xs leading-5 text-stone">
              Ankush Nagathan and Shahzad Mir, co-founders.
            </p>
          </div>

          <div className="grid gap-8 sm:grid-cols-3 md:col-span-5">
            {columns.map((column) => (
              <div key={column.title}>
                <p className="font-mono text-[12px] tracking-[0.14em] text-stone uppercase">
                  {column.title}
                </p>
                <ul className="mt-4">
                  {column.title === "Solutions"
                    ? agents.map((agent) => (
                        <li key={agent.id}>
                          <button
                            type="button"
                            onClick={() => openAgent(agent.id)}
                            className="inline-block py-1.5 text-sm text-graphite transition-colors hover:text-charcoal md:py-1"
                          >
                            {agent.label}
                          </button>
                        </li>
                      ))
                    : column.links.map((link) => (
                        <li key={link.label}>
                          <a
                            href={link.href}
                            className="inline-block py-1.5 text-sm text-graphite transition-colors hover:text-charcoal md:py-1"
                          >
                            {link.label}
                          </a>
                        </li>
                      ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div
          className="mt-20 overflow-hidden text-sand/60"
          role="img"
          aria-label="Honeycomb"
        >
          <div
            className="aspect-[1985/220] w-full max-w-[1100px] bg-current"
            style={{
              WebkitMaskImage: "url(/wordmark.svg)",
              maskImage: "url(/wordmark.svg)",
              WebkitMaskRepeat: "no-repeat",
              maskRepeat: "no-repeat",
              WebkitMaskSize: "contain",
              maskSize: "contain",
              WebkitMaskPosition: "left center",
              maskPosition: "left center",
              maskMode: "alpha",
            }}
          />
        </div>

        <div className="mt-8 flex flex-col items-center justify-between gap-4 border-t border-sand pt-6 text-xs text-stone sm:flex-row">
          <p>© 2026 Honeycomb AI. All rights reserved.</p>
          <a href={DEMO_MAIL} className="transition-colors hover:text-charcoal">
            ankush@honeycombai.in
          </a>
        </div>
      </Container>
    </footer>
  )
}

import { Container } from "@/components/container"
import { Logo } from "@/components/logo"
import { agents, DEMO_MAIL } from "@/lib/content"

const columns = [
  {
    title: "Product",
    links: [
      { label: "The product", href: "/product" },
      ...agents.map((agent) => ({ label: agent.label, href: `/${agent.id}` })),
    ],
  },
  {
    title: "Company",
    links: [
      { label: "How it works", href: "/#process" },
      { label: "About", href: "/#about" },
    ],
  },
  {
    title: "Connect",
    links: [
      { label: "Book a demo", href: DEMO_MAIL },
      { label: "ankush@honeycombai.in", href: DEMO_MAIL },
    ],
  },
]

export function SiteFooter() {
  return (
    <footer id="about" className="scroll-mt-24 border-t border-sand bg-cream">
      <Container className="py-20">
        <div className="grid gap-10 lg:grid-cols-8 lg:gap-8">
          <div className="lg:col-span-3">
            <Logo />
            <p className="mt-4 max-w-[280px] text-sm leading-6 text-stone">
              AI agents for Indian manufacturers and distributors. Prospecting,
              quoting, order entry, scheduling, customer service, and AP/AR,
              inside the ERP you already run.
            </p>
            <p className="mt-4 text-xs leading-5 text-stone">Bangalore</p>
            <p className="mt-3 text-xs leading-5 text-stone">
              Ankush Nagathan and Shahzad Mir, co-founders.
            </p>
          </div>

          <div className="grid min-w-0 gap-8 sm:grid-cols-3 lg:col-span-5">
            {columns.map((column) => (
              <div key={column.title} className="min-w-0">
                <p className="font-mono text-[12px] tracking-[0.14em] text-stone uppercase">
                  {column.title}
                </p>
                <ul className="mt-4">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <a
                        href={link.href}
                        className="inline-block max-w-full py-1.5 text-sm break-words text-graphite transition-colors hover:text-charcoal md:py-1"
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

        <p className="mt-16 max-w-full font-display text-[clamp(22px,8.2vw,88px)] leading-none tracking-[0.06em] text-sand/60 md:text-[clamp(32px,6.4vw,88px)]">
          HONEYCOMB AI
        </p>

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

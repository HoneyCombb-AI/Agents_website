import Link from "next/link"

import { BuildSteps } from "@/components/build-steps"
import { Container } from "@/components/container"
import { ProductGrid } from "@/components/product-grid"
import { SiteFooter } from "@/components/site-footer"
import { Cta } from "@/components/ui/button"
import { DEMO_MAIL, systems, type AgentStep } from "@/lib/content"

const steps: AgentStep[] = [
  {
    n: "01",
    title: "On site",
    kicker: "On your floor",
    body: "A Honeycomb AI engineer spends time on your floor, learning how your team works, from the first email to the last booking.",
  },
  {
    n: "02",
    title: "Build",
    kicker: "With your team",
    body: "We build each agent on your own history, your parts, and the know-how your seniors already carry.",
  },
  {
    n: "03",
    title: "Beta",
    kicker: "On live work",
    body: "Your team runs live work through the agent, and we tune it with them until it works the way you do.",
  },
  {
    n: "04",
    title: "Live",
    kicker: "In your system",
    body: "The agents go to work in the system you already run, and they keep learning when your team corrects them.",
  },
]

const faqs = [
  {
    q: "Do we have to replace our ERP?",
    a: "No. The agents run in the system you already run, Tally, SAP Business One, or whichever one holds the books. Replace it only if you decide to.",
  },
  {
    q: "Whose data is it?",
    a: "Yours. It stays in its own environment. It is not shared, and it does not train anyone else's model.",
  },
  {
    q: "Does a person check the work?",
    a: "Yes. Every draft waits for someone on your team to send it, edit it, or reject it.",
  },
  {
    q: "What does it cost?",
    a: "It depends on the job we build. We will go through it with you on a call.",
  },
  {
    q: "Which systems do you connect to?",
    a: `${systems.map((row) => `${row.category}: ${row.names.join(", ")}`).join(". ")}. If yours is not listed, we connect it.`,
  },
  {
    q: "What happens if we leave?",
    a: "You get an export of your data. The agent built for you is removed, and the history stays yours.",
  },
]

export function ProductPage() {
  return (
    <main className="bg-ivory">
      <section className="pt-[104px] pb-16 md:pt-[136px] md:pb-24">
        <Container>
          <div className="border border-rule">
            <div className="flex items-center justify-between border-b border-rule px-4 py-3.5 md:px-6">
              <span className="font-mono text-[13px] tracking-[0.08em] text-ink-3 uppercase">
                Six agents
              </span>
              <span className="hidden font-mono text-[13px] tracking-[0.08em] text-ink-3 uppercase min-[420px]:inline">
                One job each
              </span>
            </div>
            <div className="px-4 py-12 md:px-8 md:py-16">
              <p className="text-center font-mono text-[12px] tracking-[0.14em] text-stone uppercase">
                Product
              </p>
              <h1 className="mx-auto mt-4 max-w-[16ch] text-center font-body text-[clamp(40px,4.6vw,64px)] leading-[1.08] font-normal tracking-[-0.015em] text-charcoal">
                Pick the job.
                <span className="mt-1 block">We will build your agent.</span>
              </h1>
              <p className="mx-auto mt-5 max-w-[40rem] text-center text-[17px] leading-7 text-ink-2 md:text-[19px] md:leading-8">
                Each one learns the job from your team, on your floor, from your
                own history.
              </p>
            </div>
            <div className="border-t border-rule p-3 md:p-4">
              <ProductGrid />
            </div>
          </div>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <h2 className="max-w-[18ch] font-body text-[clamp(32px,3.4vw,48px)] leading-[1.12] font-normal tracking-[-0.01em] text-charcoal">
            Your agents work the way your team would.
          </h2>
          <ul className="mt-10 max-w-[820px] border-b border-hairline">
            <li className="border-t border-hairline py-5 md:py-6">
              <p className="font-mono text-[13px] tracking-[0.08em] text-ink-3 uppercase">
                Built for you
              </p>
              <p className="mt-2.5 text-[17px] leading-[26px] text-charcoal md:text-[19px] md:leading-7">
                We build every agent on site with your team, from your own
                history, your customers, and the way the work actually moves.
                Never from a template.
              </p>
            </li>
            <li className="border-t border-hairline py-5 md:py-6">
              <p className="font-mono text-[13px] tracking-[0.08em] text-ink-3 uppercase">
                On your systems
              </p>
              <p className="mt-2.5 text-[17px] leading-[26px] text-charcoal md:text-[19px] md:leading-7">
                Your agents work in your system, beside your team. Your data
                stays where it is. Correct a line, and the agent holds it the
                way a new hire would.
              </p>
            </li>
            <li className="border-t border-hairline py-5 md:py-6">
              <p className="font-mono text-[13px] tracking-[0.08em] text-ink-3 uppercase">
                Better with every agent
              </p>
              <p className="mt-2.5 text-[17px] leading-[26px] text-charcoal md:text-[19px] md:leading-7">
                Start with one agent and add the next when you want it. A
                company found in prospecting becomes the quote, the order, the
                job on the machine, and the invoice. Each one shares what the
                others already know.
              </p>
            </li>
          </ul>
          <p className="mt-8 text-[17px] leading-7 text-charcoal md:text-[19px]">
            They run in the ERP you already have.{" "}
            <Link
              href="/#agents"
              className="font-mono text-[13px] tracking-[0.08em] uppercase underline underline-offset-4 hover:text-ember"
            >
              See the agents
            </Link>
          </p>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <h2 className="mb-10 font-body text-[clamp(32px,3.4vw,48px)] leading-[1.12] font-normal tracking-[-0.01em] text-charcoal">
            On your floor, with your team.
          </h2>
          <BuildSteps steps={steps} />
          <p className="mt-10 text-[clamp(18px,1.8vw,22px)] leading-snug text-charcoal">
            Spend your hours where they count. Start with one agent.
          </p>
          <Cta href={DEMO_MAIL} tone="primary" size="pill" className="mt-6">
            Book a demo
          </Cta>
        </Container>
      </section>

      <section className="pb-16 md:pb-24">
        <Container>
          <h2 className="sr-only">Frequently asked questions</h2>
          <ul className="max-w-[880px] border-b border-hairline">
            {faqs.map((item) => (
              <li
                key={item.q}
                className="border-t border-hairline py-5 md:py-6"
              >
                <h3 className="text-[19px] leading-7 font-medium text-charcoal">
                  {item.q}
                </h3>
                <p className="mt-2 text-[15px] leading-6 text-ink-2 md:text-[17px] md:leading-[26px]">
                  {item.a}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      <section className="border-t border-hairline py-20 md:py-28">
        <Container>
          <h2 className="max-w-[16ch] font-body text-[clamp(32px,3.4vw,48px)] leading-[1.12] font-normal tracking-[-0.01em] text-charcoal">
            Let&apos;s build your first agent.
          </h2>
          <p className="mt-4 max-w-[40rem] text-[17px] leading-7 text-ink-2 md:text-[19px]">
            It starts with a call about the work stuck in your queue. Start with
            one job.
          </p>
          <Cta href={DEMO_MAIL} tone="primary" size="pill" className="mt-6">
            Book a demo
          </Cta>
        </Container>
      </section>
      <SiteFooter />
    </main>
  )
}

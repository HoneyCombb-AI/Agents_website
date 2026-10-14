import Link from "next/link"

import { agentIcons } from "@/components/agent-icons"
import { BuildSteps } from "@/components/build-steps"
import { Container } from "@/components/container"
import { AgentDemo } from "@/components/demo"
import { FaqList } from "@/components/faq-list"
import { HeroArt } from "@/components/hero-art"
import { SiteFooter } from "@/components/site-footer"
import { Cta } from "@/components/ui/button"
import { agents, DEMO_MAIL, demoMail, type Agent } from "@/lib/content"
import { cn } from "@/lib/utils"

function SectionLabel({ children }: { children: string }) {
  return (
    <h2 className="font-mono text-[12px] tracking-[0.14em] text-stone uppercase">
      {children}
    </h2>
  )
}

function SectionTitle({
  children,
  className,
}: {
  children: string
  className?: string
}) {
  return (
    <p
      className={cn(
        "font-body text-[clamp(32px,3.4vw,48px)] leading-[1.12] font-normal tracking-[-0.01em] text-charcoal",
        className
      )}
    >
      {children}
    </p>
  )
}

export function AgentPage({ agent }: { agent: Agent }) {
  const Icon = agentIcons[agent.icon]

  return (
    <main className="bg-ivory">
      <section className="bg-ivory pt-[104px] pb-16 md:pt-[120px] md:pb-20">
        <Container>
          <div className="border border-rule">
            <div className="flex items-center justify-between border-b border-rule px-4 py-3.5 md:px-6">
              <Link
                href="/product"
                className="font-mono text-[13px] font-medium tracking-[0.08em] text-ink-3 uppercase transition-colors hover:text-charcoal"
              >
                <span aria-hidden="true">← </span>
                All agents
              </Link>
              <span className="font-mono text-[13px] font-medium tracking-[0.08em] text-ink-3 uppercase">
                Agent
              </span>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2">
              <div className="flex flex-col justify-center p-6 md:p-10">
                <div className="mb-8 flex items-center gap-4 md:gap-5">
                  <span className="flex size-14 shrink-0 items-center justify-center rounded-[2px] border border-rule text-charcoal md:size-16">
                    <Icon
                      aria-hidden
                      strokeWidth={1.25}
                      className="size-8 md:size-9"
                    />
                  </span>
                  <h1 className="min-w-0 font-body text-[clamp(32px,8vw,40px)] leading-[1.05] font-normal tracking-[-0.02em] text-charcoal max-md:text-balance md:text-[clamp(40px,5vw,64px)]">
                    {agent.label}
                  </h1>
                </div>
                <p className="max-w-[600px] border-y border-rule py-4 font-mono text-[13px] leading-[19px] tracking-[0.08em] text-pretty text-ink-3 uppercase">
                  {agent.oneLiner}
                </p>
                <p className="mt-6 max-w-[600px] text-[clamp(20px,2vw,24px)] leading-snug text-charcoal">
                  {agent.promise}
                </p>
                <div className="mt-8">
                  <Cta href={demoMail(agent.label)} tone="primary" size="pill">
                    Book a demo
                  </Cta>
                </div>
              </div>
              <div className="border-t border-rule lg:border-t-0 lg:border-l">
                <HeroArt id={agent.id} />
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="border-t border-hairline bg-ivory py-20 md:py-28">
        <Container>
          <div className="grid gap-8 lg:grid-cols-[minmax(0,2fr)_minmax(0,3fr)] lg:items-start lg:gap-16">
            <SectionLabel>What&apos;s different</SectionLabel>
            <ul className="border-b border-hairline">
              {agent.different.map((item) => (
                <li
                  key={item.title}
                  className="border-t border-hairline py-5 md:py-6"
                >
                  <p className="font-mono text-[13px] tracking-[0.08em] text-ink-3 uppercase">
                    {item.title}
                  </p>
                  <p className="mt-2.5 text-[17px] leading-[26px] text-pretty text-charcoal md:text-[19px] md:leading-[28px]">
                    {item.body}
                  </p>
                </li>
              ))}
            </ul>
          </div>
        </Container>
      </section>

      <section
        id="how-it-works"
        className="scroll-mt-24 border-t border-hairline bg-ivory py-20 md:py-28"
      >
        <Container>
          <SectionLabel>How it works</SectionLabel>
          <SectionTitle className="mt-4">{agent.howTitle}</SectionTitle>
          <p className="mt-5 max-w-[880px] text-[17px] leading-relaxed text-pretty text-ink-2 md:text-[19px] md:leading-[29px]">
            {agent.howBody}
          </p>
          <div className="mt-10">
            <AgentDemo id={agent.id} story={agent.demoStory} />
          </div>
        </Container>
      </section>

      <section className="border-t border-hairline bg-ivory py-20 md:py-28">
        <Container>
          <SectionLabel>How we build</SectionLabel>
          <SectionTitle className="mt-4 mb-10">
            On your floor, with your team.
          </SectionTitle>
          <BuildSteps steps={agent.steps} />
        </Container>
      </section>

      <section className="border-t border-hairline bg-ivory py-16 md:py-24">
        <Container>
          <p className="max-w-[40rem] text-[clamp(20px,2vw,28px)] leading-snug text-charcoal">
            {agent.cta}
          </p>
          <Cta
            href={demoMail(agent.label)}
            tone="primary"
            size="pill"
            className="mt-6"
          >
            Book a demo
          </Cta>
        </Container>
      </section>

      <section className="border-t border-hairline bg-ivory py-20 md:py-28">
        <Container>
          <SectionLabel>One platform</SectionLabel>
          <SectionTitle className="mt-4 mb-10">
            Every agent, connected.
          </SectionTitle>
          <div className="grid grid-cols-1 gap-3 md:grid-cols-2 md:gap-4 lg:grid-cols-3">
            {agents.map((item) => {
              const ItemIcon = agentIcons[item.icon]
              const here = item.id === agent.id
              const body = (
                <>
                  <span className="grid grid-cols-[64px_1fr] items-center gap-x-4">
                    <span className="flex size-16 items-center justify-center rounded-[2px] border border-rule">
                      <ItemIcon
                        aria-hidden
                        strokeWidth={1.25}
                        className="size-8"
                      />
                    </span>
                    <span className="text-[22px] leading-[28px] font-medium text-charcoal md:text-[24px] md:leading-[30px]">
                      {item.label}
                    </span>
                  </span>
                  <span className="mt-6 block border-t border-hairline pt-4 font-mono text-[13px] leading-[19px] tracking-[0.08em] text-ink-3 uppercase">
                    {item.oneLiner}
                  </span>
                  <span
                    className={cn(
                      "mt-4 font-mono text-[13px] tracking-[0.08em] text-charcoal uppercase",
                      here ? "" : "underline underline-offset-4"
                    )}
                  >
                    {here ? "On this page" : "See it work"}
                  </span>
                </>
              )
              const className =
                "flex flex-col rounded-[2px] border border-rule px-5 py-6 text-charcoal transition-colors"
              if (here) {
                return (
                  <article
                    key={item.id}
                    aria-current="page"
                    className={className}
                  >
                    {body}
                  </article>
                )
              }
              return (
                <Link
                  key={item.id}
                  href={`/${item.id}`}
                  className={`${className} hover:bg-mist`}
                >
                  {body}
                </Link>
              )
            })}
          </div>
          <Link
            href="/product"
            className="mt-8 inline-block font-mono text-[13px] tracking-[0.08em] text-charcoal uppercase underline underline-offset-4 hover:text-ember"
          >
            See the product
          </Link>
        </Container>
      </section>

      <section className="border-t border-hairline bg-ivory py-16 md:py-24">
        <Container>
          <SectionLabel>Works with</SectionLabel>
          <SectionTitle className="mt-4">
            Your ERP, your CRM, your inbox.
          </SectionTitle>
          <p className="mt-4 max-w-[640px] text-[17px] leading-relaxed text-ink-2 md:text-[19px]">
            Your data stays in its own environment.
          </p>
          <dl className="mt-8 grid max-w-[720px] grid-cols-[max-content_minmax(0,1fr)] gap-x-6 gap-y-3 border-t border-sand pt-6 md:gap-x-8">
            <dt className="font-mono text-[12px] tracking-[0.14em] text-stone uppercase">
              Works with
            </dt>
            <dd className="text-[15px] text-graphite">
              Your ERP · Your CRM · Your inbox
            </dd>
            <dt className="font-mono text-[12px] tracking-[0.14em] text-stone uppercase">
              Your data
            </dt>
            <dd className="text-[15px] text-graphite">
              Stays in its own separate environment.
            </dd>
          </dl>
        </Container>
      </section>

      <section className="border-t border-hairline bg-ivory py-20 md:py-28">
        <Container>
          <h2 className="mb-10 font-body text-[clamp(26px,2.5vw,32px)] leading-[1.2] font-normal tracking-[-0.01em] text-charcoal">
            {agent.label}, frequently asked questions
          </h2>
          <FaqList items={agent.faqs} />
        </Container>
      </section>

      <section className="border-t border-hairline bg-ivory py-20 md:py-28">
        <Container className="flex flex-col items-center text-center">
          <p className="font-mono text-[12px] tracking-[0.14em] text-stone uppercase">
            Built with manufacturers
          </p>
          <h2 className="mt-6 max-w-[16ch] font-display text-[clamp(36px,5vw,64px)] leading-[1.05] font-normal text-charcoal">
            Every quote out. Every order in. Every system talking to the next.
          </h2>
          <p className="mt-6 max-w-[38rem] text-[17px] leading-relaxed text-ink-2">
            Your team, back on the work only they can do. We are building that
            with manufacturers in India now.
          </p>
          <p className="mt-8 text-[clamp(20px,2vw,24px)] text-charcoal">
            Let&apos;s build yours.
          </p>
          <Cta href={DEMO_MAIL} tone="primary" size="pill" className="mt-8">
            Book a demo
          </Cta>
        </Container>
      </section>

      <SiteFooter />
    </main>
  )
}

import { Container } from "@/components/container"
import { WorksInside } from "@/components/works-inside"
import { DEMO_MAIL, steps } from "@/lib/content"

export function Process() {
  return (
    <section
      id="process"
      className="scroll-mt-24 bg-ivory pt-12 pb-20 md:pt-20 md:pb-32"
    >
      <Container className="flex flex-col gap-16">
        <div>
          <h2 className="font-body text-[clamp(32px,3.4vw,48px)] leading-[1.12] font-normal tracking-[-0.01em] text-charcoal">
            On your floor, with your team.
          </h2>
          <div className="mt-10 grid grid-cols-1 border-t border-l border-hairline sm:grid-cols-2 lg:grid-cols-4">
            {steps.map((step) => (
              <article
                key={step.n}
                className="flex min-h-[280px] flex-col border-r border-b border-hairline px-5 py-7 md:px-6 md:py-8"
              >
                <p className="font-mono text-[15px] tracking-[0.08em] text-ink-3 uppercase">
                  {step.n}
                </p>
                <h3 className="mt-4 font-body text-[22px] leading-7 font-medium text-charcoal">
                  {step.title}
                </h3>
                <p className="mt-3 text-[17px] leading-[26px] text-pretty text-ink-2">
                  {step.body}
                </p>
                <p className="mt-auto pt-8 font-mono text-[12px] tracking-[0.1em] text-stone uppercase">
                  {step.kicker}
                </p>
              </article>
            ))}
          </div>
        </div>

        <div>
          <p className="font-mono text-[15px] tracking-[0.08em] text-ink-3 uppercase">
            Works inside
          </p>
          <WorksInside className="mt-10" />
          <p className="mt-12 text-[19px] leading-8 text-charcoal">
            Don&apos;t see yours? We&apos;ll connect it.{" "}
            <a
              href={DEMO_MAIL}
              className="ml-2 font-mono text-[13px] tracking-[0.08em] uppercase underline underline-offset-4 hover:text-ember"
            >
              Book a demo
            </a>
          </p>
        </div>
      </Container>
    </section>
  )
}

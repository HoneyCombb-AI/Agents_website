import { Container } from "@/components/container"
import { DEMO_MAIL, systems } from "@/lib/content"

export function BuiltForYou() {
  return (
    <section className="bg-ivory pt-16 pb-8 md:pt-28">
      <Container className="flex flex-col gap-6">
        <h2 className="font-body text-[clamp(32px,3.4vw,48px)] leading-[1.12] font-normal tracking-[-0.01em] text-charcoal">
          Built for you.
        </h2>
        <div className="flex max-w-[880px] flex-col gap-4 text-[19px] leading-7 text-charcoal md:text-[21px] md:leading-8">
          <p className="text-pretty">
            Every agent is cut to your shop. You switch the next one on only
            when you want it.
          </p>
          <p className="text-pretty">
            Correct a price or explain a new rule, and it holds that the way a
            new engineer would.
          </p>
          <p className="text-pretty">
            Ask it a question and it looks through the ERP, the inbox, and the
            sheets you already trust.
          </p>
        </div>

        <div className="mt-12 border-t border-hairline pt-10">
          <p className="font-mono text-[15px] tracking-[0.08em] text-ink-3 uppercase">
            Works inside
          </p>
          <div className="mt-10 flex flex-col gap-14 md:gap-20">
            {systems.map((row) => (
              <div
                key={row.category}
                className="grid items-center gap-6 md:grid-cols-[96px_1fr] md:gap-8"
              >
                <p className="font-mono text-[15px] tracking-[0.08em] text-charcoal uppercase">
                  {row.category}
                </p>
                <ul className="flex flex-wrap items-center gap-x-12 gap-y-5">
                  {row.names.map((name) => (
                    <li
                      key={name}
                      className="font-body text-[15px] font-semibold tracking-[-0.02em] text-charcoal opacity-72 transition-opacity duration-300 hover:opacity-100 md:text-[17px]"
                    >
                      {name}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
          <p className="mt-16 text-[19px] leading-[29px] text-charcoal md:mt-20">
            Don&apos;t see yours? We&apos;ll connect it.{" "}
            <a
              href={DEMO_MAIL}
              className="ml-2 font-mono text-[15px] tracking-[0.08em] uppercase underline underline-offset-4 transition-colors hover:text-ember"
            >
              Book a demo
            </a>
          </p>
        </div>
      </Container>
    </section>
  )
}

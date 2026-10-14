import { Container } from "@/components/container"
import { Cta } from "@/components/ui/button"
import { DEMO_MAIL } from "@/lib/content"

const ticker =
  "Honeycomb AI  ·  Agents for Indian manufacturers and distributors  ·  Book a demo  ·  "

export function Hero() {
  return (
    <section
      id="top"
      className="relative isolate flex min-h-svh flex-col overflow-hidden bg-ivory pt-[108px]"
    >
      <div className="border-y border-hairline bg-ivory">
        <div className="overflow-hidden">
          <p className="animate-marquee flex w-max font-mono text-[12px] tracking-[0.14em] text-charcoal uppercase">
            <span className="px-4 py-2.5 whitespace-nowrap">
              {ticker.repeat(2)}
            </span>
            <span className="px-4 py-2.5 whitespace-nowrap" aria-hidden>
              {ticker.repeat(2)}
            </span>
          </p>
        </div>
      </div>

      <Container className="flex flex-1 flex-col justify-center py-16 md:py-20">
        <p className="font-mono text-[13px] tracking-[0.14em] text-stone uppercase">
          Bangalore
        </p>
        <p className="mt-8 font-mono text-[13px] tracking-[0.16em] text-charcoal uppercase">
          Agents built for Indian manufacturers
        </p>
        <h1 className="mt-5 max-w-[14ch] font-body text-[clamp(56px,8.4vw,112px)] leading-[0.92] font-medium tracking-[-0.04em] text-charcoal">
          Clear the queue.
        </h1>
        <p className="mt-8 max-w-[38rem] text-[19px] leading-8 text-ink-2 md:text-[21px]">
          Your best people are still typing the quote, the PO, and the reply by
          hand. Honeycomb AI takes that job, so they can get back to the work
          only they can do.
        </p>
        <Cta href={DEMO_MAIL} tone="primary" size="pill" className="mt-8 w-fit">
          Book a demo
        </Cta>
      </Container>
    </section>
  )
}

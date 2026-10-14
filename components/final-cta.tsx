import { Container } from "@/components/container"
import { Cta } from "@/components/ui/button"
import { DEMO_MAIL } from "@/lib/content"

export function FinalCta() {
  return (
    <section className="bg-ivory py-20 md:py-32">
      <Container className="flex flex-col items-start gap-6">
        <h2 className="font-body text-[clamp(32px,3.4vw,48px)] leading-[1.12] font-normal tracking-[-0.01em] text-charcoal">
          Tell us where to start.
        </h2>
        <p className="max-w-[880px] text-[19px] leading-7 text-charcoal md:text-[21px] md:leading-8">
          Tell us which job is stuck. We will start there.
        </p>
        <Cta href={DEMO_MAIL} tone="primary" size="pill" className="mt-2">
          Book a demo
        </Cta>
      </Container>
    </section>
  )
}

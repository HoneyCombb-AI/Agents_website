import { Container } from "@/components/container"

const lines = [
  "We build each agent for your shop, and you add the next one only when you want it.",
  "Correct a price or explain a new rule, and it holds that the way a new engineer would.",
  "Ask it a question and it looks through the ERP, the inbox, and the sheets you already trust.",
]

export function BuiltForYou() {
  return (
    <section className="bg-ivory pt-20 pb-12 md:pt-32 md:pb-20">
      <Container className="flex flex-col gap-6">
        <h2 className="font-body text-[clamp(32px,3.4vw,48px)] leading-[1.12] font-normal tracking-[-0.01em] text-charcoal">
          Built for you.
        </h2>
        <div className="flex max-w-[880px] flex-col gap-4 text-[19px] leading-7 text-charcoal md:text-[21px] md:leading-8">
          {lines.map((line) => (
            <p key={line} className="text-pretty">
              {line}
            </p>
          ))}
        </div>
      </Container>
    </section>
  )
}

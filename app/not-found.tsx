import Link from "next/link"

import { Container } from "@/components/container"

export default function NotFound() {
  return (
    <main className="bg-ivory pt-36 pb-24">
      <Container>
        <p className="font-mono text-[12px] tracking-[0.14em] text-stone uppercase">
          404
        </p>
        <h1 className="mt-4 font-body text-[clamp(32px,4vw,48px)] leading-[1.12] font-normal text-charcoal">
          That page is not on the floor.
        </h1>
        <Link
          href="/"
          className="mt-8 inline-block font-mono text-[13px] tracking-[0.08em] text-charcoal uppercase underline underline-offset-4"
        >
          Back to Honeycomb
        </Link>
      </Container>
    </main>
  )
}

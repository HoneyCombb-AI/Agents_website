import { Agents } from "@/components/agents"
import { BuiltForYou } from "@/components/built-for-you"
import { FinalCta } from "@/components/final-cta"
import { Hero } from "@/components/hero"
import { Industries } from "@/components/industries"
import { Process } from "@/components/process"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="bg-ivory">
      <Hero />
      <Industries />
      <Agents />
      <BuiltForYou />
      <Process />
      <FinalCta />
      <SiteFooter />
    </main>
  )
}

import { BuildsPanel } from "@/components/builds-panel"
import { BuiltForYou } from "@/components/built-for-you"
import { FinalCta } from "@/components/final-cta"
import { Hero } from "@/components/hero"
import { Industries } from "@/components/industries"
import { Process } from "@/components/process"
import { Proof } from "@/components/proof"
import { SiteFooter } from "@/components/site-footer"

export default function Page() {
  return (
    <main className="bg-ivory">
      <Hero />
      <BuildsPanel />
      <Industries />
      <BuiltForYou />
      <Process />
      <Proof />
      <FinalCta />
      <SiteFooter />
    </main>
  )
}

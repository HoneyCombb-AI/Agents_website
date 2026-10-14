"use client"

import { Container } from "@/components/container"
import { useSite } from "@/components/site-state"
import { agents, industries, type Industry } from "@/lib/content"
import { cn } from "@/lib/utils"

function industryAgents(industry: Industry) {
  return industry.agents
    .map((id) => agents.find((agent) => agent.id === id))
    .filter((agent) => agent !== undefined)
}

function IndustryButton({
  industry,
  pressed,
  onSelect,
  featured,
}: {
  industry: Industry
  pressed: boolean
  onSelect: () => void
  featured?: boolean
}) {
  const fits = industryAgents(industry)
  return (
    <button
      type="button"
      aria-pressed={pressed}
      aria-label={`${industry.label}. ${fits.map((agent) => agent.label).join(", ")}`}
      onClick={onSelect}
      className={cn(
        "flex flex-col text-left focus-visible:z-10 focus-visible:outline focus-visible:outline-2 focus-visible:outline-charcoal",
        featured
          ? "gap-4 border border-hairline px-6 py-6 md:px-8 md:py-8"
          : "min-h-[132px] gap-3 border-r border-b border-hairline px-4 py-4 md:px-5 md:py-5",
        pressed
          ? "z-10 bg-charcoal text-ivory outline outline-2 -outline-offset-2 outline-charcoal"
          : featured
            ? "bg-mist text-charcoal hover:bg-sand/40"
            : "bg-ivory text-charcoal hover:bg-mist"
      )}
    >
      <span>
        <span
          className={cn(
            "block leading-snug",
            featured
              ? "text-[26px] md:text-[32px]"
              : "text-[17px] md:text-[18px]"
          )}
        >
          {industry.label}
        </span>
        <span
          className={cn(
            "mt-1 block leading-5",
            featured ? "mt-2 text-[16px] leading-6" : "text-[14px]",
            pressed ? "text-ivory/75" : "text-ink-2"
          )}
        >
          {industry.note}
        </span>
      </span>
      <span
        className={cn(
          "mt-auto flex flex-wrap gap-x-3 gap-y-1",
          featured ? "gap-x-5" : ""
        )}
      >
        {fits.map((agent) => (
          <span
            key={agent.id}
            className={cn(
              "font-mono tracking-[0.06em] uppercase",
              featured ? "text-[13px]" : "text-[11px] leading-4",
              pressed ? "text-ivory/80" : "text-stone"
            )}
          >
            {agent.label}
          </span>
        ))}
      </span>
    </button>
  )
}

export function Industries() {
  const { industryId, selectIndustry } = useSite()
  const featured = industries.find((industry) => industry.featured)
  const rest = industries.filter((industry) => !industry.featured)

  return (
    <section
      id="industries"
      className="scroll-mt-24 bg-ivory pt-24 pb-4 md:pt-40"
    >
      <Container className="flex flex-col items-start gap-6">
        <h2 className="font-body text-[clamp(32px,3.4vw,48px)] leading-[1.12] font-normal tracking-[-0.01em] text-charcoal">
          Tell us the work.
        </h2>
        <p className="max-w-[46rem] text-[19px] leading-7 text-ink-2 lg:text-[clamp(17px,1.7vw,21px)] lg:leading-8">
          The agents under each name are the ones that fit.
        </p>

        <div role="group" aria-label="Industry" className="mt-6 w-full">
          {featured ? (
            <IndustryButton
              industry={featured}
              featured
              pressed={industryId === featured.id}
              onSelect={() =>
                selectIndustry(industryId === featured.id ? null : featured.id)
              }
            />
          ) : null}
          <div className="mt-3 grid grid-cols-2 border-t border-l border-hairline sm:grid-cols-3 lg:grid-cols-4">
            {rest.map((industry) => (
              <IndustryButton
                key={industry.id}
                industry={industry}
                pressed={industryId === industry.id}
                onSelect={() =>
                  selectIndustry(
                    industryId === industry.id ? null : industry.id
                  )
                }
              />
            ))}
          </div>
        </div>

        <button
          type="button"
          aria-pressed={industryId === null}
          onClick={() => selectIndustry(null)}
          className={cn(
            "font-mono text-[13px] tracking-[0.08em] uppercase underline underline-offset-4 transition-colors hover:text-ember",
            industryId === null ? "text-charcoal" : "text-ink-3"
          )}
        >
          All industries
        </button>
      </Container>
    </section>
  )
}

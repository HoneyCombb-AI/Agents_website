import type { CSSProperties } from "react"

import { systems } from "@/lib/content"
import { cn } from "@/lib/utils"

/** Silhouettes from Simple Icons, stored in the repo. */
const marks: Record<string, { src: string; hex: string }> = {
  "SAP Business One": { src: "/logos/sap.svg", hex: "#0FAAFF" },
  "Zoho Books": { src: "/logos/zoho.svg", hex: "#E42527" },
  Odoo: { src: "/logos/odoo.svg", hex: "#714B67" },
  "Dynamics 365": { src: "/logos/dynamics365.svg", hex: "#0B53CE" },
  "Zoho CRM": { src: "/logos/zoho.svg", hex: "#E42527" },
  HubSpot: { src: "/logos/hubspot.svg", hex: "#FF7A59" },
  Salesforce: { src: "/logos/salesforce.svg", hex: "#00A1E0" },
  Gmail: { src: "/logos/gmail.svg", hex: "#EA4335" },
  Outlook: { src: "/logos/outlook.svg", hex: "#0078D4" },
}

export function WorksInside({ className }: { className?: string }) {
  return (
    <div className={cn("flex flex-col gap-10", className)}>
      {systems.map((row) => (
        <div
          key={row.category}
          className="grid items-center gap-4 md:grid-cols-[96px_1fr] md:gap-8"
        >
          <p className="font-mono text-[15px] tracking-[0.08em] text-charcoal uppercase">
            {row.category}
          </p>
          <ul className="flex flex-wrap items-center gap-x-2 gap-y-3">
            {row.names.map((name) => {
              const mark = marks[name]
              if (!mark) {
                return (
                  <li key={name}>
                    <span className="inline-flex h-11 items-center rounded-[2px] border border-hairline bg-cream px-3 text-[14px] font-semibold tracking-[-0.02em] text-stone transition-colors duration-200 hover:border-charcoal hover:text-charcoal">
                      {name}
                    </span>
                  </li>
                )
              }
              return (
                <li key={name}>
                  <span className="group inline-flex h-11 items-center gap-2.5 rounded-[2px] px-2 text-stone">
                    <span
                      aria-hidden
                      className="brand-mark inline-block size-[22px] shrink-0"
                      style={
                        {
                          "--mark": mark.hex,
                          maskImage: `url(${mark.src})`,
                          WebkitMaskImage: `url(${mark.src})`,
                          maskRepeat: "no-repeat",
                          WebkitMaskRepeat: "no-repeat",
                          maskPosition: "center",
                          WebkitMaskPosition: "center",
                          maskSize: "contain",
                          WebkitMaskSize: "contain",
                        } as CSSProperties
                      }
                    />
                    <span className="text-[14px] font-semibold tracking-[-0.02em] transition-colors duration-200 group-hover:text-charcoal">
                      {name}
                    </span>
                  </span>
                </li>
              )
            })}
          </ul>
        </div>
      ))}
    </div>
  )
}

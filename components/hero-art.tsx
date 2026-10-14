import type { ReactNode } from "react"

import type { AgentId } from "@/lib/content"
import { cn } from "@/lib/utils"

function Chip({
  kicker,
  title,
  detail,
  tone,
  className,
}: {
  kicker: string
  title: string
  detail: string
  tone: "ok" | "bad"
  className?: string
}) {
  return (
    <div
      className={cn(
        "border bg-white px-3 py-2 shadow-[0_8px_24px_rgba(21,21,21,0.06)]",
        tone === "ok" ? "border-[#c9ddd0]" : "border-[#e7c4bb]",
        className
      )}
    >
      <p className="font-mono text-[10px] tracking-[0.12em] text-ink-3 uppercase">
        {kicker}
      </p>
      <p className="mt-1 text-[13px] leading-4 font-medium text-charcoal md:text-[14px]">
        {title}
      </p>
      <p
        className={cn(
          "mt-1 text-[12px] font-medium",
          tone === "ok" ? "text-[#1c6b3c]" : "text-[#9f2d2d]"
        )}
      >
        {detail}
      </p>
    </div>
  )
}

function Stage({ children }: { children: ReactNode }) {
  return (
    <div className="relative h-full min-h-[320px] overflow-hidden bg-white lg:min-h-[460px]">
      <div
        aria-hidden
        className="absolute inset-0"
        style={{
          backgroundImage:
            "linear-gradient(#e7e2d8 1px, transparent 1px), linear-gradient(90deg, #e7e2d8 1px, transparent 1px)",
          backgroundSize: "28px 28px",
          maskImage:
            "radial-gradient(78% 72% at 50% 48%, #000 46%, transparent 100%)",
        }}
      />
      {children}
    </div>
  )
}

function Paper({
  kicker,
  title,
  lines,
}: {
  kicker: string
  title: string
  lines: string[]
}) {
  return (
    <div className="absolute top-[12%] left-[7%] w-[48%] rotate-[2deg] border border-[#d9d3c8] bg-white px-4 py-4 shadow-[0_16px_40px_rgba(21,21,21,0.08)] md:px-5 md:py-5">
      <p className="font-mono text-[10px] tracking-[0.14em] text-ink-3 uppercase">
        {kicker}
      </p>
      <p className="mt-2 text-[18px] leading-6 font-medium tracking-[-0.02em] text-charcoal md:text-[22px]">
        {title}
      </p>
      <div className="mt-3 space-y-1.5 border-t border-[#ece7df] pt-3">
        {lines.map((line) => (
          <p
            key={line}
            className="text-[12px] leading-5 text-stone md:text-[13px]"
          >
            {line}
          </p>
        ))}
      </div>
    </div>
  )
}

const arts: Record<AgentId, ReactNode> = {
  prospecting: (
    <Stage>
      <Paper
        kicker="Account"
        title="Kaveri Pumps"
        lines={["Hubballi", "Buys CI pump casings", "Priya Rao, buyer"]}
      />
      <div className="absolute top-[16%] right-[6%] flex w-[40%] flex-col gap-2.5">
        <Chip
          kicker="Fit"
          title="50 kg casings"
          detail="You already pour these"
          tone="ok"
        />
        <Chip
          kicker="Contact"
          title="Priya Rao"
          detail="Buyer, on the note"
          tone="ok"
        />
        <Chip
          kicker="Next"
          title="Malabar Marine"
          detail="Worth a note"
          tone="ok"
        />
      </div>
    </Stage>
  ),
  quoting: (
    <Stage>
      <Paper
        kicker="Quote QT-1842"
        title="Sagar Hydraulics"
        lines={[
          "HC-4410 housing · ₹7,250",
          "HC-4412 shaft · ₹3,885",
          "Qty 120 · valid 30 days",
        ]}
      />
      <div className="absolute top-[16%] right-[6%] flex w-[40%] flex-col gap-2.5">
        <Chip
          kicker="Drawing"
          title="HC-4410 Rev D"
          detail="Geometry read"
          tone="ok"
        />
        <Chip
          kicker="Rate card"
          title="₹2,400 / hour"
          detail="Your estimators’ rate"
          tone="ok"
        />
        <Chip
          kicker="Lot"
          title="₹13,36,200"
          detail="Draft ready to send"
          tone="ok"
        />
      </div>
    </Stage>
  ),
  "order-entry": (
    <Stage>
      <Paper
        kicker="Purchase order"
        title="PO 50817"
        lines={[
          "Sagar Hydraulics · Pune",
          "HC-4410 · 120 · matches",
          "HC-4412 · 120 · price off",
        ]}
      />
      <div className="absolute top-[14%] right-[6%] flex w-[42%] flex-col gap-2.5">
        <Chip
          kicker="Customer"
          title="Sagar Hydraulics"
          detail="Matched to the account"
          tone="ok"
        />
        <Chip
          kicker="Ship-to"
          title="Plant 2, Chakan"
          detail="On file"
          tone="ok"
        />
        <Chip
          kicker="Line 1"
          title="HC-4410 · ₹7,250"
          detail="Matches the quote"
          tone="ok"
        />
        <Chip
          kicker="Line 2"
          title="HC-4412 · ₹3,480"
          detail="Quote is ₹3,885"
          tone="bad"
        />
      </div>
    </Stage>
  ),
  scheduling: (
    <Stage>
      <Paper
        kicker="Week of 14 Oct"
        title="Lathe 2"
        lines={[
          "Mon · Deccan rough turn",
          "Tue · Deccan finish",
          "Wed · Sagar held",
        ]}
      />
      <div className="absolute top-[16%] right-[6%] flex w-[40%] flex-col gap-2.5">
        <Chip
          kicker="Lathe 2"
          title="Free after 10:00"
          detail="Takes PO 77318"
          tone="ok"
        />
        <Chip
          kicker="EN24 bar"
          title="42 lengths"
          detail="Covers the Deccan job"
          tone="ok"
        />
        <Chip
          kicker="FG 260"
          title="Short by 80"
          detail="Sagar housings wait"
          tone="bad"
        />
      </div>
    </Stage>
  ),
  "customer-service": (
    <Stage>
      <Paper
        kicker="11:42 pm"
        title="Has it shipped?"
        lines={["Arjun Menon", "PO 77318", "Deccan Conveyors"]}
      />
      <div className="absolute top-[16%] right-[6%] flex w-[42%] flex-col gap-2.5">
        <Chip kicker="Order" title="SO-4418" detail="On the books" tone="ok" />
        <Chip
          kicker="Floor"
          title="Lathe 2 · OP10"
          detail="Started 10:14"
          tone="ok"
        />
        <Chip
          kicker="Reply"
          title="Drafted 11:43 pm"
          detail="Ship Friday, Blue Dart"
          tone="ok"
        />
      </div>
    </Stage>
  ),
  "ap-ar": (
    <Stage>
      <Paper
        kicker="Draft invoice"
        title="INV-2291"
        lines={["Deccan Conveyors", "₹8,13,600 · Net 30", "Against PO 77318"]}
      />
      <div className="absolute top-[16%] right-[6%] flex w-[42%] flex-col gap-2.5">
        <Chip
          kicker="Invoice"
          title="₹8,13,600"
          detail="Matches the shipment"
          tone="ok"
        />
        <Chip
          kicker="Late"
          title="Western Agri"
          detail="18 days · ₹6,40,000"
          tone="bad"
        />
        <Chip
          kicker="Supplier bill"
          title="Freight ₹2,400"
          detail="Not on PO 44190"
          tone="bad"
        />
      </div>
    </Stage>
  ),
}

export function HeroArt({ id }: { id: AgentId }) {
  return (
    <div role="img" aria-label="Sample of what this agent checks. Sample data.">
      {arts[id]}
    </div>
  )
}

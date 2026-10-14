import type { CSSProperties, ReactNode } from "react"

import { Mark } from "@/components/logo"

export const STAGE = { w: 1280, h: 720 }

export function inr(n: number, digits = 0) {
  return (
    "₹" +
    n.toLocaleString("en-IN", {
      minimumFractionDigits: digits,
      maximumFractionDigits: digits,
    })
  )
}

export function fadeOpacity(t: number, start: number, end: number) {
  if (t < start || t >= end) return 0
  const fade = 280
  const incoming = start === 0 ? 1 : Math.min(1, (t - start) / fade)
  const outgoing = Math.min(1, (end - t) / fade)
  return Math.max(0, Math.min(incoming, outgoing))
}

export function appear(local: number, at: number, dur = 380) {
  if (local <= at) return 0
  if (local >= at + dur) return 1
  return (local - at) / dur
}

export function rise(local: number, at: number): CSSProperties {
  const p = appear(local, at)
  return {
    opacity: p,
    transform: `translateY(${(1 - p) * 12}px)`,
  }
}

export function Frames({
  t,
  scenes,
}: {
  t: number
  scenes: { id: string; start: number; end: number; node: ReactNode }[]
}) {
  return (
    <div className="absolute inset-0 bg-[#151515] font-body text-[#151515]">
      {scenes.map((scene) => {
        const opacity = fadeOpacity(t, scene.start, scene.end)
        if (opacity <= 0.01) return null
        return (
          <div key={scene.id} className="absolute inset-0" style={{ opacity }}>
            {scene.node}
          </div>
        )
      })}
    </div>
  )
}

export function Slate({ kicker, title }: { kicker: string; title: string }) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#151515] text-[#f3efe7]">
      <Mark className="h-12 text-[#f3efe7]" />
      <p className="mt-5 font-display text-[18px] tracking-[0.2em]">
        HONEYCOMB
      </p>
      <p className="mt-8 font-mono text-[14px] tracking-[0.16em] text-[#f3efe7]/70 uppercase">
        {kicker}
      </p>
      <p className="mt-3 text-[44px] leading-none font-medium tracking-[-0.02em]">
        {title}
      </p>
    </div>
  )
}

export function EndCard({
  kicker,
  title,
  detail,
}: {
  kicker: string
  title: string
  detail: string
}) {
  return (
    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#151515] text-[#f3efe7]">
      <p className="font-mono text-[14px] tracking-[0.16em] text-[#f3efe7]/65 uppercase">
        {kicker}
      </p>
      <p className="mt-4 text-[56px] leading-none font-medium tracking-[-0.03em]">
        {title}
      </p>
      <p className="mt-5 text-[22px] text-[#f3efe7]/80">{detail}</p>
    </div>
  )
}

export function BrandLockup() {
  return (
    <div className="flex items-center gap-2 text-[#151515]">
      <Mark className="h-5" />
      <span className="font-display text-[13px] tracking-[0.16em]">
        HONEYCOMB
      </span>
    </div>
  )
}

export function Shell({
  section,
  subtitle,
  children,
  aside,
}: {
  section: string
  subtitle: string
  children: ReactNode
  aside?: ReactNode
}) {
  return (
    <div className="absolute inset-0 flex flex-col bg-[#f3efe7]">
      <header className="flex h-[56px] shrink-0 items-center gap-4 border-b border-[#e0dbd2] bg-white px-5">
        <BrandLockup />
        <div className="flex h-8 w-[300px] items-center border border-[#e0dbd2] bg-[#f7f4ee] px-3 font-mono text-[12px] text-[#6f6d69]">
          Search orders, quotes, mail
        </div>
        <div className="ml-auto flex items-center gap-2 text-[14px]">
          <span className="flex size-7 items-center justify-center bg-[#151515] text-[11px] font-medium text-white">
            AD
          </span>
          A. Deshmukh
        </div>
      </header>
      <div className="flex items-end justify-between px-6 pt-4 pb-3">
        <div>
          <h3 className="text-[26px] leading-none font-medium tracking-[-0.02em]">
            {section}
          </h3>
          <p className="mt-2 text-[14px] text-[#6f6d69]">{subtitle}</p>
        </div>
        {aside}
      </div>
      <div className="min-h-0 flex-1 px-6 pb-5">{children}</div>
    </div>
  )
}

export function Mail({
  count,
  list,
  reader,
}: {
  count: number
  list: ReactNode
  reader: ReactNode
}) {
  return (
    <div className="absolute inset-0 flex bg-white">
      <aside className="flex w-[210px] shrink-0 flex-col border-r border-[#e4dfd6] bg-[#f6f3ed] px-4 py-5">
        <BrandLockup />
        <div className="mt-6 bg-[#151515] py-2 text-center text-[13px] font-medium text-white">
          New message
        </div>
        <div className="mt-5 space-y-1 text-[15px]">
          <div className="flex items-center justify-between bg-white px-3 py-2 font-medium">
            Inbox
            <span className="font-mono text-[12px]">{count}</span>
          </div>
          {["Drafts", "Sent", "Archive"].map((item) => (
            <div key={item} className="px-3 py-2 text-[#6f6d69]">
              {item}
            </div>
          ))}
        </div>
      </aside>
      <div className="w-[400px] shrink-0 overflow-hidden border-r border-[#e4dfd6]">
        <div className="border-b border-[#e4dfd6] px-4 py-3 font-mono text-[12px] tracking-[0.12em] text-[#6f6d69] uppercase">
          Today
        </div>
        {list}
      </div>
      <div className="min-w-0 flex-1 bg-[#fbfaf7]">{reader}</div>
    </div>
  )
}

export function MailRow({
  from,
  subject,
  preview,
  time,
  active,
  style,
}: {
  from: string
  subject: string
  preview: string
  time: string
  active?: boolean
  style?: CSSProperties
}) {
  return (
    <div
      className={
        active
          ? "border-b border-[#e4dfd6] bg-[#f3efe7] px-4 py-3"
          : "border-b border-[#efeae2] px-4 py-3"
      }
      style={style}
    >
      <div className="flex items-baseline justify-between gap-3">
        <p className="text-[15px] font-medium">{from}</p>
        <p className="font-mono text-[11px] text-[#6f6d69]">{time}</p>
      </div>
      <p className="mt-1 text-[14px]">{subject}</p>
      <p className="mt-1 truncate text-[13px] text-[#6f6d69]">{preview}</p>
    </div>
  )
}

export function AgentChip({
  label,
  style,
}: {
  label: string
  style?: CSSProperties
}) {
  return (
    <div
      className="inline-flex items-center gap-2 bg-[#151515] px-3 py-1.5 font-mono text-[12px] tracking-[0.08em] text-[#f3efe7] uppercase"
      style={style}
    >
      <span className="size-1.5 rounded-full bg-[#c66a28]" />
      {label}
    </div>
  )
}

export function Sheet({
  children,
  width = 560,
}: {
  children: ReactNode
  width?: number
}) {
  return (
    <div
      className="relative bg-white shadow-[0_18px_50px_rgba(21,21,21,0.12)]"
      style={{ width }}
    >
      <div
        className="absolute top-0 right-0 size-8 border-b border-l border-[#e4dfd6] bg-[#f3efe7]"
        style={{ clipPath: "polygon(0 0, 100% 100%, 100% 0)" }}
      />
      <div className="border border-[#d9d3c8] px-7 py-6">{children}</div>
    </div>
  )
}

export function CheckCard({
  kicker,
  title,
  detail,
  tone,
  style,
}: {
  kicker: string
  title: string
  detail: string
  tone: "ok" | "bad"
  style?: CSSProperties
}) {
  const ok = tone === "ok"
  return (
    <div
      className="border bg-white px-4 py-3"
      style={{
        borderColor: ok ? "#b7d7c4" : "#e4b2a8",
        ...style,
      }}
    >
      <p className="font-mono text-[11px] tracking-[0.12em] text-[#6f6d69] uppercase">
        {kicker}
      </p>
      <p className="mt-1 text-[16px] font-medium">{title}</p>
      <p
        className="mt-1 text-[13px] font-medium"
        style={{ color: ok ? "#1c6b3c" : "#9f2d2d" }}
      >
        {detail}
      </p>
    </div>
  )
}

export function Flag({
  children,
  tone,
}: {
  children: ReactNode
  tone: "bad" | "ok" | "wait"
}) {
  const styles = {
    bad: "bg-[#f8e6e1] text-[#9f2d2d]",
    ok: "bg-[#e5f3ea] text-[#1c6b3c]",
    wait: "bg-[#f8efd8] text-[#8a5a12]",
  }[tone]
  return (
    <span
      className={`px-2 py-1 font-mono text-[11px] tracking-[0.08em] uppercase ${styles}`}
    >
      {children}
    </span>
  )
}

export function Cursor({
  x,
  y,
  press,
}: {
  x: number
  y: number
  press?: boolean
}) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      className="absolute z-30"
      style={{
        left: x,
        top: y,
        transform: press ? "translate(1px, 1px)" : undefined,
        filter: "drop-shadow(0 1px 1px rgba(0,0,0,0.35))",
      }}
    >
      <path
        d="M4 2 L4 18 L8.2 13.6 L12.4 20 L14.6 19 L10.4 12.6 L16.5 12.2 Z"
        fill="#151515"
        stroke="#f3efe7"
        strokeWidth="1.4"
      />
    </svg>
  )
}

export function Toast({
  title,
  detail,
  style,
}: {
  title: string
  detail: string
  style?: CSSProperties
}) {
  return (
    <div
      className="absolute bottom-6 left-1/2 z-20 -translate-x-1/2 bg-[#151515] px-5 py-3 text-[#f3efe7] shadow-lg"
      style={style}
    >
      <p className="text-[15px] font-medium">{title}</p>
      <p className="mt-1 text-[13px] text-[#f3efe7]/75">{detail}</p>
    </div>
  )
}

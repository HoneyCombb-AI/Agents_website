import type { CSSProperties, ReactNode } from "react"

import {
  AgentChip,
  CheckCard,
  Cursor,
  EndCard,
  Flag,
  Frames,
  Mail,
  MailRow,
  Shell,
  Slate,
  Toast,
  appear,
  inr,
  rise,
} from "@/components/demo/kit"

const PRICE = 2101
const TWEAKED = 2035

const ops = [
  ["10", "Turn, leave grind stock", "CNC lathe", "6.4", "25", inr(128)],
  ["20", "Hob teeth, leave grind stock", "Hobbing", "7.5", "40", inr(225)],
  ["30", "Mill keyway", "VMC 3-axis", "3.0", "20", inr(75)],
  ["40", "Deburr and wash", "Bench", "2.0", "10", inr(13)],
  ["50", "Carburise, quench, temper", "Outside", "—", "—", "—"],
  ["60", "Grind bore to H7", "ID grind", "2.4", "20", inr(64)],
  ["70", "Grind tooth flanks", "Gear grind", "9.0", "45", inr(330)],
  ["80", "Inspect and mark", "Bench", "3.0", "15", inr(20)],
]

function Inbox({ local }: { local: number }) {
  const open = appear(local, 700)
  return (
    <Mail
      count={1}
      list={
        <div style={rise(local, 250)}>
          <MailRow
            active={open > 0.4}
            from="Vindhya Drives"
            subject="RFQ · helical pinion HG-1842"
            preview="Drawing package attached. Qty 80."
            time="8:14 AM"
          />
        </div>
      }
      reader={
        <div className="px-8 py-6" style={{ opacity: open }}>
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-[24px] font-medium tracking-[-0.02em]">
              RFQ from Vindhya Drives
            </h3>
            <AgentChip label="Reading the package" style={rise(local, 1400)} />
          </div>
          <p className="mt-3 text-[14px] text-[#6f6d69]">
            Meera Joshi · meera.joshi@vindhyadrives.example
          </p>
          <p className="mt-4 max-w-[540px] text-[16px] leading-7">
            Please quote 80 off helical pinion HG-1842 Rev B. Drawing and the
            sheet scan are attached. We need a price and a lead time.
          </p>
          <div className="mt-5 flex gap-3">
            {[
              ["PDF", "HG-1842_RevB.pdf"],
              ["TIF", "HG-1842_sheet1.tif"],
            ].map(([kind, name]) => (
              <div
                key={kind}
                className="inline-flex items-center gap-2 border border-[#e4dfd6] bg-white px-3 py-2"
              >
                <span className="bg-[#151515] px-1.5 py-0.5 font-mono text-[10px] text-white">
                  {kind}
                </span>
                <span className="text-[14px]">{name}</span>
              </div>
            ))}
          </div>
        </div>
      }
    />
  )
}

const callouts: {
  at: number
  label: string
  value: string
  top: string
  left: string
}[] = [
  { at: 300, label: "Material", value: "20MnCr5", top: "4%", left: "4%" },
  { at: 800, label: "Mass", value: "2.40 kg", top: "4%", left: "66%" },
  {
    at: 1300,
    label: "Gear",
    value: "z 32 · m 2.5 · 18° RH",
    top: "34%",
    left: "3%",
  },
  { at: 1800, label: "Bore", value: "Ø42 H7", top: "34%", left: "72%" },
  { at: 2300, label: "Face", value: "28 ±0.02", top: "80%", left: "4%" },
  {
    at: 2800,
    label: "Heat treat",
    value: "Carburise 58–62 HRC",
    top: "80%",
    left: "50%",
  },
]

function GearSheet() {
  return (
    <svg viewBox="0 0 520 560" className="h-full w-full" aria-hidden>
      <rect
        x="8"
        y="8"
        width="504"
        height="544"
        fill="#fbfaf7"
        stroke="#d9d3c8"
      />
      <circle
        cx="260"
        cy="300"
        r="100"
        fill="none"
        stroke="#cfc8bc"
        strokeDasharray="3 4"
      />
      <circle
        cx="260"
        cy="300"
        r="78"
        fill="#f3efe7"
        stroke="#151515"
        strokeWidth="2"
      />
      <circle
        cx="260"
        cy="300"
        r="56"
        fill="none"
        stroke="#151515"
        strokeWidth="1.2"
      />
      {Array.from({ length: 16 }).map((_, i) => {
        const a = (i / 16) * Math.PI * 2
        const x1 = 260 + Math.cos(a) * 72
        const y1 = 300 + Math.sin(a) * 72
        const x2 = 260 + Math.cos(a) * 90
        const y2 = 300 + Math.sin(a) * 90
        return (
          <line
            key={i}
            x1={x1}
            y1={y1}
            x2={x2}
            y2={y2}
            stroke="#151515"
            strokeWidth="6"
            strokeLinecap="square"
          />
        )
      })}
      <circle
        cx="260"
        cy="300"
        r="24"
        fill="#fbfaf7"
        stroke="#151515"
        strokeWidth="2"
      />
      <line
        x1="260"
        y1="230"
        x2="260"
        y2="370"
        stroke="#c66a28"
        strokeWidth="0.6"
      />
      <line
        x1="190"
        y1="300"
        x2="330"
        y2="300"
        stroke="#c66a28"
        strokeWidth="0.6"
      />
      <text
        x="24"
        y="500"
        fill="#6f6d69"
        fontSize="13"
        fontFamily="ui-monospace, monospace"
      >
        HG-1842 · REV B
      </text>
      <text
        x="24"
        y="522"
        fill="#151515"
        fontSize="16"
        fontFamily="ui-sans-serif, system-ui"
      >
        Helical pinion · sample
      </text>
    </svg>
  )
}

function Extract({ local }: { local: number }) {
  const specs = [
    ["Material", "20MnCr5", "Carburising steel"],
    ["Mass", "2.40 kg", "Title block"],
    ["Gear data", "z 32 · m 2.5 · β 18° RH", "α 20°"],
    ["Face width", "28 mm", "±0.02"],
    ["Bore", "Ø42", "H7"],
    ["Flanks", "Ra 0.8", "After grind"],
    ["Heat treatment", "Carburise", "CHD 0.7 ±0.2 · 58–62 HRC"],
  ]
  return (
    <div className="absolute inset-0 grid grid-cols-[560px_1fr] bg-[#efeae2]">
      <div className="relative m-6">
        <GearSheet />
        {callouts.map((item) => (
          <div
            key={item.label}
            className="absolute border border-[#151515] bg-white px-2 py-1 shadow-sm"
            style={{ top: item.top, left: item.left, ...rise(local, item.at) }}
          >
            <p className="font-mono text-[10px] tracking-[0.12em] text-[#6f6d69] uppercase">
              {item.label}
            </p>
            <p className="text-[13px] font-medium">{item.value}</p>
          </div>
        ))}
      </div>
      <div className="my-6 mr-6 flex flex-col border border-[#e0dbd2] bg-white">
        <div className="border-b border-[#e0dbd2] px-4 py-3">
          <p className="font-mono text-[11px] tracking-[0.14em] text-[#6f6d69] uppercase">
            Specs · HG-1842
          </p>
        </div>
        {specs.map((row, index) => (
          <div
            key={row[0]}
            className="grid grid-cols-[140px_1fr] gap-2 border-b border-[#f0ebe3] px-4 py-2 text-[14px]"
            style={rise(local, 280 + index * 280)}
          >
            <span className="text-[#6f6d69]">{row[0]}</span>
            <span>
              <span className="font-medium">{row[1]}</span>
              <span className="ml-2 text-[#6f6d69]">{row[2]}</span>
            </span>
          </div>
        ))}
        <div className="mt-auto px-4 py-3" style={rise(local, 2400)}>
          <Flag tone="wait">Assumption</Flag>
          <p className="mt-2 text-[13px] leading-5">
            Stock form is not on the drawing. Assumed a forged blank, 3.6 kg.
          </p>
        </div>
      </div>
    </div>
  )
}

function Tabs({ active }: { active: string }) {
  return (
    <div className="flex border-b border-[#e0dbd2]">
      {["Specs", "Feasibility", "Routing", "Quote"].map((tab) => (
        <div
          key={tab}
          className={
            tab === active
              ? "border-b-2 border-[#151515] px-4 py-2 text-[13px] font-medium"
              : "px-4 py-2 text-[13px] text-[#6f6d69]"
          }
        >
          {tab}
        </div>
      ))}
    </div>
  )
}

function Report({
  tab,
  subtitle,
  children,
}: {
  tab: string
  subtitle: string
  children: ReactNode
}) {
  return (
    <Shell section="Quoting" subtitle={subtitle}>
      <div className="flex h-full flex-col border border-[#e0dbd2] bg-white">
        <Tabs active={tab} />
        <div className="min-h-0 flex-1 overflow-hidden">{children}</div>
      </div>
    </Shell>
  )
}

function Feasibility({ local }: { local: number }) {
  return (
    <Report tab="Feasibility" subtitle="HG-1842 · checked against the shop">
      <div className="grid h-full grid-cols-[1fr_340px] gap-4 p-4">
        <div className="space-y-3">
          <div className="flex items-center gap-3" style={rise(local, 150)}>
            <Flag tone="ok">Feasible</Flag>
            <Flag tone="wait">Outside heat treat</Flag>
          </div>
          <CheckCard
            kicker="Material"
            title="20MnCr5 is on the card"
            detail="Machinable on the lathe and the hobber"
            tone="ok"
            style={rise(local, 400)}
          />
          <CheckCard
            kicker="Tolerances"
            title="Bore H7 and Ra 0.8 after carburise"
            detail="ID grind and gear grind are in the shop"
            tone="ok"
            style={rise(local, 900)}
          />
          <CheckCard
            kicker="Envelope"
            title="Ø118 fits the hobber"
            detail="Chuck class covers the pinion"
            tone="ok"
            style={rise(local, 1400)}
          />
        </div>
        <div
          className="border border-[#e7d3a4] bg-[#fbf6ea] p-4"
          style={rise(local, 1100)}
        >
          <Flag tone="wait">Amber</Flag>
          <p className="mt-3 text-[16px] font-medium">Carburise is outside</p>
          <p className="mt-2 text-[14px] leading-6 text-[#3c3a36]">
            The shop has no furnace. Quote heat treat as job-work, then grind
            the bore and the flanks. Finish the keyway before heat treat.
          </p>
        </div>
      </div>
    </Report>
  )
}

function RouteTable({
  local,
  withTime,
}: {
  local: number
  withTime?: boolean
}) {
  return (
    <div className="h-full overflow-hidden">
      <div
        className="grid border-b border-[#e0dbd2] bg-[#f7f4ee] px-3 py-2 font-mono text-[11px] tracking-[0.1em] text-[#6f6d69] uppercase"
        style={{
          gridTemplateColumns: withTime
            ? "52px 1.5fr 140px 70px 70px 80px"
            : "52px 1.6fr 180px",
        }}
      >
        <span>Op</span>
        <span>Operation</span>
        <span>Machine</span>
        {withTime ? (
          <>
            <span>CT min</span>
            <span>Setup</span>
            <span>₹/pc</span>
          </>
        ) : null}
      </div>
      {ops.map((op, index) => (
        <div
          key={op[0]}
          className="grid items-center border-b border-[#f0ebe3] px-3 py-1.5 text-[14px]"
          style={{
            gridTemplateColumns: withTime
              ? "52px 1.5fr 140px 70px 70px 80px"
              : "52px 1.6fr 180px",
            ...rise(local, index * (withTime ? 160 : 220)),
          }}
        >
          <span className="font-mono text-[12px]">{op[0]}</span>
          <span className="font-medium">{op[1]}</span>
          <span>{op[2]}</span>
          {withTime ? (
            <>
              <span className="font-mono">{op[3]}</span>
              <span className="font-mono">{op[4]}</span>
              <span className="font-mono">{op[5]}</span>
            </>
          ) : null}
        </div>
      ))}
    </div>
  )
}

function Routing({ local }: { local: number }) {
  return (
    <Report tab="Routing" subtitle="Forged blank · 8 operations">
      <div className="border-b border-[#efeae2] px-4 py-2 text-[13px] text-[#6f6d69]">
        Stock · forged 20MnCr5 blank, 3.6 kg. Teeth hobbed soft, ground after
        heat treat.
      </div>
      <RouteTable local={local} />
    </Report>
  )
}

function Cycle({ local }: { local: number }) {
  return (
    <Report tab="Routing" subtitle="Cycle time and setup · 80 pcs">
      <div className="flex items-center justify-between border-b border-[#efeae2] px-4 py-2">
        <p className="text-[13px] text-[#6f6d69]">
          Machining 33.3 min/pc · setup 175 min/batch
        </p>
        <Flag tone="ok">On your rate card</Flag>
      </div>
      <RouteTable local={local} withTime />
    </Report>
  )
}

function CostLine({
  label,
  value,
  strong,
  style,
}: {
  label: string
  value: string
  strong?: boolean
  style?: CSSProperties
}) {
  return (
    <div
      className="flex items-center justify-between border-b border-[#f0ebe3] px-4 py-2.5 text-[16px]"
      style={style}
    >
      <span className={strong ? "font-medium" : undefined}>{label}</span>
      <span className="font-mono font-medium">{value}</span>
    </div>
  )
}

function Cost({ local }: { local: number }) {
  const lines = [
    ["Raw material", inr(540)],
    ["Direct machining", inr(855)],
    ["Heat treatment", inr(216)],
    ["Direct base", inr(1611)],
    ["Factory overhead", inr(360)],
    ["Tooling", inr(130)],
  ]
  return (
    <Report tab="Quote" subtitle="Cost build-up · machine-hour rates">
      <div className="mx-auto mt-4 w-[640px] border border-[#e0dbd2]">
        {lines.map((line, index) => (
          <CostLine
            key={line[0]}
            label={line[0]}
            value={line[1]}
            strong={line[0] === "Direct base"}
            style={rise(local, index * 220)}
          />
        ))}
        <div
          className="flex items-center justify-between bg-[#151515] px-4 py-3 text-white"
          style={rise(local, 1500)}
        >
          <span className="text-[16px]">Ex-works / piece</span>
          <span className="font-mono text-[22px] font-medium">
            {inr(PRICE)}
          </span>
        </div>
      </div>
    </Report>
  )
}

function Quote({ local }: { local: number }) {
  const edited = appear(local, 1400)
  const sent = appear(local, 2800)
  const grindMin = edited > 0.55 ? "7.2" : "9.0"
  const grindCost = edited > 0.55 ? inr(264) : inr(330)
  const price = edited > 0.55 ? TWEAKED : PRICE
  return (
    <div className="absolute inset-0">
      <Report tab="Quote" subtitle="QT-3091 · waiting on the estimator">
        <div className="grid h-full grid-cols-[1fr_300px]">
          <div className="border-r border-[#efeae2] p-4">
            <div className="flex items-start justify-between">
              <div>
                <p className="font-mono text-[12px] text-[#6f6d69]">QT-3091</p>
                <p className="mt-1 text-[20px] font-medium">
                  Helical pinion HG-1842 Rev B
                </p>
                <p className="mt-1 text-[14px] text-[#6f6d69]">
                  Vindhya Drives · 80 pcs · ex-works Indore
                </p>
              </div>
              <p className="font-mono text-[28px] font-medium">{inr(price)}</p>
            </div>
            <div
              className="mt-4 grid grid-cols-[1fr_80px_90px] border border-[#e7d3a4] bg-[#fbf6ea] px-3 py-2 text-[14px]"
              style={{
                outline:
                  edited > 0.2 && edited < 0.9
                    ? "2px solid #151515"
                    : undefined,
              }}
            >
              <span>Grind tooth flanks · gear grind</span>
              <span className="font-mono">{grindMin} min</span>
              <span className="text-right font-mono">{grindCost}</span>
            </div>
            <p
              className="mt-2 text-[13px] text-[#6f6d69]"
              style={{ opacity: edited }}
            >
              {edited > 0.55
                ? "A. Deshmukh set the grind to 7.2 min, from the last similar pinion."
                : "Estimator is on the grind cycle."}
            </p>
            <div
              className="mt-5 inline-flex bg-[#151515] px-4 py-2 text-[14px] font-medium text-white"
              style={{
                transform: sent > 0.2 && sent < 0.7 ? "scale(0.98)" : undefined,
              }}
            >
              {sent > 0.55 ? "Quote sent" : "Send quote"}
            </div>
          </div>
          <div className="p-4 text-[14px] leading-6">
            <AgentChip label="Drafted for review" />
            <p className="mt-4">To meera.joshi@vindhyadrives.example</p>
            <p className="mt-3">
              Hi Meera, quote QT-3091 is attached for HG-1842, 80 pieces. Lead
              time 5 weeks.
            </p>
          </div>
        </div>
      </Report>
      {edited < 0.85 ? (
        <Cursor x={760} y={250} press={edited > 0.25 && edited < 0.7} />
      ) : sent < 0.9 ? (
        <Cursor x={220} y={430} press={sent > 0.2 && sent < 0.65} />
      ) : null}
      {sent > 0.7 ? (
        <Toast
          title="Quote sent"
          detail={`QT-3091 · ${inr(TWEAKED)} / pc · Vindhya Drives`}
          style={rise(local, 3000)}
        />
      ) : null}
    </div>
  )
}

export function QuotingFilm({ t }: { t: number }) {
  return (
    <Frames
      t={t}
      scenes={[
        {
          id: "slate",
          start: 0,
          end: 700,
          node: <Slate kicker="Sample data" title="Quoting" />,
        },
        { id: "inbox", start: 700, end: 3600, node: <Inbox local={t - 700} /> },
        {
          id: "extract",
          start: 3600,
          end: 8600,
          node: <Extract local={t - 3600} />,
        },
        {
          id: "feasibility",
          start: 8600,
          end: 12400,
          node: <Feasibility local={t - 8600} />,
        },
        {
          id: "route",
          start: 12400,
          end: 16800,
          node: <Routing local={t - 12400} />,
        },
        {
          id: "cycle",
          start: 16800,
          end: 20600,
          node: <Cycle local={t - 16800} />,
        },
        {
          id: "cost",
          start: 20600,
          end: 24400,
          node: <Cost local={t - 20600} />,
        },
        {
          id: "quote",
          start: 24400,
          end: 29200,
          node: <Quote local={t - 24400} />,
        },
        {
          id: "end",
          start: 29200,
          end: 31200,
          node: (
            <EndCard
              kicker="Drawing in"
              title="Shop-ready quote out"
              detail="In hours, not days"
            />
          ),
        },
      ]}
    />
  )
}

export const quotingDuration = 31200
export const quotingPoster = 19000

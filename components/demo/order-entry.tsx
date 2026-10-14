import {
  AgentChip,
  CheckCard,
  Cursor,
  EndCard,
  Flag,
  Frames,
  Mail,
  MailRow,
  Sheet,
  Shell,
  Slate,
  Toast,
  appear,
  inr,
  rise,
} from "@/components/demo/kit"

const HOUSING = 7250
const SHAFT_PO = 3480
const SHAFT_QUOTE = 3885
const LIST = 4200
const TOTAL = 120 * HOUSING + 120 * SHAFT_PO
const DECCAN = 813600

function Inbox({ local }: { local: number }) {
  const decan = rise(local, 350)
  const sagar = rise(local, 900)
  const open = appear(local, 1500)
  return (
    <Mail
      count={appear(local, 900) > 0.6 ? 2 : appear(local, 350) > 0.6 ? 1 : 0}
      list={
        <>
          <div style={sagar}>
            <MailRow
              active
              from="Sagar Hydraulics"
              subject="PO 50817"
              preview="Releasing PO 50817 for impeller housings and pump shafts."
              time="9:42 AM"
            />
          </div>
          <div style={decan}>
            <MailRow
              from="Deccan Conveyors"
              subject="PO 77318"
              preview="PO attached for sprocket hubs and take-up brackets."
              time="9:41 AM"
            />
          </div>
          <MailRow
            from="Shipping"
            subject="Skids out on the 9:15 truck"
            preview="Tracking to follow this afternoon."
            time="9:20 AM"
          />
          <MailRow
            from="Front office"
            subject="Thursday walkthrough"
            preview="Moved to 2 pm so the second shift can join."
            time="8:47 AM"
          />
        </>
      }
      reader={
        <div className="px-8 py-6" style={{ opacity: open }}>
          <div className="flex items-center justify-between">
            <h3 className="text-[28px] font-medium tracking-[-0.02em]">
              PO 50817
            </h3>
            <AgentChip
              label="Order Entry · Reading the PO"
              style={rise(local, 1900)}
            />
          </div>
          <p className="mt-4 text-[14px] text-[#6f6d69]">
            From Meera Kulkarni · meera.kulkarni@sagarhydraulics.in · Today,
            9:42 AM
          </p>
          <p className="mt-6 max-w-[560px] text-[16px] leading-7">
            Releasing PO 50817 for 120 impeller housings and 120 pump shafts,
            per your latest quote. Please confirm the ship date.
          </p>
          <p className="mt-4 text-[16px] leading-7">
            Thanks,
            <br />
            Meera Kulkarni, Buyer
          </p>
          <div
            className="mt-6 inline-flex items-center gap-3 border border-[#e4dfd6] bg-white px-4 py-3"
            style={rise(local, 2300)}
          >
            <span className="bg-[#9f2d2d] px-2 py-1 font-mono text-[11px] text-white">
              PDF
            </span>
            <span className="text-[14px]">PO_50817.pdf · 1 page</span>
          </div>
        </div>
      }
    />
  )
}

function Reading({ local }: { local: number }) {
  return (
    <div className="absolute inset-0 flex items-center gap-8 bg-[#ece7df] px-10">
      <Sheet>
        <p className="font-mono text-[12px] tracking-[0.14em] text-[#6f6d69] uppercase">
          Purchase order
        </p>
        <div className="mt-2 flex items-baseline justify-between">
          <p className="text-[28px] font-semibold tracking-[-0.02em]">
            PO 50817
          </p>
          <p className="font-mono text-[12px] text-[#6f6d69]">14 Oct 2026</p>
        </div>
        <div className="mt-4 grid grid-cols-2 gap-4 text-[13px] leading-5">
          <div>
            <p className="font-mono text-[11px] tracking-[0.12em] text-[#6f6d69] uppercase">
              From
            </p>
            <p className="mt-1 font-medium">Sagar Hydraulics</p>
            <p>Chakan MIDC, Pune</p>
          </div>
          <div>
            <p className="font-mono text-[11px] tracking-[0.12em] text-[#6f6d69] uppercase">
              Ship to
            </p>
            <p className="mt-1 font-medium">Plant 2</p>
            <p>44 Foundry Road, Chakan</p>
          </div>
        </div>
        <p className="mt-4 font-mono text-[12px] text-[#6f6d69]">
          Net 30 · Blue Dart
        </p>
        <table className="mt-4 w-full text-left text-[13px]">
          <thead className="font-mono text-[11px] tracking-[0.08em] text-[#6f6d69] uppercase">
            <tr className="border-b border-[#e4dfd6]">
              <th className="py-2 font-medium">Part</th>
              <th className="py-2 font-medium">Description</th>
              <th className="py-2 font-medium">Qty</th>
              <th className="py-2 text-right font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr className="border-b border-[#f0ebe3]">
              <td className="py-2">HC-4410</td>
              <td className="py-2">Impeller housing</td>
              <td className="py-2">120</td>
              <td className="py-2 text-right">{inr(120 * HOUSING)}</td>
            </tr>
            <tr className="border-b border-[#f0ebe3]">
              <td className="py-2">HC-4412</td>
              <td className="py-2">Pump shaft, EN24</td>
              <td className="py-2">120</td>
              <td className="py-2 text-right">{inr(120 * SHAFT_PO)}</td>
            </tr>
          </tbody>
        </table>
        <div className="mt-3 flex justify-between text-[16px] font-medium">
          <span>Total</span>
          <span>{inr(TOTAL)}</span>
        </div>
        <p className="mt-4 text-[12px] text-[#6f6d69]">
          Buyer · Meera Kulkarni · Page 1 of 1
        </p>
      </Sheet>
      <div className="flex w-[420px] flex-col gap-3">
        <p className="font-mono text-[13px] tracking-[0.14em] text-[#6f6d69] uppercase">
          Reading the PO
        </p>
        <CheckCard
          kicker="Customer · SG-40217"
          title="Sagar Hydraulics"
          detail="Customer matched"
          tone="ok"
          style={rise(local, 400)}
        />
        <CheckCard
          kicker="Ship-to · ST-SG-02"
          title="Plant 2, 44 Foundry Road"
          detail="Ship-to on file"
          tone="ok"
          style={rise(local, 1100)}
        />
        <CheckCard
          kicker="Line 1 · HC-4410"
          title={`120 × ${inr(HOUSING)}`}
          detail="Matches the quote"
          tone="ok"
          style={rise(local, 1900)}
        />
        <CheckCard
          kicker="Line 2 · HC-4412"
          title={`120 × ${inr(SHAFT_PO)}`}
          detail={`Quote ${inr(SHAFT_QUOTE)} · Price off`}
          tone="bad"
          style={rise(local, 2700)}
        />
      </div>
    </div>
  )
}

function Board({ released, local }: { released?: boolean; local: number }) {
  const cards = [
    {
      po: "50817",
      when: "14 Oct · 9:42 AM",
      company: "Sagar Hydraulics",
      place: "Pune",
      lines: [
        "HC-4410 Impeller housing · qty 120",
        "HC-4412 Pump shaft, EN24 · qty 120",
      ],
      total: TOTAL,
      flag: "Price",
      tone: "bad" as const,
    },
    {
      po: "77318",
      when: "14 Oct · 9:41 AM",
      company: "Deccan Conveyors",
      place: "Coimbatore",
      lines: [
        "CV-2207 Drive sprocket hub · qty 60",
        "CV-2209 Take-up bracket · qty 120",
      ],
      total: DECCAN,
      flag: released ? "Released to the floor" : undefined,
      tone: "ok" as const,
    },
    {
      po: "19355",
      when: "13 Oct · 4:10 PM",
      company: "Coromandel Equipment",
      place: "Hosur",
      lines: [
        "GB-5128 Gearbox cover · qty 40",
        "GB-5124 Cover gasket · qty 40",
      ],
      total: 1248000,
      flag: undefined,
      tone: "ok" as const,
    },
    {
      po: "31877",
      when: "11 Oct · 3:18 PM",
      company: "Western Agri Parts",
      place: "Nashik",
      lines: ["AG-1180 Hitch pin bracket · qty 400"],
      total: 520000,
      flag: "Quantity",
      tone: "wait" as const,
    },
    {
      po: "22904",
      when: "11 Oct · 11:05 AM",
      company: "Lakshmi Packaging",
      place: "Rajkot",
      lines: ["PK-3302 Idler roller · qty 80"],
      total: 392000,
      flag: undefined,
      tone: "ok" as const,
    },
  ]
  return (
    <Shell
      section="Orders"
      subtitle="From the PO in the inbox to the sales order"
      aside={
        <div className="flex gap-2">
          <Count label="Invalid PO" n={2} />
          <Count label="Pending" n={released ? 1 : 2} />
          <Count label="Sales order submitted" n={released ? 2 : 1} />
        </div>
      }
    >
      <div className="grid grid-cols-3 gap-3">
        {cards.map((card, index) => (
          <article
            key={card.po}
            className="border border-[#e0dbd2] bg-white px-4 py-3"
            style={rise(local, index * 120)}
          >
            <div className="flex items-baseline justify-between">
              <p className="font-mono text-[13px]">{card.po}</p>
              <p className="font-mono text-[11px] text-[#6f6d69]">
                {card.when}
              </p>
            </div>
            <p className="mt-2 text-[16px] font-medium">{card.company}</p>
            <p className="text-[12px] text-[#6f6d69]">{card.place}</p>
            <div className="mt-3 space-y-1 text-[13px] text-[#3c3b39]">
              {card.lines.map((line) => (
                <p key={line}>{line}</p>
              ))}
            </div>
            <div className="mt-3 flex items-center justify-between">
              <p className="text-[15px] font-medium">{inr(card.total)}</p>
              {card.flag ? <Flag tone={card.tone}>{card.flag}</Flag> : null}
            </div>
          </article>
        ))}
      </div>
    </Shell>
  )
}

function Count({ label, n }: { label: string; n: number }) {
  return (
    <div className="border border-[#e0dbd2] bg-white px-3 py-2">
      <p className="font-mono text-[11px] tracking-[0.1em] text-[#6f6d69] uppercase">
        {label}
      </p>
      <p className="mt-1 text-[18px] font-medium">{n}</p>
    </div>
  )
}

function Mismatch({ local }: { local: number }) {
  return (
    <div className="absolute inset-0">
      <Board local={0} />
      <div className="absolute inset-0 bg-[#151515]/25" />
      <aside
        className="absolute top-0 right-0 bottom-0 w-[640px] overflow-hidden border-l border-[#e0dbd2] bg-white px-6 py-5"
        style={rise(local, 80)}
      >
        <div className="flex items-center justify-between">
          <p className="font-mono text-[13px]">50817 · Invalid PO</p>
          <Flag tone="bad">Price</Flag>
        </div>
        <p className="mt-2 text-[15px]">One line does not match the quote.</p>
        <div className="mt-4 border border-[#e4dfd6]">
          <Line
            part="HC-4410"
            name="Impeller housing"
            qty="120"
            price={inr(HOUSING, 2)}
            amount={inr(120 * HOUSING)}
          />
          <Line
            part="HC-4412"
            name="Pump shaft, EN24"
            qty="120"
            price={inr(SHAFT_PO, 2)}
            amount={inr(120 * SHAFT_PO)}
            bad
          />
        </div>
        <div
          className="mt-3 border border-[#e4b2a8] bg-[#f8e6e1] px-4 py-3"
          style={rise(local, 700)}
        >
          <p className="text-[14px] font-medium text-[#9f2d2d]">
            Price mismatch
          </p>
          <p className="mt-2 text-[14px] leading-6">
            List {inr(LIST, 2)}
            <br />
            Tier B (7.5% off) · expected {inr(SHAFT_QUOTE, 2)}
            <br />
            PO price {inr(SHAFT_PO, 2)} is {inr(SHAFT_QUOTE - SHAFT_PO, 2)}{" "}
            (10.4%) under
          </p>
        </div>
        <div className="mt-4" style={rise(local, 1400)}>
          <p className="font-mono text-[11px] tracking-[0.12em] text-[#6f6d69] uppercase">
            Draft reply
          </p>
          <p className="mt-2 text-[13px] text-[#6f6d69]">
            To meera.kulkarni@sagarhydraulics.in
          </p>
          <p className="mt-1 text-[14px] font-medium">RE: PO 50817</p>
          <p className="mt-2 text-[14px] leading-6">
            Hi Meera, thanks for PO 50817. HC-4412 is on the PO at{" "}
            {inr(SHAFT_PO, 2)}. Quote QT-1842 has {inr(SHAFT_QUOTE, 2)}. HC-4410
            matches. Could you send a revised PO, or confirm we should book the
            quoted price?
          </p>
        </div>
        <div
          className="mt-4 inline-flex bg-[#151515] px-4 py-2 text-[14px] font-medium text-white"
          style={{
            ...rise(local, 2200),
            transform:
              appear(local, 2500) > 0.8
                ? "scale(0.98)"
                : rise(local, 2200).transform,
          }}
        >
          {appear(local, 2600) > 0.5 ? "Reply sent" : "Send reply"}
        </div>
      </aside>
      {appear(local, 2400) > 0 ? (
        <Cursor
          x={980}
          y={560}
          press={appear(local, 2500) > 0.4 && appear(local, 2700) < 1}
        />
      ) : null}
      {appear(local, 2700) > 0 ? (
        <Toast
          title="Reply sent"
          detail="Sagar Hydraulics · PO 50817 held for the price"
          style={rise(local, 2700)}
        />
      ) : null}
    </div>
  )
}

function Line({
  part,
  name,
  qty,
  price,
  amount,
  bad,
}: {
  part: string
  name: string
  qty: string
  price: string
  amount: string
  bad?: boolean
}) {
  return (
    <div className="grid grid-cols-[1fr_auto] gap-2 border-b border-[#f0ebe3] px-3 py-2 text-[13px] last:border-b-0">
      <div>
        <p className="font-medium">
          {part} · {name}
        </p>
        <p className="text-[#6f6d69]">
          Qty {qty} · {price}
        </p>
      </div>
      <p className={bad ? "font-medium text-[#9f2d2d]" : "font-medium"}>
        {amount}
      </p>
    </div>
  )
}

function Ack({ local }: { local: number }) {
  const sent = appear(local, 2800)
  return (
    <div className="absolute inset-0">
      <Board local={0} />
      <div className="absolute inset-0 bg-[#151515]/25" />
      <aside className="absolute top-0 right-0 bottom-0 w-[640px] border-l border-[#e0dbd2] bg-white px-6 py-5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[13px]">77318 · Pending</p>
          <Flag tone="ok">Lines match</Flag>
        </div>
        <p className="mt-3 text-[14px] text-[#6f6d69]">
          To arjun.menon@deccanconveyors.in
        </p>
        <p className="mt-1 text-[18px] font-medium">RE: PO 77318</p>
        <div className="mt-3 inline-flex items-center gap-2 border border-[#e4dfd6] px-3 py-2 text-[13px]">
          <span className="bg-[#1c6b3c] px-1.5 py-0.5 font-mono text-[10px] text-white">
            PDF
          </span>
          Acknowledgment_77318_Deccan_Conveyors.pdf
        </div>
        <p className="mt-4 text-[15px] leading-7">
          Hi Arjun, thanks for PO 77318. We have entered it as a sales order.
          The acknowledgment is attached.
        </p>
        <p className="mt-3 text-[15px] leading-7">
          PO 77318 · Net 30 · Blue Dart · Lead time 3–4 weeks
        </p>
        <p className="mt-3 text-[15px] leading-7">
          We will write again when the order is released to the floor, and send
          tracking once it ships.
        </p>
        <p className="mt-3 text-[15px]">Best regards, A. Deshmukh</p>
        <div
          className="mt-5 inline-flex bg-[#151515] px-4 py-2 text-[14px] font-medium text-white"
          style={{
            transform: sent > 0.3 && sent < 0.8 ? "scale(0.98)" : undefined,
          }}
        >
          {sent > 0.55
            ? "Entered and sent"
            : "Enter order and send acknowledgment"}
        </div>
      </aside>
      {appear(local, 2000) > 0 && sent < 0.9 ? (
        <Cursor x={900} y={560} press={sent > 0.25 && sent < 0.7} />
      ) : null}
    </div>
  )
}

function Floor({ local }: { local: number }) {
  const started = appear(local, 1600)
  return (
    <div className="absolute inset-0 bg-[#1b1a18] text-[#f3efe7]">
      <header className="flex items-center justify-between border-b border-white/10 px-8 py-5">
        <div>
          <p className="font-mono text-[12px] tracking-[0.14em] text-[#f3efe7]/55 uppercase">
            CNC Lathe 2 · Operator terminal · First shift
          </p>
          <p className="mt-2 text-[28px] font-medium">
            WO-4471 · OP10 · Rough turn
          </p>
        </div>
        <p className="font-mono text-[13px] text-[#f3efe7]/70">
          {started > 0.5 ? "Started 10:14 AM" : "Queued"}
        </p>
      </header>
      <div className="grid grid-cols-[1.2fr_0.8fr] gap-6 px-8 py-6">
        <div className="border border-white/15 px-6 py-5">
          <p className="text-[14px] text-[#f3efe7]/65">
            Deccan Conveyors · PO 77318
          </p>
          <div className="mt-4 space-y-3 text-[18px]">
            <p>CV-2207 Drive sprocket hub · 60 pcs</p>
            <p>CV-2209 Take-up bracket · 120 pcs</p>
          </div>
          <p className="mt-6 text-[15px] text-[#f3efe7]/70">
            Material staged · EN24 bar · setup sheet on the clipboard
          </p>
        </div>
        <div className="flex flex-col items-start justify-center">
          <div
            className="bg-[#f3efe7] px-8 py-4 text-[22px] font-medium text-[#151515]"
            style={{
              transform:
                started > 0.2 && started < 0.6 ? "scale(0.98)" : undefined,
            }}
          >
            {started > 0.55 ? "Job started" : "Start job"}
          </div>
          <p className="mt-4 text-[14px] text-[#f3efe7]/60">
            {started > 0.55
              ? "Cycle running on Lathe 2."
              : "Released from order entry."}
          </p>
        </div>
      </div>
      {appear(local, 900) > 0 && started < 0.85 ? (
        <Cursor x={860} y={360} press={started > 0.2 && started < 0.55} />
      ) : null}
    </div>
  )
}

export function OrderEntryFilm({ t }: { t: number }) {
  return (
    <Frames
      t={t}
      scenes={[
        {
          id: "slate",
          start: 0,
          end: 800,
          node: <Slate kicker="Sample data" title="Order entry" />,
        },
        { id: "inbox", start: 800, end: 4600, node: <Inbox local={t - 800} /> },
        {
          id: "read",
          start: 4600,
          end: 10000,
          node: <Reading local={t - 4600} />,
        },
        {
          id: "board",
          start: 10000,
          end: 13200,
          node: <Board local={t - 10000} />,
        },
        {
          id: "mismatch",
          start: 13200,
          end: 19600,
          node: <Mismatch local={t - 13200} />,
        },
        {
          id: "ack",
          start: 19600,
          end: 25200,
          node: <Ack local={t - 19600} />,
        },
        {
          id: "released",
          start: 25200,
          end: 28600,
          node: <Board released local={t - 25200} />,
        },
        {
          id: "floor",
          start: 28600,
          end: 32800,
          node: <Floor local={t - 28600} />,
        },
        {
          id: "end",
          start: 32800,
          end: 36000,
          node: (
            <EndCard
              kicker="Sent to the floor"
              title="Production started"
              detail="PO 77318 · Deccan Conveyors · Lathe 2"
            />
          ),
        },
      ]}
    />
  )
}

export const orderEntryDuration = 36000
export const orderEntryPoster = 15000

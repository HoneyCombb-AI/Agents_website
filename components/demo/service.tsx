import {
  AgentChip,
  CheckCard,
  Cursor,
  EndCard,
  Flag,
  Frames,
  Shell,
  Slate,
  appear,
  rise,
} from "@/components/demo/kit"

const tickets = [
  ["TKT-2026-0240", "Seal kit spec, 4-inch housing", "Resolved"],
  ["TKT-2026-0239", "Revision check on 60 brackets", "Resolved"],
  ["TKT-2026-0238", "Quote follow-up on 500 hubs", "Resolved"],
  ["TKT-2026-0237", "Material certs for PO 41590", "Resolved"],
]

function List({ fresh }: { fresh?: "open" | "resolved" }) {
  const rows = [
    {
      id: "TKT-2026-0241",
      title: "Requesting an update on PO 44188",
      status:
        fresh === "open" ? "Open" : fresh === "resolved" ? "Resolved" : null,
    },
    ...tickets.map(([id, title, status]) => ({ id, title, status })),
  ].filter((row) => row.status)
  return (
    <Shell
      section="Customer service"
      subtitle="Manage customer support inquiries and email conversations"
    >
      <div className="h-full border border-[#e0dbd2] bg-white">
        <div className="grid grid-cols-[180px_1fr_140px] border-b border-[#e0dbd2] bg-[#f7f4ee] px-4 py-2 font-mono text-[11px] tracking-[0.1em] text-[#6f6d69] uppercase">
          <span>Ticket</span>
          <span>Subject</span>
          <span>Status</span>
        </div>
        {rows.map((row) => (
          <div
            key={row.id}
            className="grid grid-cols-[180px_1fr_140px] items-center border-b border-[#efeae2] px-4 py-3 text-[15px]"
          >
            <span className="font-mono text-[13px]">{row.id}</span>
            <span className="font-medium">{row.title}</span>
            <Flag tone={row.status === "Open" ? "bad" : "ok"}>
              {row.status}
            </Flag>
          </div>
        ))}
      </div>
    </Shell>
  )
}

function Arrive({ local }: { local: number }) {
  return (
    <div className="absolute inset-0">
      <List />
      <aside
        className="absolute top-20 right-8 w-[460px] border border-[#e0dbd2] bg-white p-5 shadow-[0_18px_50px_rgba(21,21,21,0.12)]"
        style={rise(local, 150)}
      >
        <div className="flex items-center justify-between">
          <Flag tone="bad">High · Open</Flag>
          <span className="font-mono text-[12px]">TKT-2026-0241</span>
        </div>
        <p className="mt-3 text-[20px] font-medium">
          Requesting an update on PO 44188
        </p>
        <p className="mt-2 text-[15px] text-[#6f6d69]">
          Leela Menon · Narmada Pumps · 6:48 AM
        </p>
      </aside>
    </div>
  )
}

function Finding({ local }: { local: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#efeae2]">
      <div className="grid w-[1080px] grid-cols-2 gap-4">
        <div className="border border-[#d9d3c8] bg-white p-5">
          <p className="font-mono text-[12px] tracking-[0.12em] text-[#6f6d69] uppercase">
            The mail
          </p>
          <p className="mt-3 text-[18px] font-medium">
            Hi, could you send an update on PO 44188?
          </p>
          <p className="mt-3 text-[15px] leading-6 text-[#3c3a36]">
            The pump housings are scheduled into a rebuild Friday morning, and
            we would like to confirm timing. Thank you, Leela.
          </p>
        </div>
        <div className="space-y-3">
          <CheckCard
            kicker="Order"
            title="PO 44188 · PH-2210 × 120"
            detail="Needed Fri 17 Oct"
            tone="ok"
            style={rise(local, 200)}
          />
          <CheckCard
            kicker="Shipped"
            title="Monday · all 120"
            detail="Left the dock"
            tone="ok"
            style={rise(local, 1100)}
          />
          <CheckCard
            kicker="Carrier"
            title="Blue Dart 4821 3377 0915"
            detail="Due Thursday, a full day early"
            tone="ok"
            style={rise(local, 2000)}
          />
        </div>
      </div>
    </div>
  )
}

function Ticket({ local }: { local: number }) {
  const draft = appear(local, 400)
  const sent = appear(local, 5200)
  return (
    <div className="absolute inset-0 flex bg-white">
      <div className="w-[420px] border-r border-[#e4dfd6] p-5">
        <div className="flex items-center justify-between">
          <p className="font-mono text-[12px]">TKT-2026-0241</p>
          <Flag tone={sent > 0.6 ? "ok" : "bad"}>
            {sent > 0.6 ? "Resolved" : "High · Open"}
          </Flag>
        </div>
        <h3 className="mt-3 text-[22px] font-medium">
          Requesting an update on PO 44188
        </h3>
        <div className="mt-5 border border-[#e4dfd6] p-4">
          <p className="font-mono text-[11px] tracking-[0.12em] text-[#6f6d69] uppercase">
            Related order
          </p>
          <p className="mt-2 text-[16px] font-medium">PO 44188</p>
          <p className="mt-1 text-[14px]">PH-2210 pump housings (120)</p>
          <p className="mt-2 text-[14px]">Needed Fri 17 Oct</p>
          <p className="mt-1 text-[14px] text-[#1c6b3c]">
            Shipped Mon · all 120
          </p>
          <p className="mt-1 font-mono text-[13px]">Tracking 4821 3377 0915</p>
        </div>
      </div>
      <div className="min-w-0 flex-1 p-6">
        <p className="font-mono text-[12px] tracking-[0.12em] text-[#6f6d69] uppercase">
          Thread
        </p>
        <p className="mt-2 text-[14px] text-[#6f6d69]">
          Received 13 Oct, 6:48 AM · leela.menon@narmadapumps.in
        </p>
        <p className="mt-3 max-w-[560px] text-[16px] leading-7">
          Hi, could you send an update on PO 44188? The pump housings are
          scheduled into a rebuild Friday morning, and we would like to confirm
          timing. Thank you, Leela.
        </p>
        <div
          className="mt-5 max-w-[560px] border border-[#e4dfd6] p-4"
          style={{ opacity: draft }}
        >
          <div className="flex items-center justify-between">
            <AgentChip
              label={
                sent > 0.6 ? "Sent by A. Deshmukh" : "Waiting on your review"
              }
            />
          </div>
          <p className="mt-3 text-[16px] leading-7">
            Hi Leela, good news for Friday. PO 44188 shipped Monday, all 120
            housings. It is on the truck now (tracking 4821 3377 0915) and due
            at your dock Thursday, a full day before the rebuild. I will watch
            it in.
          </p>
          <div
            className="mt-4 inline-flex bg-[#151515] px-4 py-2 text-[14px] font-medium text-white"
            style={{
              transform: sent > 0.2 && sent < 0.7 ? "scale(0.98)" : undefined,
            }}
          >
            {sent > 0.55 ? "Reply sent" : "Send reply"}
          </div>
        </div>
      </div>
      {draft > 0.5 && sent < 0.9 ? (
        <Cursor x={620} y={620} press={sent > 0.2 && sent < 0.65} />
      ) : null}
    </div>
  )
}

export function ServiceFilm({ t }: { t: number }) {
  return (
    <Frames
      t={t}
      scenes={[
        {
          id: "slate",
          start: 0,
          end: 700,
          node: <Slate kicker="Sample data" title="Customer service" />,
        },
        { id: "list", start: 700, end: 2800, node: <List /> },
        {
          id: "arrive",
          start: 2800,
          end: 5200,
          node: <Arrive local={t - 2800} />,
        },
        {
          id: "find",
          start: 5200,
          end: 11000,
          node: <Finding local={t - 5200} />,
        },
        {
          id: "ticket",
          start: 11000,
          end: 19000,
          node: <Ticket local={t - 11000} />,
        },
        {
          id: "closed",
          start: 19000,
          end: 23000,
          node: <List fresh="resolved" />,
        },
        {
          id: "end",
          start: 23000,
          end: 27200,
          node: (
            <EndCard
              kicker="Reply sent to Narmada Pumps"
              title="TKT-2026-0241 · Resolved"
              detail="PO 44188 due Thursday, a day early"
            />
          ),
        },
      ]}
    />
  )
}

export const serviceDuration = 27200
export const servicePoster = 15000

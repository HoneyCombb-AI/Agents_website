import {
  AgentChip,
  Cursor,
  EndCard,
  Flag,
  Frames,
  Mail,
  MailRow,
  Shell,
  Slate,
  appear,
  inr,
  rise,
} from "@/components/demo/kit"

function InboxScene() {
  return (
    <Mail
      count={2}
      list={
        <>
          <MailRow
            from="Hemant Bearings"
            subject="Invoice HBS-20418 · PO-2026-031"
            preview="120 tapered roller bearings, shipped 29 Sep"
            time="9:42 AM"
            active
          />
          <MailRow
            from="Receiving"
            subject="PO-2026-031 received"
            preview="Bearings checked in at dock 2"
            time="9:18 AM"
          />
        </>
      }
      reader={
        <div className="px-7 py-6">
          <p className="text-[14px] text-[#6f6d69]">
            Hemant Bearing Supply · ar@hemantbearings.in
          </p>
          <p className="mt-2 text-[22px] font-medium">
            Invoice HBS-20418 · PO-2026-031
          </p>
          <p className="mt-4 max-w-[520px] text-[16px] leading-7">
            Please find invoice HBS-20418 attached for PO-2026-031: 120 tapered
            roller bearings, shipped 29 September. Terms Net 30.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 border border-[#e4dfd6] px-3 py-2 text-[14px]">
            <span className="bg-[#9f2d2d] px-1.5 py-0.5 font-mono text-[10px] text-white">
              PDF
            </span>
            Invoice_HBS-20418.pdf
          </div>
        </div>
      }
    />
  )
}

function Reading({ local }: { local: number }) {
  const fields = [
    ["Vendor", "Hemant Bearing Supply"],
    ["Invoice", "HBS-20418"],
    ["PO", "PO-2026-031"],
    ["Qty", "120"],
    ["Unit price", inr(4100)],
    ["Total", inr(492000)],
  ]
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#efeae2]">
      <div className="grid w-[1000px] grid-cols-[1fr_360px] gap-6">
        <div className="border border-[#d9d3c8] bg-white p-6">
          <p className="font-mono text-[12px] tracking-[0.14em] text-[#6f6d69] uppercase">
            Hemant Bearing Supply
          </p>
          <h3 className="mt-2 text-[32px] font-medium">Invoice</h3>
          <p className="mt-3 text-[28px] font-medium">{inr(492000)}</p>
          <p className="mt-1 text-[14px] text-[#6f6d69]">Total due</p>
        </div>
        <div>
          <p className="mb-3 font-mono text-[12px] tracking-[0.12em] text-[#6f6d69] uppercase">
            Reading the invoice
          </p>
          <div className="space-y-2">
            {fields.map((field, index) => (
              <div
                key={field[0]}
                className="flex justify-between border border-[#e0dbd2] bg-white px-3 py-2 text-[14px]"
                style={rise(local, index * 220)}
              >
                <span className="text-[#6f6d69]">{field[0]}</span>
                <span className="font-medium">{field[1]}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Column({
  title,
  price,
  qty,
  tone,
  extra,
}: {
  title: string
  price: string
  qty: string
  tone: "ok" | "bad"
  extra?: string
}) {
  return (
    <div className="border border-[#e0dbd2] bg-white p-4">
      <p className="font-mono text-[11px] tracking-[0.1em] text-[#6f6d69] uppercase">
        {title}
      </p>
      <p className="mt-3 text-[16px] font-medium">Tapered roller bearing</p>
      <p className="mt-1 text-[14px] text-[#6f6d69]">2.50 in bore</p>
      <p className="mt-3 text-[15px]">{qty}</p>
      <p
        className="mt-2 text-[18px] font-medium"
        style={{ color: tone === "bad" ? "#9f2d2d" : "#151515" }}
      >
        {price}
      </p>
      {extra ? (
        <p className="mt-2 text-[14px] font-medium text-[#9f2d2d]">{extra}</p>
      ) : null}
    </div>
  )
}

function Match({
  local,
  conflict,
  revised,
}: {
  local: number
  conflict?: boolean
  revised?: boolean
}) {
  const cols = appear(local, conflict || revised ? 0 : 900)
  const approved = appear(local, revised ? 2200 : 99999)
  return (
    <Shell
      section="PO-2026-031"
      subtitle={
        revised
          ? "Hemant Bearing Supply · HBS-20418-1"
          : "Hemant Bearing Supply · HBS-20418"
      }
      aside={
        conflict ? (
          <Flag tone="bad">Mismatch</Flag>
        ) : revised ? (
          <Flag tone={approved > 0.6 ? "ok" : "wait"}>
            {approved > 0.6 ? "Approved" : "Pending approval"}
          </Flag>
        ) : (
          <AgentChip label="Running the 3-way match" />
        )
      }
    >
      <div className="mb-3 flex items-end justify-between">
        <div>
          <p className="text-[15px] text-[#6f6d69]">
            {revised
              ? "HBS-20418-1 supersedes HBS-20418"
              : "Against the PO and the packing slip"}
          </p>
          {conflict ? (
            <p className="mt-1 text-[15px] font-medium text-[#9f2d2d]">
              Price variance: PO shows {inr(3850)}/unit, invoice shows{" "}
              {inr(4100)}/unit (+{inr(30000)} total)
            </p>
          ) : revised ? (
            <p className="mt-1 text-[15px] font-medium text-[#1c6b3c]">
              Three-way match verified
            </p>
          ) : null}
        </div>
        <div className="text-right">
          <p className="text-[20px] font-medium">
            {revised ? inr(462000) : inr(492000)}
          </p>
          <p className="text-[13px] text-[#6f6d69]">Due 1 Nov 2026</p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-3" style={{ opacity: cols }}>
        <Column
          title="Purchase order"
          qty="Qty 120 @ ₹3,850"
          price={inr(462000)}
          tone="ok"
        />
        <Column
          title="Vendor invoice"
          qty={revised ? "Qty 120 @ ₹3,850" : "Qty 120 @ ₹4,100"}
          price={revised ? inr(462000) : inr(492000)}
          tone={conflict ? "bad" : "ok"}
          extra={conflict ? `+${inr(30000)}` : undefined}
        />
        <Column
          title="Packing slip"
          qty="Received 120"
          price="Dock 2"
          tone="ok"
        />
      </div>
      {revised ? (
        <div
          className="mt-4 flex gap-2"
          style={{ opacity: appear(local, 1200) }}
        >
          <div className="border border-[#e0dbd2] px-4 py-2 text-[14px]">
            Reject
          </div>
          <div
            className="bg-[#151515] px-4 py-2 text-[14px] font-medium text-white"
            style={{
              transform:
                approved > 0.2 && approved < 0.7 ? "scale(0.98)" : undefined,
            }}
          >
            {approved > 0.55 ? "Approved" : "Approve"}
          </div>
        </div>
      ) : null}
      {revised && appear(local, 1400) > 0 && approved < 0.9 ? (
        <Cursor x={280} y={560} press={approved > 0.15 && approved < 0.6} />
      ) : null}
    </Shell>
  )
}

function Dispute() {
  return (
    <Mail
      count={1}
      list={
        <MailRow
          from="Draft"
          subject="Invoice discrepancy · HBS-20418"
          preview="To ar@hemantbearings.in"
          time="9:51 AM"
          active
        />
      }
      reader={
        <div className="px-7 py-6">
          <AgentChip label="Drafted by your AP/AR agent" />
          <p className="mt-4 text-[14px] text-[#6f6d69]">
            To ar@hemantbearings.in
          </p>
          <p className="mt-2 text-[20px] font-medium">
            Invoice discrepancy · HBS-20418 (PO-2026-031)
          </p>
          <div className="mt-4 max-w-[560px] text-[16px] leading-7">
            <p>Hi Hemant team,</p>
            <p className="mt-3">
              Thank you for invoice HBS-20418 against PO-2026-031 for{" "}
              {inr(492000)}. Our three-way match found a price that needs
              clarification before we can approve payment.
            </p>
            <p className="mt-3">
              Price variance: PO shows {inr(3850)}/unit, invoice shows{" "}
              {inr(4100)}/unit (+{inr(30000)} total).
            </p>
            <p className="mt-3">
              Could you confirm the correct price, or send a corrected invoice?
            </p>
            <p className="mt-3">M. Ruiz</p>
          </div>
        </div>
      }
    />
  )
}

function ReplyIn() {
  return (
    <Mail
      count={2}
      list={
        <>
          <MailRow
            from="Hemant Bearings"
            subject="Re: Invoice HBS-20418 · revised"
            preview="Please find the corrected invoice attached"
            time="Now"
            active
          />
          <MailRow
            from="Receiving"
            subject="PO-2026-031 received"
            preview="Bearings checked in at dock 2"
            time="9:18 AM"
          />
        </>
      }
      reader={
        <div className="px-7 py-6">
          <Flag tone="wait">Revised invoice received</Flag>
          <p className="mt-4 text-[18px] font-medium">
            HBS-20418-1 supersedes HBS-20418
          </p>
          <p className="mt-2 text-[15px] text-[#6f6d69]">
            Dispute sent to ar@hemantbearings.in by M. Ruiz
          </p>
        </div>
      }
    />
  )
}

const bills = [
  ["Corley Steel", inr(621000), "CSS-7731", "mismatch"],
  ["Hemant Bearings", inr(462000), "HBS-20418-1", "pending"],
  ["Granite Castings", inr(980000), "GVC-3304", "pay"],
  ["Benton Fastener", inr(218400), "BFC-1187", "pay"],
  ["Marlow Heat Treat", inr(345000), "MHT-5520", "pending"],
]

function Board({ moved }: { moved?: boolean }) {
  const columns = [
    {
      title: "Mismatch",
      tone: "bad" as const,
      items: bills.filter((bill) => bill[3] === "mismatch"),
    },
    {
      title: "Pending approval",
      tone: "wait" as const,
      items: bills.filter((bill) =>
        moved
          ? bill[3] === "pending" && bill[0] !== "Hemant Bearings"
          : bill[3] === "pending"
      ),
    },
    {
      title: "Scheduled for payment",
      tone: "ok" as const,
      items: bills.filter((bill) =>
        moved
          ? bill[3] === "pay" || bill[0] === "Hemant Bearings"
          : bill[3] === "pay"
      ),
    },
  ]
  return (
    <Shell
      section="Accounts payable"
      subtitle="Three-way match vendor invoices before payment"
    >
      <div className="grid h-full grid-cols-3 gap-3">
        {columns.map((column) => (
          <div key={column.title} className="border border-[#e0dbd2] bg-white">
            <div className="flex items-center justify-between border-b border-[#efeae2] px-3 py-2">
              <Flag tone={column.tone}>{column.title}</Flag>
              <span className="font-mono text-[12px]">
                {column.items.length}
              </span>
            </div>
            {column.items.map((item) => (
              <div
                key={item[2]}
                className="border-b border-[#efeae2] px-3 py-3"
              >
                <p className="text-[15px] font-medium">{item[0]}</p>
                <p className="mt-1 text-[14px]">{item[1]}</p>
                <p className="mt-1 font-mono text-[12px] text-[#6f6d69]">
                  {item[2]}
                </p>
              </div>
            ))}
          </div>
        ))}
      </div>
    </Shell>
  )
}

export function ApArFilm({ t }: { t: number }) {
  return (
    <Frames
      t={t}
      scenes={[
        {
          id: "slate",
          start: 0,
          end: 700,
          node: <Slate kicker="Sample data" title="AP/AR" />,
        },
        { id: "inbox", start: 700, end: 3400, node: <InboxScene /> },
        {
          id: "read",
          start: 3400,
          end: 6200,
          node: <Reading local={t - 3400} />,
        },
        {
          id: "run",
          start: 6200,
          end: 9800,
          node: <Match local={t - 6200} />,
        },
        {
          id: "conflict",
          start: 9800,
          end: 14000,
          node: <Match local={t - 9800} conflict />,
        },
        { id: "mail", start: 14000, end: 18000, node: <Dispute /> },
        { id: "reply", start: 18000, end: 21000, node: <ReplyIn /> },
        {
          id: "revised",
          start: 21000,
          end: 25000,
          node: <Match local={t - 21000} revised />,
        },
        {
          id: "board",
          start: 25000,
          end: 26800,
          node: <Board />,
        },
        {
          id: "moved",
          start: 26800,
          end: 28600,
          node: <Board moved />,
        },
        {
          id: "end",
          start: 28600,
          end: 30000,
          node: (
            <EndCard
              kicker="Scheduled for payment"
              title="Hemant Bearings · HBS-20418-1"
              detail={`${inr(462000)} · approved by M. Ruiz`}
            />
          ),
        },
      ]}
    />
  )
}

export const apArDuration = 30000
export const apArPoster = 11000

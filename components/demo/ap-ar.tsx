import {
  CheckCard,
  Cursor,
  EndCard,
  Flag,
  Frames,
  Shell,
  Slate,
  Toast,
  appear,
  inr,
  rise,
} from "@/components/demo/kit"

const INVOICE = 813600

function Invoice({ local }: { local: number }) {
  return (
    <Shell section="AP/AR" subtitle="What shipped, drafted as an invoice">
      <div className="grid grid-cols-[1.1fr_0.9fr] gap-4">
        <div
          className="border border-[#e0dbd2] bg-white px-6 py-5"
          style={rise(local, 150)}
        >
          <p className="font-mono text-[12px] tracking-[0.12em] text-[#6f6d69] uppercase">
            Draft invoice · INV-2291
          </p>
          <p className="mt-2 text-[24px] font-medium">Deccan Conveyors</p>
          <p className="mt-1 text-[14px] text-[#6f6d69]">
            Against SO-4418 · PO 77318 · Net 30
          </p>
          <div className="mt-4 space-y-2 border-t border-[#e4dfd6] pt-3 text-[15px]">
            <div className="flex justify-between">
              <span>CV-2207 Drive sprocket hub · 60</span>
              <span>{inr(384000)}</span>
            </div>
            <div className="flex justify-between">
              <span>CV-2209 Take-up bracket · 120</span>
              <span>{inr(429600)}</span>
            </div>
            <div className="flex justify-between border-t border-[#e4dfd6] pt-2 font-medium">
              <span>Total</span>
              <span>{inr(INVOICE)}</span>
            </div>
          </div>
          <p className="mt-3 text-[13px] text-[#1c6b3c]">
            Shipment matches the sales order. GST as on the customer master.
          </p>
        </div>
        <div className="space-y-3">
          <div
            className="border border-[#e4b2a8] bg-[#f8e6e1] px-4 py-4"
            style={rise(local, 600)}
          >
            <p className="font-mono text-[12px] tracking-[0.1em] text-[#9f2d2d] uppercase">
              Late
            </p>
            <p className="mt-2 text-[18px] font-medium">Western Agri Parts</p>
            <p className="mt-1 text-[14px] text-[#9f2d2d]">
              INV-2204 · {inr(640000)} · 18 days past terms
            </p>
          </div>
          <CheckCard
            kicker="Ready to raise"
            title={inr(INVOICE)}
            detail="Deccan · due 13 Nov"
            tone="ok"
            style={rise(local, 1100)}
          />
        </div>
      </div>
    </Shell>
  )
}

function Match({ local }: { local: number }) {
  const approved = appear(local, 2400)
  return (
    <Shell section="AP/AR" subtitle="Supplier bill against the purchase order">
      <div className="grid grid-cols-[1fr_1fr_280px] gap-3">
        <div className="border border-[#e0dbd2] bg-white px-4 py-4">
          <p className="font-mono text-[12px] text-[#6f6d69]">
            PO 44190 · Special Steels
          </p>
          <p className="mt-3 text-[15px]">
            EN24 bar · 40 lengths · {inr(486000)}
          </p>
          <p className="mt-2 text-[15px] text-[#6f6d69]">
            Freight not on the PO
          </p>
        </div>
        <div className="border border-[#e0dbd2] bg-white px-4 py-4">
          <p className="font-mono text-[12px] text-[#6f6d69]">Bill SI-8831</p>
          <p className="mt-3 text-[15px]">
            EN24 bar · 40 lengths · {inr(486000)}
          </p>
          <p className="mt-2 text-[15px] text-[#9f2d2d]">
            Freight {inr(2400)} extra
          </p>
        </div>
        <div className="flex flex-col gap-3">
          <Flag tone="bad">Freight off</Flag>
          <p className="text-[14px] leading-6">
            The metal matches. The {inr(2400)} freight does not. Held for
            accounts.
          </p>
          <div className="mt-auto bg-[#151515] px-3 py-2 text-center text-[14px] font-medium text-white">
            {approved > 0.5 ? "Match approved" : "Approve the match"}
          </div>
        </div>
      </div>
      {appear(local, 1400) > 0 && approved < 0.9 ? (
        <Cursor x={1040} y={430} press={approved > 0.15 && approved < 0.5} />
      ) : null}
      {approved > 0.65 ? (
        <Toast
          title="Match approved"
          detail={`Metal booked · freight ${inr(2400)} left for accounts`}
          style={rise(local, 2600)}
        />
      ) : null}
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
          end: 800,
          node: <Slate kicker="Sample data" title="AP/AR" />,
        },
        {
          id: "invoice",
          start: 800,
          end: 5200,
          node: <Invoice local={t - 800} />,
        },
        {
          id: "match",
          start: 5200,
          end: 9800,
          node: <Match local={t - 5200} />,
        },
        {
          id: "end",
          start: 9800,
          end: 12600,
          node: (
            <EndCard
              kicker="INV-2291 drafted"
              title="Books updated"
              detail={`Deccan ${inr(INVOICE)} · Western Agri 18 days late`}
            />
          ),
        },
      ]}
    />
  )
}

export const apArDuration = 12600
export const apArPoster = 3000

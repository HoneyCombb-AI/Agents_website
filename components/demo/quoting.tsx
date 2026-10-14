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
const SHAFT = 3885

function Inbox({ local }: { local: number }) {
  return (
    <Mail
      count={2}
      list={
        <>
          <div style={rise(local, 400)}>
            <MailRow
              active
              from="Sagar Hydraulics"
              subject="RFQ · impeller housing and shaft"
              preview="Drawing HC-4410 Rev D and HC-4412, qty 120 each."
              time="8:16 AM"
            />
          </div>
          <MailRow
            from="Shakti Gears"
            subject="RFQ · pinion blank"
            preview="Qty 400, EN353, Ichalkaranji."
            time="7:52 AM"
          />
          <MailRow
            from="Estimating"
            subject="Rate card, October"
            preview="VMC rate held at ₹2,400 an hour."
            time="Yesterday"
          />
        </>
      }
      reader={
        <div className="px-8 py-6" style={{ opacity: appear(local, 900) }}>
          <div className="flex items-center justify-between gap-4">
            <h3 className="text-[26px] font-medium tracking-[-0.02em]">
              RFQ from Sagar Hydraulics
            </h3>
            <AgentChip
              label="Quoting · Reading the RFQ"
              style={rise(local, 1400)}
            />
          </div>
          <p className="mt-4 text-[14px] text-[#6f6d69]">
            Anjali Shah · anjali.shah@sagarhydraulics.in
          </p>
          <p className="mt-5 max-w-[560px] text-[16px] leading-7">
            Please quote 120 off HC-4410 impeller housing, FG 260, and 120 off
            HC-4412 pump shaft, EN24. Drawings attached. Need a ship promise
            with the price.
          </p>
          <div className="mt-5 inline-flex items-center gap-3 border border-[#e4dfd6] bg-white px-4 py-3">
            <span className="bg-[#151515] px-2 py-1 font-mono text-[11px] text-white">
              PDF
            </span>
            <span className="text-[14px]">HC-4410_RevD.pdf · HC-4412.pdf</span>
          </div>
        </div>
      }
    />
  )
}

function Estimate({ local }: { local: number }) {
  const rows = [
    ["Face and bore", "28 min", inr(1120)],
    ["Drill and tap, 6 holes", "12 min", inr(480)],
    ["FG 260 casting, 6.2 kg", "—", inr(5280)],
    ["Setup, spread over 120", "—", inr(370)],
  ]
  return (
    <div className="absolute inset-0 flex items-center gap-8 bg-[#ece7df] px-10">
      <Sheet width={600}>
        <p className="font-mono text-[12px] tracking-[0.14em] text-[#6f6d69] uppercase">
          Estimate · QT-1842
        </p>
        <p className="mt-2 text-[26px] font-medium">HC-4410 Impeller housing</p>
        <p className="mt-1 text-[14px] text-[#6f6d69]">
          Sagar Hydraulics · qty 120 · FG 260
        </p>
        <table className="mt-4 w-full text-left text-[14px]">
          <tbody>
            {rows.map((row, index) => (
              <tr
                key={row[0]}
                className="border-b border-[#f0ebe3]"
                style={rise(local, 300 + index * 350)}
              >
                <td className="py-2">{row[0]}</td>
                <td className="py-2 text-[#6f6d69]">{row[1]}</td>
                <td className="py-2 text-right font-medium">{row[2]}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-3 flex justify-between text-[18px] font-medium">
          <span>Piece price</span>
          <span>{inr(HOUSING)}</span>
        </div>
        <p className="mt-2 text-[13px] text-[#6f6d69]">
          Machine rate ₹2,400 / hour · the rate your estimators use
        </p>
      </Sheet>
      <div className="flex w-[400px] flex-col gap-3">
        <p className="font-mono text-[13px] tracking-[0.14em] text-[#6f6d69] uppercase">
          Pricing the job
        </p>
        <CheckCard
          kicker="Drawing"
          title="HC-4410 Rev D"
          detail="Geometry read"
          tone="ok"
          style={rise(local, 500)}
        />
        <CheckCard
          kicker="Material"
          title="FG 260 · 6.2 kg"
          detail="On the rate card"
          tone="ok"
          style={rise(local, 1200)}
        />
        <CheckCard
          kicker="Shaft · HC-4412"
          title={`${inr(SHAFT)} a piece`}
          detail="List ₹4,200 · Tier B, 7.5% off"
          tone="ok"
          style={rise(local, 2000)}
        />
        <CheckCard
          kicker="Lot of 120"
          title={inr(120 * HOUSING + 120 * SHAFT)}
          detail="Quote QT-1842 drafted"
          tone="ok"
          style={rise(local, 2800)}
        />
      </div>
    </div>
  )
}

function QuoteMail({ local }: { local: number }) {
  const sent = appear(local, 2400)
  return (
    <Shell
      section="Quoting"
      subtitle="Draft sitting in the inbox, ready for a check"
    >
      <div className="grid h-full grid-cols-[1fr_420px] gap-4">
        <div className="border border-[#e0dbd2] bg-white px-6 py-5">
          <p className="font-mono text-[12px] tracking-[0.12em] text-[#6f6d69] uppercase">
            Draft quote
          </p>
          <p className="mt-3 text-[14px] text-[#6f6d69]">
            To anjali.shah@sagarhydraulics.in
          </p>
          <p className="mt-1 text-[20px] font-medium">RE: RFQ · QT-1842</p>
          <p className="mt-4 text-[15px] leading-7" style={rise(local, 200)}>
            Hi Anjali, quote QT-1842 is attached. HC-4410 impeller housing{" "}
            {inr(HOUSING)} each. HC-4412 pump shaft {inr(SHAFT)} each. Qty 120.
            Lead time 3 weeks from the PO. Valid 30 days.
          </p>
          <div className="mt-4 inline-flex items-center gap-2 border border-[#e4dfd6] px-3 py-2 text-[13px]">
            <span className="bg-[#c66a28] px-1.5 py-0.5 font-mono text-[10px] text-white">
              PDF
            </span>
            QT-1842_Sagar_Hydraulics.pdf
          </div>
          <div className="mt-5 inline-flex bg-[#151515] px-4 py-2 text-[14px] font-medium text-white">
            {sent > 0.5 ? "Quote sent" : "Send quote"}
          </div>
        </div>
        <div className="flex flex-col gap-3">
          <div className="border border-[#e0dbd2] bg-white px-4 py-4">
            <p className="font-mono text-[12px] text-[#6f6d69]">HC-4410</p>
            <p className="mt-1 text-[22px] font-medium">{inr(HOUSING)}</p>
            <p className="mt-1 text-[13px] text-[#1c6b3c]">
              Matches the rate card
            </p>
          </div>
          <div className="border border-[#e0dbd2] bg-white px-4 py-4">
            <p className="font-mono text-[12px] text-[#6f6d69]">HC-4412</p>
            <p className="mt-1 text-[22px] font-medium">{inr(SHAFT)}</p>
            <p className="mt-1 text-[13px] text-[#6f6d69]">
              List {inr(4200)} · Tier B 7.5%
            </p>
          </div>
          <Flag tone="ok">Ready for review</Flag>
        </div>
      </div>
      {appear(local, 1600) > 0 && sent < 0.9 ? (
        <Cursor x={280} y={430} press={sent > 0.2 && sent < 0.6} />
      ) : null}
      {sent > 0.7 ? (
        <Toast
          title="Quote sent"
          detail="QT-1842 · Sagar Hydraulics"
          style={rise(local, 2600)}
        />
      ) : null}
    </Shell>
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
          end: 800,
          node: <Slate kicker="Sample data" title="Quoting" />,
        },
        { id: "inbox", start: 800, end: 4800, node: <Inbox local={t - 800} /> },
        {
          id: "estimate",
          start: 4800,
          end: 11000,
          node: <Estimate local={t - 4800} />,
        },
        {
          id: "mail",
          start: 11000,
          end: 16800,
          node: <QuoteMail local={t - 11000} />,
        },
        {
          id: "end",
          start: 16800,
          end: 19600,
          node: (
            <EndCard
              kicker="QT-1842"
              title="Quote sent"
              detail={`Sagar Hydraulics · housing ${inr(HOUSING)} · shaft ${inr(SHAFT)}`}
            />
          ),
        },
      ]}
    />
  )
}

export const quotingDuration = 19600
export const quotingPoster = 7000

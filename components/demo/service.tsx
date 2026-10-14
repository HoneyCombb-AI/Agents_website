import {
  AgentChip,
  CheckCard,
  Cursor,
  EndCard,
  Frames,
  Mail,
  MailRow,
  Shell,
  Slate,
  Toast,
  appear,
  rise,
} from "@/components/demo/kit"

function NightMail({ local }: { local: number }) {
  return (
    <Mail
      count={1}
      list={
        <>
          <div style={rise(local, 300)}>
            <MailRow
              active
              from="Arjun Menon"
              subject="Has PO 77318 shipped?"
              preview="Our line is waiting on the sprocket hubs."
              time="11:42 PM"
            />
          </div>
          <MailRow
            from="Meera Kulkarni"
            subject="RE: PO 50817"
            preview="Checking the shaft price with our team."
            time="6:18 PM"
          />
        </>
      }
      reader={
        <div className="px-8 py-6">
          <div className="flex items-center justify-between">
            <p className="font-mono text-[12px] tracking-[0.12em] text-[#6f6d69] uppercase">
              Tuesday · 11:42 pm
            </p>
            <AgentChip
              label="Customer Service · Checking the order"
              style={rise(local, 800)}
            />
          </div>
          <h3 className="mt-4 text-[28px] font-medium">
            Has PO 77318 shipped?
          </h3>
          <p className="mt-3 text-[14px] text-[#6f6d69]">
            arjun.menon@deccanconveyors.in
          </p>
          <p className="mt-5 max-w-[520px] text-[16px] leading-7">
            Can you confirm whether PO 77318 has left the plant? We need the
            sprocket hubs before Friday’s fit-up.
          </p>
        </div>
      }
    />
  )
}

function LiveOrder({ local }: { local: number }) {
  return (
    <Shell
      section="Customer Service"
      subtitle="Live order · not the last email"
    >
      <div className="grid grid-cols-[1fr_440px] gap-4">
        <div className="border border-[#e0dbd2] bg-white px-6 py-5">
          <p className="font-mono text-[12px] tracking-[0.12em] text-[#6f6d69] uppercase">
            SO-4418 · PO 77318
          </p>
          <p className="mt-2 text-[24px] font-medium">Deccan Conveyors</p>
          <div className="mt-5 grid grid-cols-2 gap-4 text-[15px]">
            <div>
              <p className="text-[#6f6d69]">Machine</p>
              <p className="mt-1 font-medium">CNC Lathe 2</p>
            </div>
            <div>
              <p className="text-[#6f6d69]">Operation</p>
              <p className="mt-1 font-medium">OP10 · rough turn</p>
            </div>
            <div>
              <p className="text-[#6f6d69]">Started</p>
              <p className="mt-1 font-medium">Today, 10:14 AM</p>
            </div>
            <div>
              <p className="text-[#6f6d69]">Ship promise</p>
              <p className="mt-1 font-medium">Friday 18 Oct · Blue Dart</p>
            </div>
          </div>
        </div>
        <div className="space-y-3">
          <CheckCard
            kicker="Order"
            title="Entered and acknowledged"
            detail="SO-4418 on the books"
            tone="ok"
            style={rise(local, 200)}
          />
          <CheckCard
            kicker="Floor"
            title="Running on Lathe 2"
            detail="Not shipped"
            tone="ok"
            style={rise(local, 800)}
          />
          <CheckCard
            kicker="Reply"
            title="Drafted at 11:43 pm"
            detail="Waiting for the morning send"
            tone="ok"
            style={rise(local, 1500)}
          />
        </div>
      </div>
    </Shell>
  )
}

function Morning({ local }: { local: number }) {
  const sent = appear(local, 1800)
  return (
    <Shell
      section="Customer Service"
      subtitle="Wednesday · 8:06 am · the draft is waiting"
    >
      <div className="border border-[#e0dbd2] bg-white px-7 py-6">
        <p className="font-mono text-[12px] tracking-[0.12em] text-[#6f6d69] uppercase">
          Drafted overnight · 11:43 pm
        </p>
        <p className="mt-3 text-[14px] text-[#6f6d69]">
          To arjun.menon@deccanconveyors.in
        </p>
        <p className="mt-1 text-[22px] font-medium">
          RE: Has PO 77318 shipped?
        </p>
        <p className="mt-4 max-w-[720px] text-[16px] leading-7">
          Arjun, PO 77318 has not shipped. It is on CNC Lathe 2, operation 10,
          started yesterday at 10:14. The promise is still Friday 18 October on
          Blue Dart. We will send tracking once it leaves.
        </p>
        <p className="mt-3 text-[16px]">A. Deshmukh</p>
        <div className="mt-5 inline-flex bg-[#151515] px-4 py-2 text-[14px] font-medium text-white">
          {sent > 0.5 ? "Reply sent · 8:06 am" : "Send reply"}
        </div>
      </div>
      {appear(local, 900) > 0 && sent < 0.9 ? (
        <Cursor x={180} y={390} press={sent > 0.15 && sent < 0.5} />
      ) : null}
      {sent > 0.65 ? (
        <Toast
          title="Reply sent"
          detail="Deccan Conveyors · still on Lathe 2, ship Friday"
          style={rise(local, 2000)}
        />
      ) : null}
    </Shell>
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
          end: 800,
          node: <Slate kicker="Sample data" title="Customer service" />,
        },
        {
          id: "night",
          start: 800,
          end: 4600,
          node: <NightMail local={t - 800} />,
        },
        {
          id: "live",
          start: 4600,
          end: 8600,
          node: <LiveOrder local={t - 4600} />,
        },
        {
          id: "send",
          start: 8600,
          end: 12400,
          node: <Morning local={t - 8600} />,
        },
        {
          id: "end",
          start: 12400,
          end: 15200,
          node: (
            <EndCard
              kicker="Drafted at 11:43 pm"
              title="Reply sent"
              detail="PO 77318 · on Lathe 2 · ship Friday"
            />
          ),
        },
      ]}
    />
  )
}

export const serviceDuration = 15200
export const servicePoster = 6200

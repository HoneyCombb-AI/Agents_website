import {
  CheckCard,
  Cursor,
  EndCard,
  Frames,
  Shell,
  Slate,
  appear,
  rise,
} from "@/components/demo/kit"

function Checks({ local }: { local: number }) {
  return (
    <Shell
      section="Scheduling"
      subtitle="Machines and material, before the board"
    >
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-3">
          <p className="font-mono text-[12px] tracking-[0.12em] text-[#6f6d69] uppercase">
            Machines
          </p>
          <CheckCard
            kicker="Lathe 2 · first shift"
            title="Free after 10:00"
            detail="Can take WO-4471"
            tone="ok"
            style={rise(local, 200)}
          />
          <CheckCard
            kicker="VMC 1"
            title="Busy until 14:30"
            detail="Coromandel cover is on it"
            tone="ok"
            style={rise(local, 700)}
          />
          <CheckCard
            kicker="HMC 3"
            title="Down · spindle"
            detail="Do not load"
            tone="bad"
            style={rise(local, 1200)}
          />
        </div>
        <div className="space-y-3">
          <p className="font-mono text-[12px] tracking-[0.12em] text-[#6f6d69] uppercase">
            Material
          </p>
          <CheckCard
            kicker="EN24 bar · rack B"
            title="42 lengths on hand"
            detail="Covers the Deccan sprocket and bracket"
            tone="ok"
            style={rise(local, 500)}
          />
          <CheckCard
            kicker="FG 260 casings"
            title="Short by 80"
            detail="Sagar housings wait on the foundry"
            tone="bad"
            style={rise(local, 1600)}
          />
        </div>
      </div>
    </Shell>
  )
}

const days = ["Mon 14", "Tue 15", "Wed 16", "Thu 17", "Fri 18"]

function Week({ local }: { local: number }) {
  const posted = appear(local, 2200)
  return (
    <Shell
      section="Scheduling"
      subtitle="Week of 14 October · first shift"
      aside={
        <div className="bg-[#151515] px-4 py-2 text-[14px] font-medium text-white">
          {posted > 0.5 ? "Schedule posted" : "Post schedule"}
        </div>
      }
    >
      <div className="grid h-[430px] grid-cols-5 gap-2">
        {days.map((day, index) => (
          <div
            key={day}
            className="flex flex-col border border-[#e0dbd2] bg-white"
          >
            <p className="border-b border-[#e4dfd6] px-3 py-2 font-mono text-[12px] tracking-[0.08em] uppercase">
              {day}
            </p>
            <div className="flex flex-1 flex-col gap-2 p-2">
              {index === 0 ? (
                <div
                  className="bg-[#151515] px-2 py-3 text-[#f3efe7]"
                  style={rise(local, 400)}
                >
                  <p className="font-mono text-[11px] text-[#f3efe7]/70">
                    Lathe 2
                  </p>
                  <p className="mt-1 text-[14px] font-medium">
                    WO-4471 rough turn
                  </p>
                  <p className="mt-1 text-[12px] text-[#f3efe7]/75">
                    Deccan · PO 77318
                  </p>
                </div>
              ) : null}
              {index === 1 ? (
                <div
                  className="bg-[#e7e2d8] px-2 py-3"
                  style={rise(local, 800)}
                >
                  <p className="font-mono text-[11px] text-[#6f6d69]">
                    Lathe 2
                  </p>
                  <p className="mt-1 text-[14px] font-medium">WO-4471 finish</p>
                  <p className="mt-1 text-[12px] text-[#6f6d69]">
                    Deccan · PO 77318
                  </p>
                </div>
              ) : null}
              {index === 2 ? (
                <div
                  className="border border-[#e4b2a8] bg-[#f8e6e1] px-2 py-3"
                  style={rise(local, 1300)}
                >
                  <p className="font-mono text-[11px] text-[#9f2d2d]">Held</p>
                  <p className="mt-1 text-[14px] font-medium">Sagar housings</p>
                  <p className="mt-1 text-[12px] text-[#9f2d2d]">
                    FG 260 short · price open
                  </p>
                </div>
              ) : null}
              {index === 4 ? (
                <div
                  className="bg-[#e5f3ea] px-2 py-3"
                  style={rise(local, 1700)}
                >
                  <p className="font-mono text-[11px] text-[#1c6b3c]">Ship</p>
                  <p className="mt-1 text-[14px] font-medium">PO 77318</p>
                  <p className="mt-1 text-[12px] text-[#1c6b3c]">
                    Blue Dart, Friday
                  </p>
                </div>
              ) : null}
            </div>
          </div>
        ))}
      </div>
      {appear(local, 1600) > 0 && posted < 0.9 ? (
        <Cursor x={1080} y={78} press={posted > 0.2 && posted < 0.55} />
      ) : null}
    </Shell>
  )
}

export function SchedulingFilm({ t }: { t: number }) {
  return (
    <Frames
      t={t}
      scenes={[
        {
          id: "slate",
          start: 0,
          end: 800,
          node: <Slate kicker="Sample data" title="Scheduling" />,
        },
        {
          id: "checks",
          start: 800,
          end: 5600,
          node: <Checks local={t - 800} />,
        },
        {
          id: "week",
          start: 5600,
          end: 10400,
          node: <Week local={t - 5600} />,
        },
        {
          id: "end",
          start: 10400,
          end: 13200,
          node: (
            <EndCard
              kicker="Week of 14 October"
              title="Schedule posted"
              detail="Deccan on Lathe 2 · Sagar held for castings"
            />
          ),
        },
      ]}
    />
  )
}

export const schedulingDuration = 13200
export const schedulingPoster = 7000

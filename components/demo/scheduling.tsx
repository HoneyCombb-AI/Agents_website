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

const rows = [
  { machine: "Grinder 2", jobs: ["5022", "5047", "5075"] },
  { machine: "Grinder 3", jobs: ["5080", "5091", "5104"] },
  { machine: "Superfinish 1", jobs: ["5033", "5060"] },
  { machine: "Washer", jobs: ["5018", "5052", "5088"] },
  { machine: "CMM", jobs: ["5040", "5066"] },
]

function Block({ label, hot }: { label: string; hot?: boolean }) {
  return (
    <div
      className={
        hot
          ? "min-w-0 bg-[#151515] px-2 py-2 text-[12px] text-white"
          : "min-w-0 bg-[#e7e2d8] px-2 py-2 text-[12px] text-[#151515]"
      }
    >
      <p className="font-medium">{hot ? `HOT ${label}` : label}</p>
    </div>
  )
}

function Board({ hot, banner }: { hot?: boolean; banner?: string }) {
  return (
    <Shell
      section="Scheduling"
      subtitle="Week of 13 Oct · Mon 13"
      aside={
        banner ? (
          <Flag tone="ok">{banner}</Flag>
        ) : (
          <Flag tone="ok">On schedule</Flag>
        )
      }
    >
      <div className="h-full border border-[#e0dbd2] bg-white">
        <div className="grid grid-cols-[160px_1fr] border-b border-[#e0dbd2] bg-[#f7f4ee] px-3 py-2 font-mono text-[11px] tracking-[0.1em] text-[#6f6d69] uppercase">
          <span>Machine</span>
          <span>Mon 13 – Wed 15</span>
        </div>
        {rows.map((row) => (
          <div
            key={row.machine}
            className="grid grid-cols-[160px_1fr] items-center border-b border-[#efeae2] px-3 py-2"
          >
            <p className="text-[14px] font-medium">{row.machine}</p>
            <div className="grid grid-cols-3 gap-2">
              {(hot && row.machine === "Grinder 3"
                ? ["5080", "5120", "5091"]
                : hot && row.machine === "Superfinish 1"
                  ? ["5120", "5033", "5060"]
                  : hot && row.machine === "Washer"
                    ? ["5120", "5018", "5052"]
                    : hot && row.machine === "CMM"
                      ? ["5120", "5040", "5066"]
                      : row.jobs
              ).map((job) => (
                <Block
                  key={`${row.machine}-${job}`}
                  label={job}
                  hot={hot && job === "5120"}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    </Shell>
  )
}

function Rush({ local }: { local: number }) {
  return (
    <div className="absolute inset-0">
      <Board />
      <aside
        className="absolute top-16 right-6 w-[420px] border border-[#e0dbd2] bg-white p-5 shadow-[0_18px_50px_rgba(21,21,21,0.12)]"
        style={rise(local, 200)}
      >
        <Flag tone="bad">Rush</Flag>
        <p className="mt-3 font-mono text-[13px]">SO-2026-0614</p>
        <p className="mt-2 text-[22px] font-medium">Godavari Drives</p>
        <p className="mt-1 text-[15px] text-[#6f6d69]">Coimbatore</p>
        <p className="mt-4 text-[16px] leading-6">
          BR-7208 angular contact race × 80
        </p>
        <p className="mt-3 text-[15px] font-medium">Ship Wed 15 Oct</p>
      </aside>
    </div>
  )
}

function Reading({ local }: { local: number }) {
  const ops = [
    ["OP10", "Grind OD", "4.2 h"],
    ["OP20", "Superfinish", "3.1 h"],
    ["OP30", "Wash", "1.4 h"],
    ["OP40", "Measure", "4.3 h"],
  ]
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#efeae2]">
      <div className="grid w-[1040px] grid-cols-[1fr_360px] gap-6">
        <div className="border border-[#d9d3c8] bg-white p-6">
          <p className="font-mono text-[12px] tracking-[0.12em] text-[#6f6d69] uppercase">
            Sales order
          </p>
          <h3 className="mt-2 text-[28px] font-medium">SO-2026-0614</h3>
          <p className="mt-2 text-[16px] text-[#6f6d69]">
            4 operations · 13.0 h
          </p>
          <div className="mt-5 space-y-2">
            {ops.map((op, index) => (
              <div
                key={op[0]}
                className="grid grid-cols-[80px_1fr_80px] border border-[#efeae2] px-3 py-2 text-[15px]"
                style={rise(local, 200 + index * 280)}
              >
                <span className="font-mono">{op[0]}</span>
                <span>{op[1]}</span>
                <span className="text-right">{op[2]}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="space-y-3">
          <CheckCard
            kicker="Ship by"
            title="Wednesday 15 Oct"
            detail="Customer date holds"
            tone="ok"
            style={rise(local, 400)}
          />
          <CheckCard
            kicker="Material"
            title="52100 bar in stock"
            detail="Rack B, enough for 80"
            tone="ok"
            style={rise(local, 1100)}
          />
          <CheckCard
            kicker="Crews"
            title="First and second shift"
            detail="Both shifts are staffed"
            tone="ok"
            style={rise(local, 1800)}
          />
        </div>
      </div>
    </div>
  )
}

function Moves({ local }: { local: number }) {
  const moves = [
    ["Grinder 3", "Two jobs later"],
    ["Superfinish 1", "One job later"],
    ["Washer", "One job earlier"],
    ["CMM", "One job earlier"],
  ]
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#efeae2]">
      <div className="w-[860px]">
        <p className="font-mono text-[12px] tracking-[0.14em] text-[#6f6d69] uppercase">
          Checking the floor
        </p>
        <h3 className="mt-2 text-[32px] font-medium">
          Rush · 4 ops · 4 machines
        </h3>
        <p className="mt-2 text-[16px] text-[#3c3a36]">
          Ship dates: none now late.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {moves.map((move, index) => (
            <CheckCard
              key={move[0]}
              kicker={move[0]}
              title={move[1]}
              detail="Ship date still holds"
              tone="ok"
              style={rise(local, 200 + index * 320)}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

function Proposal({ local }: { local: number }) {
  const ready = appear(local, 1600)
  const accepted = appear(local, 2800)
  return (
    <div className="absolute inset-0">
      <Board />
      <aside className="absolute top-0 right-0 bottom-0 w-[420px] border-l border-[#e0dbd2] bg-white px-5 py-5">
        <AgentChip label="Waiting on your review" />
        <h3 className="mt-4 text-[24px] font-medium">Proposed changes</h3>
        <p className="mt-2 text-[15px] leading-6 text-[#3c3a36]">
          5120 slides in ahead of the jobs that can move. Godavari still ships
          Wednesday.
        </p>
        <ul className="mt-4 space-y-2 text-[15px]">
          {[
            "Grinder 3 · two later",
            "Superfinish 1 · one later",
            "Washer · one earlier",
            "CMM · one earlier",
          ].map((line, index) => (
            <li
              key={line}
              className="border border-[#efeae2] px-3 py-2"
              style={rise(local, 200 + index * 180)}
            >
              {line}
            </li>
          ))}
        </ul>
        <div className="mt-5 flex gap-2" style={{ opacity: ready }}>
          <div
            className="bg-[#151515] px-4 py-2 text-[14px] font-medium text-white"
            style={{
              transform:
                accepted > 0.2 && accepted < 0.7 ? "scale(0.98)" : undefined,
            }}
          >
            {accepted > 0.55 ? "Accepted" : "Accept all"}
          </div>
          <div className="border border-[#e0dbd2] px-4 py-2 text-[14px]">
            Reject
          </div>
        </div>
        {accepted > 0.7 ? (
          <p className="mt-3 font-mono text-[12px] tracking-[0.1em] text-[#1c6b3c] uppercase">
            Ready
          </p>
        ) : null}
      </aside>
      {ready > 0.4 && accepted < 0.9 ? (
        <Cursor x={980} y={520} press={accepted > 0.15 && accepted < 0.6} />
      ) : null}
    </div>
  )
}

function Terminal({ local }: { local: number }) {
  const queued = appear(local, 900)
  return (
    <div className="absolute inset-0 bg-[#1b1a18] text-[#f3efe7]">
      <header className="border-b border-white/10 px-8 py-5">
        <p className="font-mono text-[12px] tracking-[0.14em] text-[#f3efe7]/55 uppercase">
          Grinder 3 · Operator terminal
        </p>
        <p className="mt-2 text-[28px] font-medium">
          Queued · 5120 · OP10 grind OD
        </p>
      </header>
      <div className="px-8 py-8">
        <p className="text-[18px] text-[#f3efe7]/75">
          Godavari Drives · BR-7208 × 80 · ship Wed 15 Oct
        </p>
        <div
          className="mt-8 inline-flex bg-[#f3efe7] px-6 py-3 text-[18px] font-medium text-[#151515]"
          style={{ opacity: queued }}
        >
          {queued > 0.6 ? "In the queue" : "Waiting on release"}
        </div>
      </div>
    </div>
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
          end: 700,
          node: <Slate kicker="Sample data" title="Scheduling" />,
        },
        { id: "board", start: 700, end: 3000, node: <Board /> },
        { id: "rush", start: 3000, end: 5200, node: <Rush local={t - 3000} /> },
        {
          id: "read",
          start: 5200,
          end: 7600,
          node: <Reading local={t - 5200} />,
        },
        {
          id: "moves",
          start: 7600,
          end: 11600,
          node: <Moves local={t - 7600} />,
        },
        {
          id: "proposal",
          start: 11600,
          end: 16800,
          node: <Proposal local={t - 11600} />,
        },
        {
          id: "placed",
          start: 16800,
          end: 20000,
          node: <Board hot banner="Released to the floor" />,
        },
        {
          id: "floor",
          start: 20000,
          end: 23600,
          node: <Terminal local={t - 20000} />,
        },
        {
          id: "end",
          start: 23600,
          end: 27800,
          node: (
            <EndCard
              kicker="Sent to the floor"
              title="New schedule"
              detail="Godavari Drives ships Wed 15 Oct"
            />
          ),
        },
      ]}
    />
  )
}

export const schedulingDuration = 27800
export const schedulingPoster = 14000

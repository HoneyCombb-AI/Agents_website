import {
  AgentChip,
  CheckCard,
  EndCard,
  Flag,
  Frames,
  Mail,
  MailRow,
  Sheet,
  Shell,
  Slate,
  appear,
  rise,
} from "@/components/demo/kit"

const leads = [
  {
    company: "Kaveri Pumps",
    city: "Hubballi",
    why: "Ships pumps in cast housings",
    score: "9/10",
    contact: "Priya Rao",
    role: "Purchasing manager",
  },
  {
    company: "Malabar Marine",
    city: "Kochi",
    why: "Pump packages for coastal yards",
    score: "8/10",
    contact: "Joseph Mathew",
    role: "Materials",
  },
  {
    company: "Pioneer Hydraulics",
    city: "Faridabad",
    why: "Power packs in CI housings",
    score: "8/10",
    contact: "Neha Gupta",
    role: "Buyer",
  },
  {
    company: "Godavari Dryers",
    city: "Nashik",
    why: "Dryers that ship in steel shells",
    score: "7/10",
    contact: "Ramesh Patil",
    role: "Procurement",
  },
]

function EmptyBoard() {
  return (
    <Shell
      section="Prospecting"
      subtitle="Discover and manage potential leads"
      aside={
        <div className="bg-[#151515] px-4 py-2 text-[14px] font-medium text-white">
          Generate new leads
        </div>
      }
    >
      <div className="flex h-full flex-col border border-[#e0dbd2] bg-white">
        <div className="border-b border-[#e0dbd2] px-5 py-3 text-[15px] font-medium">
          New leads · week of 13 Oct
        </div>
        <div className="flex flex-1 flex-col items-center justify-center text-center">
          <p className="text-[20px] font-medium">No leads yet</p>
          <p className="mt-2 max-w-[420px] text-[15px] leading-6 text-[#6f6d69]">
            Leads will appear here as the prospecting agent discovers them.
          </p>
        </div>
      </div>
    </Shell>
  )
}

function Scan({ local }: { local: number }) {
  const looking = appear(local, 900)
  const scan = appear(local, 1800)
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#efeae2]">
      <div className="grid w-[1080px] grid-cols-[1fr_420px] gap-8">
        <Sheet width={620}>
          <p className="font-mono text-[12px] tracking-[0.14em] text-[#6f6d69] uppercase">
            Finding new customers
          </p>
          <h3 className="mt-3 text-[32px] leading-none font-medium tracking-[-0.03em]">
            Your best customers
          </h3>
          <p className="mt-5 text-[16px] leading-7 text-[#3c3a36]">
            They buy FG 260 pump casings and CI housings. Sagar Hydraulics,
            Deccan Conveyors, Western Agri Parts.
          </p>
          <div className="mt-6 space-y-3">
            <CheckCard
              kicker="They buy"
              title="Cast pump casings and housings"
              detail="Read from the accounts you already won"
              tone="ok"
              style={rise(local, 200)}
            />
            <CheckCard
              kicker="Looking for"
              title="Plants that ship equipment in those housings"
              detail="Pump OEMs, hydraulics, marine, agri"
              tone="ok"
              style={{ ...rise(local, 900), opacity: looking }}
            />
          </div>
        </Sheet>
        <div className="space-y-3" style={{ opacity: scan }}>
          {[
            "Pump OEMs",
            "Hydraulic power packs",
            "Marine packages",
            "Grain dryers",
          ].map((item, index) => (
            <div
              key={item}
              className="border border-[#e0dbd2] bg-white px-4 py-3"
              style={rise(local, 1800 + index * 280)}
            >
              <p className="font-mono text-[11px] tracking-[0.12em] text-[#6f6d69] uppercase">
                Scanning
              </p>
              <p className="mt-1 text-[16px] font-medium">{item}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Matched({ local }: { local: number }) {
  return (
    <div className="absolute inset-0 flex items-center justify-center bg-[#efeae2]">
      <div className="w-[920px]">
        <p className="font-mono text-[13px] tracking-[0.14em] text-[#6f6d69] uppercase">
          Matched
        </p>
        <h3 className="mt-2 text-[40px] leading-none font-medium tracking-[-0.03em]">
          4 new leads · fit 7–9/10
        </h3>
        <p className="mt-4 text-[17px] text-[#3c3a36]">
          Companies that ship equipment in cast housings.
        </p>
        <div className="mt-6 grid grid-cols-2 gap-3">
          {leads.map((lead, index) => (
            <div
              key={lead.company}
              className="flex items-center justify-between border border-[#e0dbd2] bg-white px-4 py-4"
              style={rise(local, 400 + index * 280)}
            >
              <div>
                <p className="text-[18px] font-medium">{lead.company}</p>
                <p className="mt-1 text-[14px] text-[#6f6d69]">{lead.city}</p>
              </div>
              <Flag tone="ok">{lead.score}</Flag>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function Table({ local }: { local: number }) {
  return (
    <Shell
      section="Prospecting"
      subtitle="New leads · week of 13 Oct"
      aside={<AgentChip label="4 matched" />}
    >
      <div className="h-full overflow-hidden border border-[#e0dbd2] bg-white">
        <div className="grid grid-cols-[1.2fr_1.6fr_90px_1.1fr] border-b border-[#e0dbd2] bg-[#f7f4ee] px-4 py-2 font-mono text-[11px] tracking-[0.1em] text-[#6f6d69] uppercase">
          <span>Company</span>
          <span>Why they fit</span>
          <span>Score</span>
          <span>Contact</span>
        </div>
        {leads.map((lead, index) => (
          <div
            key={lead.company}
            className="grid grid-cols-[1.2fr_1.6fr_90px_1.1fr] items-center border-b border-[#efeae2] px-4 py-3 text-[15px]"
            style={rise(local, index * 180)}
          >
            <div>
              <p className="font-medium">{lead.company}</p>
              <p className="text-[13px] text-[#6f6d69]">{lead.city}</p>
            </div>
            <p>{lead.why}</p>
            <Flag tone="ok">{lead.score}</Flag>
            <div>
              <p className="font-medium">{lead.contact}</p>
              <p className="text-[13px] text-[#6f6d69]">{lead.role}</p>
            </div>
          </div>
        ))}
      </div>
    </Shell>
  )
}

function Detail({ local }: { local: number }) {
  const who = appear(local, 900)
  return (
    <Shell section="Prospecting" subtitle="Kaveri Pumps · Hubballi">
      <div className="grid h-full grid-cols-[1fr_360px] gap-4">
        <div className="border border-[#e0dbd2] bg-white p-6">
          <div className="flex items-start justify-between">
            <div>
              <p className="font-mono text-[12px] tracking-[0.12em] text-[#6f6d69] uppercase">
                Lead
              </p>
              <h3 className="mt-2 text-[32px] leading-none font-medium">
                Kaveri Pumps
              </h3>
              <p className="mt-2 text-[16px] text-[#6f6d69]">Hubballi</p>
            </div>
            <Flag tone="ok">9/10</Flag>
          </div>
          <div className="mt-6" style={rise(local, 200)}>
            <p className="font-mono text-[12px] tracking-[0.12em] text-[#6f6d69] uppercase">
              Why they fit
            </p>
            <p className="mt-2 text-[18px] leading-7">
              Their pump line ships in cast housings. The same casings Sagar and
              Deccan already buy from you.
            </p>
          </div>
        </div>
        <aside
          className="border border-[#e0dbd2] bg-white p-5"
          style={{ opacity: who, ...rise(local, 900) }}
        >
          <p className="font-mono text-[12px] tracking-[0.12em] text-[#6f6d69] uppercase">
            Who to contact
          </p>
          <p className="mt-3 text-[22px] font-medium">Priya Rao</p>
          <p className="mt-1 text-[15px] text-[#6f6d69]">Purchasing manager</p>
          <p className="mt-4 text-[15px]">priya.rao@kaveripumps.in</p>
        </aside>
      </div>
    </Shell>
  )
}

function Draft({ local }: { local: number }) {
  const body = appear(local, 700)
  return (
    <Mail
      count={1}
      list={
        <MailRow
          from="Kaveri Pumps"
          subject="Cast housings for your pump line"
          preview="Draft to Priya Rao"
          time="Draft"
          active
        />
      }
      reader={
        <div className="px-8 py-6">
          <AgentChip label="Drafted by your Prospecting agent" />
          <p className="mt-4 text-[14px] text-[#6f6d69]">
            To priya.rao@kaveripumps.in
          </p>
          <p className="mt-2 text-[22px] font-medium">
            Cast housings for your pump line
          </p>
          <div
            className="mt-5 max-w-[560px] text-[16px] leading-7"
            style={{ opacity: body }}
          >
            <p>Hi Priya,</p>
            <p className="mt-3">
              We machine FG 260 pump casings for plants that ship the housing
              with the pump. Kaveri looks like one of them.
            </p>
            <p className="mt-3">
              If a drawing is useful, I can send the sizes we already run for
              houses like yours.
            </p>
            <p className="mt-3">A. Deshmukh</p>
          </div>
        </div>
      }
    />
  )
}

function Sent({ local }: { local: number }) {
  const moved = appear(local, 600)
  return (
    <Mail
      count={0}
      list={
        <div>
          <div
            className="border-b border-[#e4dfd6] bg-[#e5f3ea] px-4 py-3 text-[14px]"
            style={{ opacity: moved }}
          >
            Sent to Priya Rao · 9:42 AM
          </div>
          <MailRow
            from="Kaveri Pumps"
            subject="Cast housings for your pump line"
            preview="Moved to Sent"
            time="9:42 AM"
          />
        </div>
      }
      reader={
        <div className="px-8 py-6">
          <Flag tone="ok">Sent</Flag>
          <p className="mt-4 text-[18px] font-medium">
            From A. Deshmukh’s inbox
          </p>
          <p className="mt-2 text-[15px] leading-7 text-[#3c3a36]">
            To Priya Rao, Kaveri Pumps. The team hit send.
          </p>
        </div>
      }
    />
  )
}

export function ProspectingFilm({ t }: { t: number }) {
  return (
    <Frames
      t={t}
      scenes={[
        {
          id: "slate",
          start: 0,
          end: 800,
          node: <Slate kicker="Sample data" title="Prospecting" />,
        },
        { id: "empty", start: 800, end: 3200, node: <EmptyBoard /> },
        { id: "scan", start: 3200, end: 6800, node: <Scan local={t - 3200} /> },
        {
          id: "matched",
          start: 6800,
          end: 9800,
          node: <Matched local={t - 6800} />,
        },
        {
          id: "table",
          start: 9800,
          end: 12800,
          node: <Table local={t - 9800} />,
        },
        {
          id: "detail",
          start: 12800,
          end: 16800,
          node: <Detail local={t - 12800} />,
        },
        {
          id: "draft",
          start: 16800,
          end: 20800,
          node: <Draft local={t - 16800} />,
        },
        {
          id: "sent",
          start: 20800,
          end: 24800,
          node: <Sent local={t - 20800} />,
        },
        {
          id: "end",
          start: 24800,
          end: 28800,
          node: (
            <EndCard
              kicker="Sent from A. Deshmukh’s inbox"
              title="To Priya Rao · Kaveri Pumps"
              detail="Cast housings for your pump line"
            />
          ),
        },
      ]}
    />
  )
}

export const prospectingDuration = 28800
export const prospectingPoster = 11200

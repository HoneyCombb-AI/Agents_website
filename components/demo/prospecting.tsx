import {
  Cursor,
  EndCard,
  Flag,
  Frames,
  Shell,
  Slate,
  Toast,
  appear,
  rise,
} from "@/components/demo/kit"

const companies = [
  {
    name: "Kaveri Pumps",
    place: "Hubballi",
    why: "Buys CI pump casings, 40–80 kg",
    who: "Priya Rao, Buyer",
    fit: "Strong fit",
  },
  {
    name: "Malabar Marine",
    place: "Kochi",
    why: "Replacement impellers for deck pumps",
    who: "Joseph Mathew, Stores",
    fit: "Worth a note",
  },
  {
    name: "Pioneer Hydraulics",
    place: "Faridabad",
    why: "Machines housings, sends castings out",
    who: "Neha Gupta, Purchase",
    fit: "Strong fit",
  },
]

function Search({ local }: { local: number }) {
  const typed = "plants that buy CI pump casings"
  const chars = Math.min(typed.length, Math.floor(Math.max(0, local - 200) / 40))
  return (
    <Shell section="Prospecting" subtitle="Companies that buy what you make">
      <div className="border border-[#e0dbd2] bg-white px-4 py-3 text-[18px]">
        <span className="text-[#6f6d69]">Find · </span>
        {typed.slice(0, chars)}
        <span className="ml-0.5 inline-block h-5 w-px translate-y-1 bg-[#151515]" />
      </div>
      <div className="mt-4 grid grid-cols-3 gap-3">
        {companies.map((company, index) => (
          <article
            key={company.name}
            className="border border-[#e0dbd2] bg-white px-4 py-4"
            style={rise(local, 900 + index * 280)}
          >
            <div className="flex items-start justify-between gap-2">
              <p className="text-[18px] font-medium">{company.name}</p>
              <Flag tone={company.fit === "Strong fit" ? "ok" : "wait"}>
                {company.fit}
              </Flag>
            </div>
            <p className="mt-1 text-[13px] text-[#6f6d69]">{company.place}</p>
            <p className="mt-3 text-[14px] leading-6">{company.why}</p>
            <p className="mt-3 font-mono text-[12px] tracking-[0.06em] text-[#3c3b39] uppercase">
              {company.who}
            </p>
          </article>
        ))}
      </div>
    </Shell>
  )
}

function Note({ local }: { local: number }) {
  const sent = appear(local, 2600)
  return (
    <Shell
      section="Prospecting"
      subtitle="Kaveri Pumps · Hubballi · note ready"
    >
      <div className="grid h-full grid-cols-[280px_1fr] gap-4">
        <aside className="border border-[#e0dbd2] bg-white px-4 py-4">
          <p className="font-mono text-[12px] tracking-[0.12em] text-[#6f6d69] uppercase">
            Why this plant
          </p>
          <p className="mt-3 text-[15px] leading-6">
            They buy cast pump casings in the weight you already pour for Sagar
            Hydraulics. Last public tender listed FG 260 casings, 50 kg class.
          </p>
          <p className="mt-4 text-[14px] text-[#1c6b3c]">
            Buyer on file · Priya Rao
          </p>
        </aside>
        <div className="border border-[#e0dbd2] bg-white px-6 py-5">
          <p className="text-[14px] text-[#6f6d69]">
            To priya.rao@kaveripumps.in
          </p>
          <p className="mt-1 text-[20px] font-medium">
            Casings for the 50 kg pumps
          </p>
          <p
            className="mt-4 max-w-[640px] text-[16px] leading-7"
            style={rise(local, 300)}
          >
            Priya, we machine and pour FG 260 pump casings for plants in Pune
            and Coimbatore. If Kaveri is buying that class of casting, I can
            send the sizes we already run and a sample price on your drawing.
          </p>
          <p className="mt-3 text-[16px]">
            A. Deshmukh · Honeycomb customer, sample
          </p>
          <div className="mt-5 inline-flex bg-[#151515] px-4 py-2 text-[14px] font-medium text-white">
            {sent > 0.5 ? "Note sent" : "Send outreach"}
          </div>
        </div>
      </div>
      {appear(local, 1800) > 0 && sent < 0.9 ? (
        <Cursor x={420} y={430} press={sent > 0.15 && sent < 0.55} />
      ) : null}
      {sent > 0.7 ? (
        <Toast
          title="Outreach sent"
          detail="Kaveri Pumps · Priya Rao"
          style={rise(local, 2800)}
        />
      ) : null}
    </Shell>
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
        {
          id: "search",
          start: 800,
          end: 6200,
          node: <Search local={t - 800} />,
        },
        {
          id: "note",
          start: 6200,
          end: 11200,
          node: <Note local={t - 6200} />,
        },
        {
          id: "end",
          start: 11200,
          end: 14000,
          node: (
            <EndCard
              kicker="Kaveri Pumps · Hubballi"
              title="Outreach sent"
              detail="Three plants matched · one note with your team"
            />
          ),
        },
      ]}
    />
  )
}

export const prospectingDuration = 14000
export const prospectingPoster = 3500

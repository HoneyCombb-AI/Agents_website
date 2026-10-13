/** Swap these Unsplash photo ids for your own factory photography. */
export function photo(id: string, width = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`
}

export const DEMO_MAIL =
  "mailto:ankush@honeycombai.in?subject=Book%20a%20Honeycomb%20demo"

export function demoMail(topic?: string) {
  if (!topic) return DEMO_MAIL
  const subject = encodeURIComponent(`Honeycomb demo — ${topic}`)
  return `mailto:ankush@honeycombai.in?subject=${subject}`
}

export type AgentId =
  "quoting" | "orders" | "scheduling" | "followups" | "invoicing" | "catalogue"

export type AgentIcon =
  "quote" | "order" | "schedule" | "follow" | "invoice" | "catalogue"

export type Agent = {
  id: AgentId
  icon: AgentIcon
  group: "Sales" | "Production" | "Finance"
  label: string
  heading: string
  body: string
  stat?: string
  image: string
}

export const agents: Agent[] = [
  {
    id: "quoting",
    icon: "quote",
    group: "Sales",
    label: "Quoting",
    heading: "Quotes, sent.",
    body: "A customer drawing comes in. Honeycomb reads the geometry, checks feasibility, routes the job, and prices cycle time and cost.",
    stat: "Early customers · 4–5 days to ~2 hours",
    image: photo("1565043589221-1a6fd9ae45c7", 1400),
  },
  {
    id: "orders",
    icon: "order",
    group: "Sales",
    label: "Order entry",
    heading: "Orders, posted.",
    body: "Reads the purchase order in the inbox and enters the sales order in Tally or SAP Business One.",
    image: photo("1586528116311-ad8dd3c8310d", 1400),
  },
  {
    id: "scheduling",
    icon: "schedule",
    group: "Production",
    label: "Scheduling",
    heading: "The floor, sequenced.",
    body: "Lines each job up against the machines, material, and operators that are actually free.",
    image: photo("1513828583688-c52646db42da", 1400),
  },
  {
    id: "followups",
    icon: "follow",
    group: "Sales",
    label: "Follow-ups",
    heading: "The thread, continued.",
    body: "Drafts the chase on an open quote and the reply on order status, from live data, in your voice.",
    image: photo("1581091226825-a6a2a5aee158", 1400),
  },
  {
    id: "invoicing",
    icon: "invoice",
    group: "Finance",
    label: "Invoicing",
    heading: "Invoices, raised.",
    body: "Builds the invoice on your terms, flags what is late, and matches each supplier bill to its order.",
    image: photo("1567789884554-0b844b597180", 1400),
  },
  {
    id: "catalogue",
    icon: "catalogue",
    group: "Sales",
    label: "Catalogue",
    heading: "Lines, priced.",
    body: "Quotes a distributor line from the live catalogue, with your breaks, tax, and what is actually in stock.",
    image: photo("1587293852726-70cdb56c2866", 1400),
  },
]

export type Industry = {
  id: string
  label: string
  short: string
  agents: AgentId[]
  image: string
}

export const industries: Industry[] = [
  {
    id: "machining",
    label: "Precision machining",
    short: "Machining",
    agents: ["quoting", "orders", "scheduling", "invoicing"],
    image: photo("1565043589221-1a6fd9ae45c7", 900),
  },
  {
    id: "gears",
    label: "Gears",
    short: "Gears",
    agents: ["quoting", "orders", "scheduling", "followups"],
    image: photo("1581092918056-0c4c3acd3789", 900),
  },
  {
    id: "castings",
    label: "Castings & forgings",
    short: "Castings",
    agents: ["quoting", "scheduling", "invoicing", "followups"],
    image: photo("1504328345606-18bbc8c9d7d1", 900),
  },
  {
    id: "automotive",
    label: "Automotive components",
    short: "Automotive",
    agents: ["quoting", "orders", "invoicing", "scheduling"],
    image: photo("1619642751034-765dfdf7c58e", 900),
  },
  {
    id: "aerospace",
    label: "Aerospace",
    short: "Aerospace",
    agents: ["quoting", "orders", "invoicing", "followups"],
    image: photo("1540962351504-03099e0a754b", 900),
  },
  {
    id: "textiles",
    label: "Textiles & yarn",
    short: "Textiles",
    agents: ["catalogue", "orders", "invoicing", "scheduling"],
    image: photo("1558618666-fcd25c85cd64", 900),
  },
  {
    id: "electrical",
    label: "Electrical distribution",
    short: "Electrical",
    agents: ["catalogue", "orders", "invoicing", "followups"],
    image: photo("1581092334651-ddf26d9a09d0", 900),
  },
  {
    id: "supply",
    label: "Industrial supply",
    short: "Industrial supply",
    agents: ["catalogue", "quoting", "orders", "followups"],
    image: photo("1586528116311-ad8dd3c8310d", 900),
  },
  {
    id: "fasteners",
    label: "Fasteners",
    short: "Fasteners",
    agents: ["catalogue", "quoting", "orders", "invoicing"],
    image: photo("1581092162384-8987c1d64718", 900),
  },
  {
    id: "bearings",
    label: "Bearings",
    short: "Bearings",
    agents: ["catalogue", "quoting", "followups", "orders"],
    image: photo("1504917595217-d4dc5ebe6122", 900),
  },
  {
    id: "plastics",
    label: "Plastics & packaging",
    short: "Plastics",
    agents: ["quoting", "catalogue", "scheduling", "orders"],
    image: photo("1581094794329-c8112a89af12", 900),
  },
]

export const heroWords = [
  "QUOTES.",
  "ORDERS.",
  "INVOICES.",
  "RFQs.",
  "SCHEDULING.",
  "ERP.",
]

export const heroImage = photo("1553413077-190dd305871c", 2400)

export const steps = [
  {
    n: "01",
    title: "On site",
    body: "A Honeycomb engineer spends a week on your shop floor, learning how a job moves and where the numbers live.",
  },
  {
    n: "02",
    title: "Build",
    body: "We build each agent around your drawings, rate cards, and the rules your seniors already carry. No two plants get the same Honeycomb.",
  },
  {
    n: "03",
    title: "Beta",
    body: "Your team runs the agent beside the way you work today. We correct it with you before anyone switches over.",
  },
  {
    n: "04",
    title: "Live",
    body: "The agents run in your system. Your data stays where it is. Every correction makes the next quote cleaner.",
  },
]

export const systems: { category: string; names: string[] }[] = [
  {
    category: "ERP",
    names: [
      "Tally",
      "SAP Business One",
      "Busy",
      "Marg",
      "Zoho Books",
      "Odoo",
      "NetSuite",
      "Dynamics 365",
    ],
  },
  {
    category: "CRM",
    names: ["Zoho CRM", "LeadSquared", "HubSpot", "Salesforce"],
  },
  {
    category: "Email",
    names: ["Gmail", "Outlook"],
  },
]

export function agentsFor(industryId: string | null) {
  if (!industryId) return agents
  const industry = industries.find((item) => item.id === industryId)
  if (!industry) return agents
  return agents.filter((agent) => industry.agents.includes(agent.id))
}

export const navGroups: { label: string; ids: AgentId[] }[] = [
  {
    label: "Sales",
    ids: ["quoting", "orders", "catalogue", "followups"],
  },
  { label: "Production", ids: ["scheduling"] },
  { label: "Finance", ids: ["invoicing"] },
]

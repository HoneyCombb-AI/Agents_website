/** Swap these Unsplash photo ids for your own factory photography. */
export function photo(id: string, width = 1600) {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${width}&q=80`
}

export const DEMO_MAIL =
  "mailto:ankush@honeycombai.in?subject=Book%20a%20Honeycomb%20AI%20demo"

export function demoMail(topic?: string) {
  if (!topic) return DEMO_MAIL
  const subject = encodeURIComponent(`Honeycomb AI demo — ${topic}`)
  return `mailto:ankush@honeycombai.in?subject=${subject}`
}

export type AgentId =
  | "prospecting"
  | "quoting"
  | "order-entry"
  | "scheduling"
  | "customer-service"
  | "ap-ar"

export type AgentIcon =
  "prospect" | "quote" | "order" | "schedule" | "service" | "ledger"

export type AgentPoint = { title: string; body: string }

export type AgentStep = {
  n: string
  title: string
  kicker: string
  body: string
}

export type AgentFaq = { q: string; a: string }

export type Agent = {
  id: AgentId
  icon: AgentIcon
  group: "Sales" | "Production" | "Finance"
  label: string
  heading: string
  body: string
  image: string
  oneLiner: string
  promise: string
  howTitle: string
  howBody: string
  demoStory: string
  different: AgentPoint[]
  steps: AgentStep[]
  faqs: AgentFaq[]
  cta: string
}

const different = (
  built: string,
  systems: string,
  together: string
): AgentPoint[] => [
  { title: "Built for you", body: built },
  { title: "On your systems", body: systems },
  { title: "Better with every agent", body: together },
]

function buildSteps(
  learn: string,
  build: string,
  beta: string,
  live: string
): AgentStep[] {
  return [
    {
      n: "01",
      title: "On site",
      kicker: "On your floor",
      body: learn,
    },
    {
      n: "02",
      title: "Build",
      kicker: "With your team",
      body: build,
    },
    {
      n: "03",
      title: "Beta",
      kicker: "On live work",
      body: beta,
    },
    {
      n: "04",
      title: "Live",
      kicker: "In your system",
      body: live,
    },
  ]
}

export const agents: Agent[] = [
  {
    id: "prospecting",
    icon: "prospect",
    group: "Sales",
    label: "Prospecting",
    heading: "Accounts, found.",
    body: "Finds companies that buy what you make and drives the outreach.",
    image: photo("1586528116311-ad8dd3c8310d", 1400),
    oneLiner: "Finds companies that buy what you make and drives the outreach.",
    promise:
      "Your Prospecting agent looks for the plants that buy what you make.",
    howTitle: "From the market to the first note.",
    howBody:
      "It searches for companies that buy what you make, picks who to write to, and drafts the note in your voice. Your team checks the list. And hits send.",
    demoStory:
      "The agent reads who already buys your casings, matches four new plants, opens Kaveri Pumps, drafts the note to Priya Rao, and your team sends it from the inbox. Sample data.",
    different: different(
      "We sit with your sales team and build it from the parts you sell and the customers you already won. Not from a list you can buy.",
      "It works in your CRM and your inbox. Your data stays where it is. Mark a fit as wrong, and it remembers.",
      "A company it finds can become a quote, then an order. Each agent you add makes that work count twice."
    ),
    steps: buildSteps(
      "A Honeycomb AI engineer spends time with sales, learning who you sell to and who you turn away.",
      "We build the agent on your parts, your wins, and the accounts your seniors already know.",
      "Your team runs the list beside the way you prospect today. We correct it with you before anyone switches over.",
      "It runs in your CRM. Your data stays where it is. Every correction makes the next list cleaner."
    ),
    faqs: [
      {
        q: "How does Honeycomb AI’s Prospecting agent work?",
        a: "It finds companies that buy what you make and drafts the outreach. We build it on your floor, from your parts and the customers you already won, not from a bought list.",
      },
      {
        q: "How do you build my Prospecting agent?",
        a: "On your floor, with your team, in four steps. We learn who you sell to, build the agent on those accounts, run it beside the way you prospect today, and then let it work in your CRM.",
      },
      {
        q: "Does it work with my CRM?",
        a: "Yes. It works in your CRM and your inbox, including Zoho, LeadSquared, HubSpot, Salesforce, Gmail, and Outlook. Your data stays where it is.",
      },
      {
        q: "What happens when I add more agents?",
        a: "A company it finds can go straight to Quoting. Each agent shares what the others know, so the list is worth more once quotes and orders are in the same place.",
      },
    ],
    cta: "Spend your hours where they count. Start with your Prospecting agent.",
  },
  {
    id: "quoting",
    icon: "quote",
    group: "Sales",
    label: "Quoting",
    heading: "Drawings, quoted.",
    body: "Reads the customer's drawing and drafts a shop-ready quote for build-to-print work.",
    image: photo("1565043589221-1a6fd9ae45c7", 1400),
    oneLiner:
      "Reads the customer's drawing and drafts a shop-ready quote for build-to-print work.",
    promise:
      "Your Quoting agent turns a drawing into a route, a cycle time, and a price.",
    howTitle: "From the drawing to the quote.",
    howBody:
      "It extracts the callouts, checks the job against your machines, builds the route and the cycle time, and costs it on your rates. Your estimator changes a line. And hits send.",
    demoStory:
      "An RFQ arrives from Vindhya Drives with a drawing of a custom machined part. The agent extracts the specs, checks the shop can make it, routes a forged blank through turning, milling, carburising, and grinding, costs the job, and the estimator shortens the grind cycle before sending the quote. Sample data.",
    different: different(
      "We build it with your estimators, from your machines, your rate card, and the way a drawing becomes a route. Custom, build-to-print work, made to the customer's drawing.",
      "It reads the PDF or TIF in your inbox and prices the job on your machine-hour rates. Your data stays where it is. Change a cycle time, and that is the number that goes out.",
      "The quote it drafts is the quote Order Entry will check, and the route is the one Scheduling can place."
    ),
    steps: buildSteps(
      "A Honeycomb AI engineer spends time with your estimators, learning how a drawing becomes a route and a price.",
      "We build the agent on your machines, your rates, and the jobs your shop has already run.",
      "Your team runs live drawings through it, beside the way you quote today, until the route is one they would sign.",
      "It drafts in your inbox. Your estimator still reviews the number and hits send."
    ),
    faqs: [
      {
        q: "How does Honeycomb AI’s Quoting agent work?",
        a: "A drawing comes in. It pulls material, mass, tolerances, heat treatment, and finish into a spec table, and flags anything it had to assume. It checks the job against your machines, builds the route op by op, puts a cycle time and a setup on each op, and costs material, machining, heat treat, and overheads down to a rupee per piece. Your estimator reviews it.",
      },
      {
        q: "How do you build my Quoting agent?",
        a: "On your floor, with your estimators, in four steps. We learn how a drawing becomes a route, build the agent on your machines and your rate card, run live drawings through it with you, and then let it draft in the inbox you already use.",
      },
      {
        q: "Does an estimator still check the quote?",
        a: "Yes. The agent drafts. Your estimator can change a cycle time, a rate, or a blank, and then they hit send. Nothing goes to the customer until a person sends it.",
      },
      {
        q: "What work is it for?",
        a: "Custom, build-to-print work, made to the customer's drawing and priced on your machines and your rates.",
      },
    ],
    cta: "Spend your hours where they count. Start with your Quoting agent.",
  },
  {
    id: "order-entry",
    icon: "order",
    group: "Sales",
    label: "Order Entry",
    heading: "Orders, posted.",
    body: "Reads each PO, enters the sales order, and drafts the acknowledgment.",
    image: photo("1581091226825-a6a2a5aee158", 1400),
    oneLiner:
      "Reads each PO, enters the sales order, and drafts the acknowledgment.",
    promise: "Your Order Entry agent enters orders the way your team would.",
    howTitle: "From the inbox to the sales order.",
    howBody:
      "It reads each PO, checks every line against the quote, and drafts the reply the way your team would. Your team reviews what is off. And hits send.",
    demoStory:
      "Two purchase orders land in the inbox. The agent checks every line against the quote and flags the price that does not match. Your team sends that reply, enters the other order, and sends the acknowledgment. The job goes to the floor, and the operator starts it. Sample data.",
    different: different(
      "We build it on your floor, from your customers, your parts, and the orders already on your books. Never from a generic order form.",
      "It reads the PO in your inbox and enters the sales order in Tally or SAP Business One. Your data stays where it is. Correct a line, and it holds that the way a new hire would.",
      "Start with order entry. The quote, the schedule, and the invoice can share what this agent already checked."
    ),
    steps: buildSteps(
      "A Honeycomb AI engineer spends time on your floor, learning how a PO becomes a sales order.",
      "We build the agent on your customers, your parts, and the checks your seniors already make.",
      "Your team runs live POs through it, and we tune it with them until it enters the way you do.",
      "It runs inside the system you already use, and the desk gets that time back."
    ),
    faqs: [
      {
        q: "How does Honeycomb AI’s Order Entry agent work?",
        a: "It reads each PO, enters the sales order, and drafts the acknowledgment. We build it on your floor, from your customers, your parts, and your order history. Never from a generic template.",
      },
      {
        q: "How do you build my Order Entry agent?",
        a: "On your floor, with your team, in four steps. We learn how you enter orders, build the agent on your customers and parts, run live POs through it with you, and then let it work in your system.",
      },
      {
        q: "Does my Order Entry agent work with my ERP?",
        a: "Yes. It works in your ERP, your CRM, and your inbox. Your data stays in its own environment, and the agent learns when your team corrects a line.",
      },
      {
        q: "What happens when I add more agents?",
        a: "Start with Order Entry and add agents as you grow. Quoting, scheduling, customer service, and AP/AR share what this agent already checked, so the time you get back compounds.",
      },
    ],
    cta: "Spend your hours where they count. Start with your Order Entry agent.",
  },
  {
    id: "scheduling",
    icon: "schedule",
    group: "Production",
    label: "Scheduling",
    heading: "The floor, sequenced.",
    body: "Checks machines and material and builds the schedule.",
    image: photo("1513828583688-c52646db42da", 1400),
    oneLiner: "Checks machines and material and builds the schedule.",
    promise:
      "Your Scheduling agent builds the week from the machines and metal you actually have.",
    howTitle: "From the job to the machine.",
    howBody:
      "It reads each job, checks which machines and material are free, and builds the schedule. Your team moves what it must. And posts it.",
    demoStory:
      "A rush order for Godavari Drives arrives. The agent checks the ship date, the stock, and the floor, slides four jobs, and your team accepts the week. The grinder terminal picks up the race. Sample data.",
    different: different(
      "We build it from your machines, your shifts, and the way a job actually waits on material. Not from a planning template.",
      "It reads the jobs you already have and posts the schedule where your supervisors look. Your data stays where it is.",
      "An order that was just entered is a job it can place. A late casting is a job it will not promise."
    ),
    steps: buildSteps(
      "A Honeycomb AI engineer spends time on the floor, learning which machine actually runs which job.",
      "We build the agent on your work centres, your shifts, and the material rules your planners already use.",
      "Your team runs a live week beside the board you use today. We correct it with them before anyone posts from it.",
      "It posts inside the system you already run, and the whiteboard stops being the only schedule."
    ),
    faqs: [
      {
        q: "How does Honeycomb AI’s Scheduling agent work?",
        a: "It checks machines and material and builds the schedule. We build it from your work centres and the way a job actually waits, not from a blank Gantt chart.",
      },
      {
        q: "How do you build my Scheduling agent?",
        a: "On your floor, with your planners, in four steps. We learn the machines and the material rules, build the agent on them, run a live week beside your current board, and then let it post.",
      },
      {
        q: "Does it work with my ERP?",
        a: "Yes. It reads open orders and stock from your ERP and posts the schedule back. Your data stays where it is.",
      },
      {
        q: "What happens when I add more agents?",
        a: "Order Entry hands it a sales order. Customer Service can then answer from the live machine, not from last week’s promise.",
      },
    ],
    cta: "Spend your hours where they count. Start with your Scheduling agent.",
  },
  {
    id: "customer-service",
    icon: "service",
    group: "Sales",
    label: "Customer Service",
    heading: "Replies, drafted.",
    body: "Checks the live order and drafts the reply at any hour.",
    image: photo("1581092918056-0c4c3acd3789", 1400),
    oneLiner: "Checks the live order and drafts the reply at any hour.",
    promise:
      "Your Customer Service agent answers from the live order, at any hour.",
    howTitle: "From the question to the reply.",
    howBody:
      "It reads each question, checks the live order, and drafts the reply your team would send. Your team reviews it. And hits send. The draft is ready at any hour.",
    demoStory:
      "A ticket arrives asking where PO 44188 is. The agent finds the shipment, the Blue Dart tracking, and a dock date a day early, drafts the reply, and your team sends it. The ticket closes. Sample data.",
    different: different(
      "We build it from the questions your customers actually send, and from the words your team already uses to answer them.",
      "It checks the live order in your ERP before it drafts a word. Your data stays where it is. The draft is waiting at any hour.",
      "It can only tell the truth about a job if order entry and scheduling have already touched it."
    ),
    steps: buildSteps(
      "A Honeycomb AI engineer reads the mailbox with your team and learns which questions come every week.",
      "We build the agent on your orders, your ship rules, and the voice your team already writes in.",
      "Your team runs live questions through it, and we tune the replies with them before anyone sends from it.",
      "It drafts inside your inbox, from the live order, including the ones that arrive after the shift."
    ),
    faqs: [
      {
        q: "How does Honeycomb AI’s Customer Service agent work?",
        a: "It checks the live order and drafts the reply at any hour. The draft uses the status in your ERP, not a guess from the last email.",
      },
      {
        q: "How do you build my Customer Service agent?",
        a: "On your floor, with the people who answer the mailbox, in four steps. We learn the questions, build the agent on your orders and your voice, test it on live mail, and then let it draft.",
      },
      {
        q: "Does it send mail on its own?",
        a: "It drafts. Your team hits send. The draft is ready when the question arrives, including overnight.",
      },
      {
        q: "What happens when I add more agents?",
        a: "Scheduling tells it which machine the job is on. Order Entry tells it the acknowledgment that already went out. The reply gets more specific as you add agents.",
      },
    ],
    cta: "Spend your hours where they count. Start with your Customer Service agent.",
  },
  {
    id: "ap-ar",
    icon: "ledger",
    group: "Finance",
    label: "AP/AR",
    heading: "Invoices, raised.",
    body: "Drafts invoices, flags late payments, and matches supplier invoices to orders.",
    image: photo("1567789884554-0b844b597180", 1400),
    oneLiner:
      "Drafts invoices, flags late payments, and matches supplier invoices to orders.",
    promise:
      "Your AP/AR agent keeps the invoice, the receipt, and the supplier bill in one pass.",
    howTitle: "From the shipment to the books.",
    howBody:
      "It drafts the invoice on your terms, flags what is late, and matches each supplier bill to its order. Your team approves the exceptions. And posts them.",
    demoStory:
      "A supplier invoice arrives. The three-way match finds the price off by ₹30,000. Your team sends the query, the revised bill matches, and the payment is scheduled. Sample data.",
    different: different(
      "We build it from your invoice terms, your overdue rules, and the way you match a supplier bill to a purchase order.",
      "It drafts in the books you already keep. Your data stays where it is. Your team still approves what gets posted.",
      "An order that shipped is an invoice it can draft. A price Order Entry already flagged is a bill it will not quietly pay."
    ),
    steps: buildSteps(
      "A Honeycomb AI engineer spends time with accounts, learning how an invoice gets raised and how a supplier bill gets matched.",
      "We build the agent on your terms, your tax, and the match rules your team already trusts.",
      "Your team runs live invoices and bills through it, and we tune the exceptions with them.",
      "It drafts inside Tally or SAP Business One. Your team approves what posts."
    ),
    faqs: [
      {
        q: "How does Honeycomb AI’s AP/AR agent work?",
        a: "It drafts invoices, flags late payments, and matches supplier invoices to orders. Your team still approves what gets posted.",
      },
      {
        q: "How do you build my AP/AR agent?",
        a: "On your floor, with accounts, in four steps. We learn your terms and match rules, build the agent on them, run live bills through it with you, and then let it draft in the books you keep.",
      },
      {
        q: "Does it work with Tally or SAP Business One?",
        a: "Yes. It works in the ERP you already run, including Tally and SAP Business One, and it reads the inbox the bills arrive in. Your data stays where it is.",
      },
      {
        q: "What happens when I add more agents?",
        a: "Order Entry has already checked the price. Scheduling knows what shipped. The invoice and the supplier match start from that, instead of from a retyped sheet.",
      },
    ],
    cta: "Spend your hours where they count. Start with your AP/AR agent.",
  },
]

export type Industry = {
  id: string
  label: string
  note: string
  agents: AgentId[]
  featured?: boolean
}

export const industries: Industry[] = [
  {
    id: "textiles",
    label: "Textiles & yarn",
    note: "Yarn, fabric, and mills",
    agents: ["order-entry", "scheduling", "customer-service"],
    featured: true,
  },
  {
    id: "electricals",
    label: "Electricals & electronics",
    note: "Assemblies, panels, and components",
    agents: [
      "quoting",
      "order-entry",
      "scheduling",
      "customer-service",
      "ap-ar",
    ],
  },
  {
    id: "plastics",
    label: "Plastics & moulding",
    note: "Moulded parts and components",
    agents: ["quoting", "order-entry", "scheduling", "customer-service"],
  },
  {
    id: "custom",
    label: "Custom manufacturing",
    note: "Build-to-print and job shops",
    agents: [
      "prospecting",
      "quoting",
      "order-entry",
      "scheduling",
      "customer-service",
      "ap-ar",
    ],
  },
  {
    id: "metals",
    label: "Metals & fabrication",
    note: "Fabricated and machined metal",
    agents: [
      "quoting",
      "order-entry",
      "scheduling",
      "customer-service",
      "ap-ar",
    ],
  },
  {
    id: "distributors",
    label: "Industrial distributors",
    note: "Stock, supply, and resale",
    agents: ["prospecting", "order-entry", "customer-service", "ap-ar"],
  },
  {
    id: "packaging",
    label: "Packaging",
    note: "Packs, cartons, and converted stock",
    agents: ["order-entry", "scheduling", "customer-service", "ap-ar"],
  },
  {
    id: "auto",
    label: "Auto components",
    note: "Components for vehicle makers",
    agents: [
      "quoting",
      "order-entry",
      "scheduling",
      "customer-service",
      "ap-ar",
    ],
  },
]

export const heroWords = [
  "QUOTES.",
  "ORDERS.",
  "SCHEDULES.",
  "OUTREACH.",
  "REPLIES.",
  "INVOICES.",
]

export const heroImage = photo("1553413077-190dd305871c", 2400)

export const steps = [
  {
    n: "01",
    title: "On site",
    body: "A Honeycomb AI engineer spends a week on your shop floor, learning how a job moves and where the numbers live.",
  },
  {
    n: "02",
    title: "Build",
    body: "We build each agent around your drawings, rate cards, and the rules your seniors already carry. No two plants get the same Honeycomb AI.",
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

export function getAgent(slug: string) {
  return agents.find((agent) => agent.id === slug)
}

export const navGroups: { label: string; ids: AgentId[] }[] = [
  {
    label: "Sales",
    ids: ["prospecting", "quoting", "order-entry", "customer-service"],
  },
  { label: "Production", ids: ["scheduling"] },
  { label: "Finance", ids: ["ap-ar"] },
]

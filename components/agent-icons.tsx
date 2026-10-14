import {
  CalendarClock,
  ClipboardCheck,
  Headset,
  IndianRupee,
  ReceiptText,
  Target,
  type LucideIcon,
} from "lucide-react"

import type { AgentIcon } from "@/lib/content"

export const agentIcons: Record<AgentIcon, LucideIcon> = {
  prospect: Target,
  quote: IndianRupee,
  order: ClipboardCheck,
  schedule: CalendarClock,
  service: Headset,
  ledger: ReceiptText,
}

"use client"

import {
  createContext,
  useContext,
  useMemo,
  useState,
  type ReactNode,
} from "react"

import { agents, agentsFor, type AgentId } from "@/lib/content"

type SiteState = {
  industryId: string | null
  agentId: AgentId
  selectIndustry: (id: string | null) => void
  selectAgent: (id: AgentId) => void
}

const SiteContext = createContext<SiteState | null>(null)

export function SiteProvider({ children }: { children: ReactNode }) {
  const [industryId, setIndustryId] = useState<string | null>(null)
  const [agentId, setAgentId] = useState<AgentId>(agents[0].id)

  const value = useMemo<SiteState>(() => {
    return {
      industryId,
      agentId,
      selectIndustry: (id) => {
        setIndustryId(id)
        const allowed = agentsFor(id)
        setAgentId((current) =>
          allowed.some((agent) => agent.id === current)
            ? current
            : allowed[0].id
        )
      },
      selectAgent: (id) => {
        setAgentId(id)
        setIndustryId((current) => {
          if (!current) return current
          const allowed = agentsFor(current)
          return allowed.some((agent) => agent.id === id) ? current : null
        })
      },
    }
  }, [agentId, industryId])

  return <SiteContext.Provider value={value}>{children}</SiteContext.Provider>
}

export function useSite() {
  const value = useContext(SiteContext)
  if (!value) throw new Error("useSite must be used within SiteProvider")
  return value
}

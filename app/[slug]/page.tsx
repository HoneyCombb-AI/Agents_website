import type { Metadata } from "next"
import { notFound } from "next/navigation"

import { AgentPage } from "@/components/agent-page"
import { agents, getAgent } from "@/lib/content"

export function generateStaticParams() {
  return agents.map((agent) => ({ slug: agent.id }))
}

export const dynamicParams = false

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>
}): Promise<Metadata> {
  const { slug } = await params
  const agent = getAgent(slug)
  if (!agent) return {}
  return {
    title: agent.label,
    description: agent.oneLiner,
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const agent = getAgent(slug)
  if (!agent) notFound()
  return <AgentPage agent={agent} />
}

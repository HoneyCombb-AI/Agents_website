"use client"

import type { ReactNode } from "react"

import { ApArFilm, apArDuration, apArPoster } from "@/components/demo/ap-ar"
import {
  OrderEntryFilm,
  orderEntryDuration,
  orderEntryPoster,
} from "@/components/demo/order-entry"
import { DemoPlayer } from "@/components/demo/player"
import {
  ProspectingFilm,
  prospectingDuration,
  prospectingPoster,
} from "@/components/demo/prospecting"
import {
  QuotingFilm,
  quotingDuration,
  quotingPoster,
} from "@/components/demo/quoting"
import {
  SchedulingFilm,
  schedulingDuration,
  schedulingPoster,
} from "@/components/demo/scheduling"
import {
  ServiceFilm,
  serviceDuration,
  servicePoster,
} from "@/components/demo/service"
import type { AgentId } from "@/lib/content"

const films: Record<
  AgentId,
  {
    duration: number
    poster: number
    Film: (props: { t: number }) => ReactNode
  }
> = {
  prospecting: {
    duration: prospectingDuration,
    poster: prospectingPoster,
    Film: ProspectingFilm,
  },
  quoting: {
    duration: quotingDuration,
    poster: quotingPoster,
    Film: QuotingFilm,
  },
  "order-entry": {
    duration: orderEntryDuration,
    poster: orderEntryPoster,
    Film: OrderEntryFilm,
  },
  scheduling: {
    duration: schedulingDuration,
    poster: schedulingPoster,
    Film: SchedulingFilm,
  },
  "customer-service": {
    duration: serviceDuration,
    poster: servicePoster,
    Film: ServiceFilm,
  },
  "ap-ar": {
    duration: apArDuration,
    poster: apArPoster,
    Film: ApArFilm,
  },
}

export function AgentDemo({ id, story }: { id: AgentId; story: string }) {
  const film = films[id]
  const View = film.Film
  return (
    <DemoPlayer duration={film.duration} poster={film.poster} story={story}>
      {(t) => <View t={t} />}
    </DemoPlayer>
  )
}

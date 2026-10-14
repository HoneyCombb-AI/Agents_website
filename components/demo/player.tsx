"use client"

import {
  useEffect,
  useRef,
  useState,
  useSyncExternalStore,
  type ReactNode,
} from "react"

import { STAGE } from "@/components/demo/kit"
import { cn } from "@/lib/utils"

function useFrameLock() {
  return useSyncExternalStore(
    () => () => {},
    () => {
      const frame = new URLSearchParams(window.location.search).get("frame")
      if (!frame || !Number.isFinite(Number(frame))) return null
      return Number(frame)
    },
    () => null
  )
}

function useReducedMotion() {
  return useSyncExternalStore(
    (onChange) => {
      const media = window.matchMedia("(prefers-reduced-motion: reduce)")
      media.addEventListener("change", onChange)
      return () => media.removeEventListener("change", onChange)
    },
    () => window.matchMedia("(prefers-reduced-motion: reduce)").matches,
    () => false
  )
}

export function DemoPlayer({
  duration,
  poster,
  story,
  children,
}: {
  duration: number
  poster: number
  story: string
  children: (t: number) => ReactNode
}) {
  const frameRef = useRef<HTMLDivElement>(null)
  const userPaused = useRef(false)
  const frameLock = useFrameLock()
  const reduced = useReducedMotion()
  const [playing, setPlaying] = useState(false)
  const [t, setT] = useState(0)
  const shown =
    frameLock == null
      ? reduced
        ? poster
        : t
      : Math.max(0, Math.min(duration - 1, frameLock))
  const playingNow = frameLock == null && !reduced && playing

  useEffect(() => {
    if (frameLock != null || reduced) return
    const node = frameRef.current
    if (!node) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (userPaused.current) return
        setPlaying(entry.isIntersecting && entry.intersectionRatio > 0.45)
      },
      { threshold: [0, 0.45, 0.75] }
    )
    observer.observe(node)
    return () => observer.disconnect()
  }, [frameLock, reduced])

  useEffect(() => {
    if (!playingNow) return
    let raf = 0
    let last = performance.now()
    const loop = (now: number) => {
      const dt = Math.min(48, now - last)
      last = now
      setT((current) => (current + dt) % duration)
      raf = requestAnimationFrame(loop)
    }
    raf = requestAnimationFrame(loop)
    return () => cancelAnimationFrame(raf)
  }, [playingNow, duration])

  function toggle() {
    if (frameLock != null || reduced) return
    setPlaying((current) => {
      const next = !current
      userPaused.current = !next
      return next
    })
  }

  return (
    <figure className="max-w-full min-w-0">
      <div
        ref={frameRef}
        data-demo-time={Math.round(shown)}
        className="demo-stage relative aspect-video w-full max-w-full overflow-hidden bg-[#151515]"
      >
        <div
          className="absolute top-0 left-0 origin-top-left"
          style={{
            width: STAGE.w,
            height: STAGE.h,
            zoom: `calc(100cqw / ${STAGE.w}px)`,
          }}
        >
          {children(shown)}
        </div>
        <button
          type="button"
          aria-label={playingNow ? "Pause the demo" : "Play the demo"}
          aria-pressed={playingNow}
          aria-describedby="agent-demo-description"
          onClick={toggle}
          className="absolute inset-0 cursor-pointer focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-[-6px] focus-visible:outline-ivory"
        >
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute top-1/2 left-1/2 flex size-14 -translate-x-1/2 -translate-y-1/2 items-center justify-center border border-white/40 bg-[#151515]/70 transition-opacity",
              playingNow ? "opacity-0" : "opacity-100"
            )}
          >
            <svg width="18" height="18" viewBox="0 0 18 18" fill="#fff">
              <path d="M5 3.5 15 9 5 14.5V3.5Z" />
            </svg>
          </span>
          <span
            aria-hidden
            className={cn(
              "pointer-events-none absolute bottom-3 left-3 flex size-8 items-center justify-center bg-[#151515]/70 transition-opacity",
              playingNow ? "opacity-100" : "opacity-0"
            )}
          >
            <svg width="12" height="12" viewBox="0 0 12 12" fill="#fff">
              <path d="M2.5 1.5H5V10.5H2.5V1.5ZM7 1.5H9.5V10.5H7V1.5Z" />
            </svg>
          </span>
        </button>
        <span className="pointer-events-none absolute right-3 bottom-3 bg-[#151515]/80 px-2 py-1 font-mono text-[11px] tracking-[0.12em] text-[#f3efe7] uppercase">
          Sample data
        </span>
        <span className="pointer-events-none absolute inset-x-0 bottom-0 h-0.5 bg-white/15">
          <span
            className="block h-full bg-[#f3efe7]"
            style={{ width: `${(shown / duration) * 100}%` }}
          />
        </span>
      </div>
      <figcaption id="agent-demo-description" className="sr-only">
        {story}
      </figcaption>
    </figure>
  )
}

import Image from "next/image"

import { cn } from "@/lib/utils"

export function Mark({ className }: { className?: string }) {
  return (
    <Image
      src="/honeycomb-mark.png"
      alt=""
      aria-hidden
      width={320}
      height={325}
      className={cn("h-7 w-auto", className)}
    />
  )
}

export function Logo({ className }: { className?: string }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-2.5 text-charcoal",
        className
      )}
    >
      <Mark className="h-[26px]" />
      <span className="font-display text-[15px] leading-none tracking-[0.14em] whitespace-nowrap">
        HONEYCOMB AI
      </span>
    </span>
  )
}

import { cn } from "@/lib/utils"

export function Mark({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 32 36"
      aria-hidden
      className={cn("h-7 w-auto", className)}
      fill="currentColor"
    >
      <path d="M16 1.2 29.2 8.8v15.4L16 31.8 2.8 24.2V8.8L16 1.2Zm0 3.6L6.2 10.2v12.6L16 28.2l9.8-5.4V10.2L16 4.8Z" />
      <path d="M16 11.2 22.4 14.9v7.2L16 25.8 9.6 22.1v-7.2L16 11.2Z" />
    </svg>
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
      <span className="font-display text-[15px] leading-none tracking-[0.16em]">
        HONEYCOMB
      </span>
    </span>
  )
}

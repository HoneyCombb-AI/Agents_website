import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

export function Container({ className, ...props }: ComponentProps<"div">) {
  return (
    <div
      className={cn(
        "mx-auto w-full max-w-[1280px] px-6 md:px-12 lg:px-16",
        className
      )}
      {...props}
    />
  )
}

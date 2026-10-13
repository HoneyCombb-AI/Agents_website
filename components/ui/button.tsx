import { Button as ButtonPrimitive } from "@base-ui/react/button"
import { cva, type VariantProps } from "class-variance-authority"
import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "group/button inline-flex shrink-0 items-center justify-center rounded-md border border-transparent bg-clip-padding text-xs/relaxed font-medium whitespace-nowrap transition-all outline-none select-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:shrink-0 [&_svg:not([class*='size-'])]:size-4",
  {
    variants: {
      variant: {
        default: "bg-primary text-primary-foreground hover:bg-primary/80",
        outline:
          "border-border hover:bg-input/50 hover:text-foreground aria-expanded:bg-muted aria-expanded:text-foreground",
        secondary:
          "bg-secondary text-secondary-foreground hover:bg-secondary/80",
        ghost: "hover:bg-muted hover:text-foreground",
        destructive:
          "bg-destructive/10 text-destructive hover:bg-destructive/20",
        link: "text-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-7 gap-1 px-2 text-xs/relaxed",
        sm: "h-6 gap-1 px-2 text-xs/relaxed",
        lg: "h-8 gap-1 px-2.5 text-xs/relaxed",
        icon: "size-7",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

const ctaVariants = cva(
  "inline-flex items-center justify-center rounded-[4px] font-body font-medium tracking-[0.04em] transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-charcoal",
  {
    variants: {
      tone: {
        primary: "bg-charcoal text-white hover:bg-graphite",
        cream: "bg-cream text-charcoal hover:bg-mist",
        outline:
          "border border-charcoal bg-transparent text-charcoal hover:bg-charcoal hover:text-white",
      },
      size: {
        nav: "h-9 px-5 text-[13px]",
        pill: "px-7 py-[0.875rem] text-[14px] leading-5",
      },
    },
    defaultVariants: {
      tone: "primary",
      size: "pill",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  ...props
}: ButtonPrimitive.Props & VariantProps<typeof buttonVariants>) {
  return (
    <ButtonPrimitive
      data-slot="button"
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

function Cta({
  className,
  tone,
  size,
  ...props
}: ComponentProps<"a"> & VariantProps<typeof ctaVariants>) {
  return <a className={cn(ctaVariants({ tone, size }), className)} {...props} />
}

export { Button, buttonVariants, Cta, ctaVariants }

import * as React from "react"
import * as TogglePrimitive from "@radix-ui/react-toggle"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const toggleVariants = cva(
  "inline-flex items-center justify-center gap-2 rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 data-[state=on]:bg-md-primary data-[state=on]:text-primary-foreground data-[state=on]:shadow-md [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 [&_svg]:shrink-0 outline-none active:scale-95 whitespace-nowrap",
  {
    variants: {
      variant: {
        default: "bg-transparent text-on-surface-variant hover:bg-md-primary/10",
        outline:
          "border border-outline bg-transparent hover:bg-md-primary/5",
      },
      size: {
        default: "h-10 px-3 min-w-10",
        sm: "h-9 px-2 min-w-9",
        lg: "h-11 px-4 min-w-11",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Toggle({
  className,
  variant,
  size,
  ...props
}: React.ComponentProps<typeof TogglePrimitive.Root> &
  VariantProps<typeof toggleVariants>) {
  return (
    <TogglePrimitive.Root
      data-slot="toggle"
      className={cn(toggleVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Toggle, toggleVariants }

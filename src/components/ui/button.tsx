import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva, type VariantProps } from "class-variance-authority"

import { cn } from "@/lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-full text-sm font-medium transition-all duration-300 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg:not([class*='size-'])]:size-4 shrink-0 [&_svg]:shrink-0 outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-ring active:scale-95",
  {
    variants: {
      variant: {
        default: "bg-md-primary text-primary-foreground hover:bg-md-primary/90 active:bg-md-primary/80 shadow-none hover:shadow-md",
        destructive:
          "bg-destructive text-white hover:bg-destructive/90 focus-visible:ring-destructive/20 dark:focus-visible:ring-destructive/40 dark:bg-destructive/60",
        outline:
          "border border-outline bg-transparent text-md-primary hover:bg-md-primary/5",
        secondary:
          "bg-secondary-container text-secondary-container-foreground hover:bg-secondary-container/90",
        ghost:
          "bg-transparent hover:bg-md-primary/10 text-md-primary",
        link: "text-md-primary underline-offset-4 hover:underline",
      },
      size: {
        default: "h-10 px-6 has-[>svg]:px-4",
        sm: "h-9 px-4 gap-1.5 has-[>svg]:px-3",
        lg: "h-12 px-8 has-[>svg]:px-6",
        icon: "size-9",
        "icon-sm": "size-8",
        "icon-lg": "size-10",
      },
    },
    defaultVariants: {
      variant: "default",
      size: "default",
    },
  }
)

function Button({
  className,
  variant = "default",
  size = "default",
  asChild = false,
  ...props
}: React.ComponentProps<"button"> &
  VariantProps<typeof buttonVariants> & {
    asChild?: boolean
  }) {
  const Comp = asChild ? Slot : "button"

  return (
    <Comp
      data-slot="button"
      data-variant={variant}
      data-size={size}
      className={cn(buttonVariants({ variant, size, className }))}
      {...props}
    />
  )
}

export { Button, buttonVariants }

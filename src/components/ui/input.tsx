import * as React from "react"

import { cn } from "@/lib/utils"

function Input({ className, type, ...props }: React.ComponentProps<"input">) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        "file:text-foreground placeholder:text-on-surface-variant/60 selection:bg-md-primary selection:text-primary-foreground bg-surface-container-low border-0 border-b-2 border-outline h-14 w-full min-w-0 rounded-t-[12px] rounded-bl-none rounded-br-none px-4 text-base shadow-none transition-colors duration-200 outline-none disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        "focus-visible:border-b-2 focus-visible:border-b-md-primary focus-visible:ring-0",
        "aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive",
        className
      )}
      {...props}
    />
  )
}

export { Input }

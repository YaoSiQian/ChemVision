import * as React from "react"

import { cn } from "@/lib/utils"

function Textarea({ className, ...props }: React.ComponentProps<"textarea">) {
  return (
    <textarea
      data-slot="textarea"
      className={cn(
        "bg-surface-container-low border-0 border-b-2 border-outline placeholder:text-on-surface-variant/60 flex field-sizing-content min-h-16 w-full rounded-t-[12px] rounded-bl-none rounded-br-none px-4 py-2 text-base transition-colors duration-200 outline-none focus-visible:border-b-2 focus-visible:border-b-primary focus-visible:ring-0 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
        className
      )}
      {...props}
    />
  )
}

export { Textarea }

import * as React from "react"
import { cn } from "../../lib/utils"

function Badge({ className, ...props }) {
  return <span className={cn("inline-flex items-center rounded-full px-2.5 py-1 text-xs font-bold", className)} {...props} />
}
export { Badge }

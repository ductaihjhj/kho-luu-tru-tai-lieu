import * as React from "react"
import { cn } from "../../lib/utils"

const Input = React.forwardRef(({ className, type = "text", ...props }, ref) => (
  <input
    type={type}
    ref={ref}
    className={cn("w-full rounded-2xl border-2 border-purple-100 bg-white px-4 py-3 text-sm font-medium text-gray-700 placeholder:text-gray-300 focus:border-purple-400 focus:outline-none", className)}
    {...props}
  />
))
Input.displayName = "Input"
export { Input }

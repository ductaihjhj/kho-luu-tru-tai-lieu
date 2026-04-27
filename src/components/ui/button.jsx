import * as React from "react"
import { Slot } from "@radix-ui/react-slot"
import { cva } from "class-variance-authority"
import { cn } from "../../lib/utils"

const buttonVariants = cva(
  "inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-2xl text-sm font-bold transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-purple-300 disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        default: "bg-gradient-to-r from-purple-400 to-pink-400 text-white shadow-lg hover:shadow-xl",
        secondary: "bg-white/70 text-purple-700 hover:bg-white shadow-sm",
        outline: "border-2 border-purple-200 bg-white text-purple-600 hover:bg-purple-50",
        ghost: "text-purple-600 hover:bg-white/60",
        destructive: "bg-rose-500 text-white hover:bg-rose-600",
      },
      size: {
        default: "h-11 px-5 py-2",
        sm: "h-9 px-3 text-xs",
        lg: "h-13 px-7 text-base",
        icon: "h-10 w-10",
      },
    },
    defaultVariants: { variant: "default", size: "default" },
  }
)

const Button = React.forwardRef(({ className, variant, size, asChild = false, ...props }, ref) => {
  const Comp = asChild ? Slot : "button"
  return <Comp ref={ref} className={cn(buttonVariants({ variant, size, className }), "btn-bounce")} {...props} />
})
Button.displayName = "Button"

export { Button, buttonVariants }

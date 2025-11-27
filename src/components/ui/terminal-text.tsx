import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"

interface TerminalTextProps {
  text: string
  speed?: number
  onComplete?: () => void
  className?: string
}

export function TerminalText({ text, speed = 50, onComplete, className = "" }: TerminalTextProps) {
  const [displayedText, setDisplayedText] = useState("")
  const [isComplete, setIsComplete] = useState(false)

  useEffect(() => {
    if (displayedText.length < text.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(text.slice(0, displayedText.length + 1))
      }, speed)

      return () => clearTimeout(timeout)
    } else if (displayedText.length === text.length && !isComplete) {
      setIsComplete(true)
      onComplete?.()
    }
  }, [displayedText, text, speed, isComplete, onComplete])

  return (
    <div
      className={cn("font-mono text-green-400", className)}
    >
      <span>{displayedText}</span>
      <span className={cn("ml-1 inline-block w-2 h-6 bg-green-400", { "animate-caret-blink": isComplete })} />
    </div>
  )
}
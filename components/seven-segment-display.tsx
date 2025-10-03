import { memo } from "react"
import { SevenSegmentDigit } from "./seven-segment-digit"

interface SevenSegmentDisplayProps {
  value: string
  size?: "sm" | "md" | "lg"
  digitWidth?: number
  digitHeight?: number
  colonWidth?: number
  thickness?: number
  gap?: number
}

export const SevenSegmentDisplay = memo(function SevenSegmentDisplay({ value, size = "md", digitWidth, digitHeight, colonWidth, thickness, gap = 4 }: SevenSegmentDisplayProps) {
  // detect leading zeros
  let foundNonZero = false
  const chars = value.split("")
  
  return (
    <div className="flex items-center justify-center" style={{ gap: `${gap}px` }}>
      {chars.map((char, index) => {
        if (char === ":") {
          const dotSize = thickness ?? 8
          const gapBetweenDots = (digitHeight ? digitHeight / 3 : 20)
          const colonOpacity = foundNonZero ? 1 : 0.2
          return (
            <div key={index} className="flex flex-col justify-center items-center mx-1" style={{ width: colonWidth, height: digitHeight, opacity: colonOpacity }}>
              <div className="bg-foreground" style={{ width: dotSize, height: dotSize }}></div>
              <div style={{ height: gapBetweenDots }}></div>
              <div className="bg-foreground" style={{ width: dotSize, height: dotSize }}></div>
            </div>
          )
        }
        
        const isLeadingZero = !foundNonZero && char === "0"
        if (char !== "0") {
          foundNonZero = true
        }
        
        return (
          <SevenSegmentDigit 
            key={index} 
            digit={char} 
            size={size} 
            width={digitWidth} 
            height={digitHeight} 
            thickness={thickness}
            opacity={isLeadingZero ? 0.2 : 1}
          />
        )
      })}
    </div>
  )
})


import { SevenSegmentDigit } from "./seven-segment-digit"

interface SevenSegmentDisplayProps {
  value: string
  size?: "sm" | "md" | "lg"
  digitWidth?: number
  digitHeight?: number
  colonWidth?: number
  thickness?: number
}

export function SevenSegmentDisplay({ value, size = "md", digitWidth, digitHeight, colonWidth, thickness }: SevenSegmentDisplayProps) {
  return (
    <div className="flex items-center justify-center gap-1">
      {value.split("").map((char, index) => {
        if (char === ":") {
          const dotSize = thickness ?? 8
          const gapBetweenDots = (digitHeight ? digitHeight / 3 : 20)
          return (
            <div key={index} className="flex flex-col justify-center items-center mx-1" style={{ width: colonWidth, height: digitHeight }}>
              <div className="bg-foreground" style={{ width: dotSize, height: dotSize }}></div>
              <div style={{ height: gapBetweenDots }}></div>
              <div className="bg-foreground" style={{ width: dotSize, height: dotSize }}></div>
            </div>
          )
        }
        return <SevenSegmentDigit key={index} digit={char} size={size} width={digitWidth} height={digitHeight} thickness={thickness} />
      })}
    </div>
  )
}


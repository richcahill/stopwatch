import { memo } from "react"

interface SevenSegmentDigitProps {
  digit: string
  size?: "sm" | "md" | "lg"
  width?: number
  height?: number
  thickness?: number
  opacity?: number
}

export const SevenSegmentDigit = memo(function SevenSegmentDigit({ digit, size = "md", width: customWidth, height: customHeight, thickness: customThickness, opacity = 1 }: SevenSegmentDigitProps) {
  const segments = {
    "0": [true, true, true, false, true, true, true],
    "1": [false, false, true, false, false, true, false],
    "2": [true, false, true, true, true, false, true],
    "3": [true, false, true, true, false, true, true],
    "4": [false, true, true, true, false, true, false],
    "5": [true, true, false, true, false, true, true],
    "6": [true, true, false, true, true, true, true],
    "7": [true, false, true, false, false, true, false],
    "8": [true, true, true, true, true, true, true],
    "9": [true, true, true, true, false, true, true],
  }

  const activeSegments = segments[digit as keyof typeof segments] || [false, false, false, false, false, false, false]

  const sizeClasses = {
    sm: { width: 24, height: 40, thickness: 3, gap: 2 },
    md: { width: 40, height: 70, thickness: 5, gap: 3 },
    lg: { width: 60, height: 100, thickness: 7, gap: 4 },
  }

  const baseSettings = sizeClasses[size]
  const width = customWidth ?? baseSettings.width
  const height = customHeight ?? baseSettings.height
  const thickness = customThickness ?? baseSettings.thickness
  const gap = baseSettings.gap

  const getSegmentColor = (isActive: boolean) => 
    isActive 
      ? "fill-foreground" 
      : "fill-foreground/10"

  const bevel = thickness * 0.5 // angle cut for octagonal style

  return (
    <svg 
      width={width} 
      height={height} 
      viewBox={`0 0 ${width} ${height}`}
      style={{ display: 'block', opacity }}
    >
      {/* segment a (top) */}
      <path
        d={`
          M ${thickness+bevel} 0
          L ${width-thickness-bevel} 0
          L ${width-thickness} ${bevel}
          L ${width-thickness} ${thickness-bevel}
          L ${width-thickness-bevel} ${thickness}
          L ${thickness+bevel} ${thickness}
          L ${thickness} ${thickness-bevel}
          L ${thickness} ${bevel}
          Z
        `}
        className={getSegmentColor(activeSegments[0])}
        fillRule="evenodd"
      />
      
      {/* segment b (top left) */}
      <path
        d={`
          M 0 ${thickness+bevel}
          L ${bevel} ${thickness}
          L ${thickness-bevel} ${thickness}
          L ${thickness} ${thickness+bevel}
          L ${thickness} ${height/2-gap-bevel}
          L ${thickness-bevel} ${height/2-gap}
          L ${bevel} ${height/2-gap}
          L 0 ${height/2-gap-bevel}
          Z
        `}
        className={getSegmentColor(activeSegments[1])}
        fillRule="evenodd"
      />
      
      {/* segment c (top right) */}
      <path
        d={`
          M ${width} ${thickness+bevel}
          L ${width} ${height/2-gap-bevel}
          L ${width-bevel} ${height/2-gap}
          L ${width-thickness+bevel} ${height/2-gap}
          L ${width-thickness} ${height/2-gap-bevel}
          L ${width-thickness} ${thickness+bevel}
          L ${width-thickness+bevel} ${thickness}
          L ${width-bevel} ${thickness}
          Z
        `}
        className={getSegmentColor(activeSegments[2])}
        fillRule="evenodd"
      />
      
      {/* segment d (middle) */}
      <path
        d={`
          M ${thickness+bevel} ${height/2-thickness/2}
          L ${width-thickness-bevel} ${height/2-thickness/2}
          L ${width-thickness} ${height/2-thickness/2+bevel}
          L ${width-thickness} ${height/2+thickness/2-bevel}
          L ${width-thickness-bevel} ${height/2+thickness/2}
          L ${thickness+bevel} ${height/2+thickness/2}
          L ${thickness} ${height/2+thickness/2-bevel}
          L ${thickness} ${height/2-thickness/2+bevel}
          Z
        `}
        className={getSegmentColor(activeSegments[3])}
        fillRule="evenodd"
      />
      
      {/* segment e (bottom left) */}
      <path
        d={`
          M 0 ${height/2+gap+bevel}
          L ${bevel} ${height/2+gap}
          L ${thickness-bevel} ${height/2+gap}
          L ${thickness} ${height/2+gap+bevel}
          L ${thickness} ${height-thickness-bevel}
          L ${thickness-bevel} ${height-thickness}
          L ${bevel} ${height-thickness}
          L 0 ${height-thickness-bevel}
          Z
        `}
        className={getSegmentColor(activeSegments[4])}
        fillRule="evenodd"
      />
      
      {/* segment f (bottom right) */}
      <path
        d={`
          M ${width} ${height/2+gap+bevel}
          L ${width} ${height-thickness-bevel}
          L ${width-bevel} ${height-thickness}
          L ${width-thickness+bevel} ${height-thickness}
          L ${width-thickness} ${height-thickness-bevel}
          L ${width-thickness} ${height/2+gap+bevel}
          L ${width-thickness+bevel} ${height/2+gap}
          L ${width-bevel} ${height/2+gap}
          Z
        `}
        className={getSegmentColor(activeSegments[5])}
        fillRule="evenodd"
      />
      
      {/* segment g (bottom) */}
      <path
        d={`
          M ${thickness+bevel} ${height-thickness}
          L ${width-thickness-bevel} ${height-thickness}
          L ${width-thickness} ${height-thickness+bevel}
          L ${width-thickness} ${height-bevel}
          L ${width-thickness-bevel} ${height}
          L ${thickness+bevel} ${height}
          L ${thickness} ${height-bevel}
          L ${thickness} ${height-thickness+bevel}
          Z
        `}
        className={getSegmentColor(activeSegments[6])}
        fillRule="evenodd"
      />
    </svg>
  )
})


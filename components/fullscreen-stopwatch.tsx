"use client"

import { useState, useEffect, useRef } from "react"
import { SevenSegmentDisplay } from "./seven-segment-display"

export function FullscreenStopwatch() {
  // adjustable segment thickness multiplier (1.0 = normal, >1.0 = thicker, <1.0 = thinner)
  const SEGMENT_THICKNESS_MULTIPLIER = 2.0
  
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [digitWidth, setDigitWidth] = useState(60)
  const [digitHeight, setDigitHeight] = useState(100)
  const [colonWidth, setColonWidth] = useState(16)
  const [thickness, setThickness] = useState(7)
  const containerRef = useRef<HTMLDivElement>(null)
  const intervalRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10)
      }, 10)
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [isRunning])

  useEffect(() => {
    const calculateDimensions = () => {
      if (!containerRef.current) return

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight

      const padding = 40  // padding on each side (top, right, bottom, left)
      const gap = 4

      // calculate thickness based on screen area (geometric mean of dimensions)
      const screenArea = viewportWidth * viewportHeight
      const areaDimension = Math.sqrt(screenArea)
      const newThickness = Math.max(5, areaDimension * 0.008 * SEGMENT_THICKNESS_MULTIPLIER)

      // scale gap proportionally based on area
      const scaledGap = Math.max(2, areaDimension * 0.004)

      // calculate height (subtract padding from top and bottom)
      const newDigitHeight = viewportHeight - (padding * 2)

      // calculate width - need to account for 6 digits + 2 colons + 7 gaps + padding left and right
      const newColonWidth = areaDimension * 0.01
      const totalGaps = scaledGap * 7
      const availableWidth = viewportWidth - (padding * 2) - totalGaps - (newColonWidth * 2)
      const newDigitWidth = availableWidth / 6

      setDigitHeight(newDigitHeight)
      setDigitWidth(newDigitWidth)
      setColonWidth(newColonWidth)
      setThickness(newThickness)
    }

    calculateDimensions()
    window.addEventListener("resize", calculateDimensions)
    return () => window.removeEventListener("resize", calculateDimensions)
  }, [SEGMENT_THICKNESS_MULTIPLIER])

  const formatTime = (milliseconds: number) => {
    const totalSeconds = Math.floor(milliseconds / 1000)
    const hours = Math.floor(totalSeconds / 3600)
    const minutes = Math.floor((totalSeconds % 3600) / 60)
    const seconds = totalSeconds % 60

    return {
      hours: hours.toString().padStart(2, "0"),
      minutes: minutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
    }
  }

  const { hours, minutes, seconds } = formatTime(time)

  return (
    <div 
      ref={containerRef}
      className="flex items-center justify-center min-h-screen"
    >
      <SevenSegmentDisplay 
        value={`${hours}:${minutes}:${seconds}`} 
        size="lg"
        digitWidth={digitWidth}
        digitHeight={digitHeight}
        colonWidth={colonWidth}
        thickness={thickness}
      />
    </div>
  )
}


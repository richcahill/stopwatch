"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { SevenSegmentDisplay } from "./seven-segment-display"
import { Button } from "./ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"

export function FullscreenStopwatch() {
  // adjustable segment thickness multiplier (1.0 = normal, >1.0 = thicker, <1.0 = thinner)
  const SEGMENT_THICKNESS_MULTIPLIER = 2.0
  
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
  const [digitWidth, setDigitWidth] = useState(60)
  const [digitHeight, setDigitHeight] = useState(100)
  const [colonWidth, setColonWidth] = useState(16)
  const [thickness, setThickness] = useState(7)
  const [gap, setGap] = useState(8)
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

  const handleStartStop = useCallback(() => {
    setIsRunning((prev) => !prev)
  }, [])

  const handleReset = useCallback(() => {
    setIsRunning(false)
    setTime(0)
  }, [])

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault()
        handleStartStop()
      } else if (e.code === "KeyR") {
        e.preventDefault()
        handleReset()
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [handleStartStop, handleReset])

  useEffect(() => {
    const calculateDimensions = () => {
      if (!containerRef.current) return

      const viewportWidth = window.innerWidth
      const viewportHeight = window.innerHeight - 64  // subtract navbar height (h-16 = 64px)

      const padding = 40  // padding on each side (top, right, bottom, left)
      const controlsHeight = 140  // space for buttons and text below display

      // calculate thickness based on screen area (geometric mean of dimensions)
      const screenArea = viewportWidth * viewportHeight
      const areaDimension = Math.sqrt(screenArea)
      const newThickness = Math.max(5, areaDimension * 0.008 * SEGMENT_THICKNESS_MULTIPLIER)

      // scale gap proportionally based on area (doubled for more spacing)
      const newGap = Math.max(8, areaDimension * 0.008)

      // calculate height (subtract padding, controls height, and gaps)
      const newDigitHeight = viewportHeight - (padding * 2) - controlsHeight

      // calculate width - need to account for 6 digits + 2 colons + 7 gaps + padding left and right
      const newColonWidth = areaDimension * 0.01
      const totalGaps = newGap * 7
      const availableWidth = viewportWidth - (padding * 2) - totalGaps - (newColonWidth * 2)
      const newDigitWidth = availableWidth / 6

      setDigitHeight(newDigitHeight)
      setDigitWidth(newDigitWidth)
      setColonWidth(newColonWidth)
      setThickness(newThickness)
      setGap(newGap)
    }

    calculateDimensions()
    window.addEventListener("resize", calculateDimensions)
    return () => window.removeEventListener("resize", calculateDimensions)
  }, [SEGMENT_THICKNESS_MULTIPLIER])

  const formatTime = (milliseconds: number) => {
    const totalMinutes = Math.floor(milliseconds / 60000)
    const seconds = Math.floor((milliseconds % 60000) / 1000)
    const ms = Math.floor((milliseconds % 1000) / 10)

    return {
      minutes: totalMinutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      milliseconds: ms.toString().padStart(2, "0"),
    }
  }

  const { minutes, seconds, milliseconds } = formatTime(time)

  return (
    <div 
      ref={containerRef}
      className="flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-8"
    >
      <SevenSegmentDisplay 
        value={`${minutes}:${seconds}:${milliseconds}`} 
        size="lg"
        digitWidth={digitWidth}
        digitHeight={digitHeight}
        colonWidth={colonWidth}
        thickness={thickness}
        gap={gap}
      />
      <div className="flex gap-4">
        <Button
          size="lg"
          onClick={handleStartStop}
          variant={isRunning ? "secondary" : "default"}
        >
          {isRunning ? (
            <>
              <Pause className="mr-2 h-5 w-5" />
              pause
            </>
          ) : (
            <>
              <Play className="mr-2 h-5 w-5" />
              start
            </>
          )}
        </Button>
        <Button
          size="lg"
          onClick={handleReset}
          variant="outline"
        >
          <RotateCcw className="mr-2 h-5 w-5" />
          reset
        </Button>
      </div>
      <p className="text-sm text-muted-foreground">
        press <kbd className="px-2 py-1 bg-muted rounded">space</kbd> to start/pause, <kbd className="px-2 py-1 bg-muted rounded">r</kbd> to reset
      </p>
    </div>
  )
}



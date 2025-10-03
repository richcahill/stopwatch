"use client"

import { useState, useEffect, useRef, useCallback } from "react"
import { SevenSegmentDisplay } from "./seven-segment-display"
import { Button } from "./ui/button"
import { Play, Pause, RotateCcw } from "lucide-react"

export function Stopwatch() {
  const [time, setTime] = useState(0)
  const [isRunning, setIsRunning] = useState(false)
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
    <div className="flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-8">
      <SevenSegmentDisplay value={`${minutes}:${seconds}:${milliseconds}`} size="lg" />
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


"use client";

import { useState, useEffect, useCallback } from "react";
import { SevenSegmentDisplay } from "@/components/seven-segment-display";
import { LapTimes } from "@/components/lap-times";
import { StopwatchControls } from "@/components/stopwatch-controls";
import { useStopwatch } from "@/lib/useStopwatch";

export default function Home() {
  const {
    time,
    isRunning,
    laps,
    handleStartStop,
    handleReset,
    handleLap,
    formatTime,
  } = useStopwatch();

  const [isFullscreen, setIsFullscreen] = useState(false);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.code === "Space") {
        e.preventDefault();
        handleStartStop();
      } else if (e.code === "KeyR") {
        e.preventDefault();
        handleReset();
      } else if (e.code === "KeyL") {
        e.preventDefault();
        handleLap();
      } else if (e.code === "KeyF") {
        e.preventDefault();
        toggleFullscreen();
      }
    };

    window.addEventListener("keydown", handleKeyPress);
    return () => window.removeEventListener("keydown", handleKeyPress);
  }, [handleStartStop, handleReset, handleLap, toggleFullscreen]);

  const { minutes, seconds, milliseconds } = formatTime(time);

  return (
    <div className="relative">
      <div
        className={
          isFullscreen
            ? "flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-2"
            : "flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-2 py-8"
        }
      >
        <div className="flex flex-col items-center gap-2 px-4">
          <SevenSegmentDisplay
            value={`${minutes}:${seconds}:${milliseconds}`}
            size="lg"
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
          />
          <div className="w-fit min-w-full">
            <div className="border rounded-[1rem] overflow-hidden bg-muted p-1">
              <StopwatchControls
                isRunning={isRunning}
                time={time}
                onStartStop={handleStartStop}
                onLap={handleLap}
                onReset={handleReset}
                showFullscreenToggle={false}
              />
            </div>
          </div>
          <LapTimes laps={laps} />
        </div>
      </div>
    </div>
  );
}

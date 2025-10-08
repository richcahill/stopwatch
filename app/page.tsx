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
            ? "flex flex-col items-center justify-center h-[calc(100vh-4rem)] gap-2 pb-32"
            : "flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] gap-2 pb-32"
        }
      >
        <div className="flex flex-col items-center gap-8 px-4">
          <SevenSegmentDisplay
            value={`${minutes}:${seconds}:${milliseconds}`}
            size="lg"
            isFullscreen={isFullscreen}
            onToggleFullscreen={toggleFullscreen}
          />
          <LapTimes laps={laps} />
        </div>
      </div>

      {/* dock-style controls at bottom */}
      <div className="fixed bottom-6 left-0 right-0 flex justify-center z-50 pointer-events-none">
        <div className="pointer-events-auto backdrop-blur-xl bg-background/80 border rounded-2xl px-6 py-4 shadow-2xl">
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
    </div>
  );
}

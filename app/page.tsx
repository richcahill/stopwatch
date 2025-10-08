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
    <>
      <div className="flex flex-col items-center h-[calc(100vh-4rem)] px-4">
        <div className="flex flex-col w-fit h-full">
          <div className="flex-1 overflow-auto flex flex-col items-center justify-center py-8">
            <div className="flex flex-col items-center gap-2">
              <SevenSegmentDisplay
                value={`${minutes}:${seconds}:${milliseconds}`}
                size="lg"
                isFullscreen={false}
                onToggleFullscreen={toggleFullscreen}
              />
              {laps.length > 0 && (
                <div className="w-full animate-slide-up">
                  <LapTimes laps={laps} />
                </div>
              )}
            </div>
          </div>

          <div className="flex-shrink-0 pb-4">
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
        </div>
      </div>

      {isFullscreen && (
        <div className="fixed inset-0 z-50 bg-background flex items-center justify-center p-8">
          <SevenSegmentDisplay
            value={`${minutes}:${seconds}:${milliseconds}`}
            size="lg"
            isFullscreen={true}
            onToggleFullscreen={toggleFullscreen}
          />
        </div>
      )}
    </>
  );
}

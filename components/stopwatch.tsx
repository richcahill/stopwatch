"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import { SevenSegmentDisplay } from "./seven-segment-display";
import { LapTimes } from "./lap-times";
import { StopwatchControls } from "./stopwatch-controls";
import { useStopwatch } from "@/lib/useStopwatch";
import { Button } from "./ui/button";
import { PanelRightOpen, PanelRightClose } from "lucide-react";

export function Stopwatch() {
  const SEGMENT_THICKNESS_MULTIPLIER = 2.0;

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
  const [digitWidth, setDigitWidth] = useState(60);
  const [digitHeight, setDigitHeight] = useState(100);
  const [colonWidth, setColonWidth] = useState(16);
  const [thickness, setThickness] = useState(7);
  const [gap, setGap] = useState(8);
  const [showLaps, setShowLaps] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);

  const toggleFullscreen = useCallback(() => {
    setIsFullscreen((prev) => !prev);
  }, []);

  const toggleLaps = useCallback(() => {
    setShowLaps((prev) => !prev);
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

  useEffect(() => {
    if (!isFullscreen) return;

    const calculateDimensions = () => {
      if (!containerRef.current) return;

      const viewportWidth = window.innerWidth;
      const viewportHeight = window.innerHeight - 64;

      const padding = 40;
      const controlsHeight = 140;

      const screenArea = viewportWidth * viewportHeight;
      const areaDimension = Math.sqrt(screenArea);
      const newThickness = Math.max(
        5,
        areaDimension * 0.008 * SEGMENT_THICKNESS_MULTIPLIER
      );

      const newGap = Math.max(8, areaDimension * 0.008);

      const newDigitHeight = viewportHeight - padding * 2 - controlsHeight;

      const newColonWidth = areaDimension * 0.01;
      const totalGaps = newGap * 7;
      const availableWidth =
        viewportWidth - padding * 2 - totalGaps - newColonWidth * 2;
      const newDigitWidth = availableWidth / 6;

      setDigitHeight(newDigitHeight);
      setDigitWidth(newDigitWidth);
      setColonWidth(newColonWidth);
      setThickness(newThickness);
      setGap(newGap);
    };

    calculateDimensions();
    window.addEventListener("resize", calculateDimensions);
    return () => window.removeEventListener("resize", calculateDimensions);
  }, [isFullscreen, SEGMENT_THICKNESS_MULTIPLIER]);

  const { minutes, seconds, milliseconds } = formatTime(time);

  return (
    <div
      ref={containerRef}
      className="relative flex h-[calc(100vh-4rem)] w-full"
    >
      {/* main area - centered stopwatch display */}
      <div className="flex-1 flex items-center justify-center">
        <SevenSegmentDisplay
          value={`${minutes}:${seconds}:${milliseconds}`}
          size="lg"
          {...(isFullscreen && {
            digitWidth,
            digitHeight,
            colonWidth,
            thickness,
            gap,
          })}
        />
      </div>

      {/* controls anchored bottom left */}
      <div className="absolute bottom-8 left-8">
        <StopwatchControls
          isRunning={isRunning}
          time={time}
          onStartStop={handleStartStop}
          onLap={handleLap}
          onReset={handleReset}
          isFullscreen={isFullscreen}
          onToggleFullscreen={toggleFullscreen}
          showFullscreenToggle={true}
          showKeyboardHints={true}
        />
      </div>

      {/* laps toggle anchored bottom right */}
      <div className="absolute bottom-8 right-8">
        <Button size="lg" variant="outline" onClick={toggleLaps}>
          {showLaps ? (
            <>
              <PanelRightClose className="mr-2 h-5 w-5" />
              hide laps
            </>
          ) : (
            <>
              <PanelRightOpen className="mr-2 h-5 w-5" />
              show laps
            </>
          )}
        </Button>
      </div>

      {/* laps panel slides in from right */}
      {showLaps && (
        <div className="w-[400px] border-l bg-background flex flex-col">
          <div className="flex-1 overflow-auto p-8">
            <LapTimes laps={laps} />
          </div>
        </div>
      )}
    </div>
  );
}

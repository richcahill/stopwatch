"use client";

import { Button } from "./ui/button";
import {
  Play,
  Pause,
  RotateCcw,
  Flag,
  Maximize2,
  Minimize2,
} from "lucide-react";

interface StopwatchControlsProps {
  isRunning: boolean;
  time: number;
  onStartStop: () => void;
  onLap: () => void;
  onReset: () => void;
  isFullscreen?: boolean;
  onToggleFullscreen?: () => void;
  showFullscreenToggle?: boolean;
  showKeyboardHints?: boolean;
}

export function StopwatchControls({
  isRunning,
  time,
  onStartStop,
  onLap,
  onReset,
  isFullscreen = false,
  onToggleFullscreen,
  showFullscreenToggle = true,
  showKeyboardHints = false,
}: StopwatchControlsProps) {
  return (
    <div className="flex flex-col items-center gap-2 w-full p-0">
      <div className="flex gap-1 w-full">
        <Button
          className="flex-1 flex justify-between items-center font-mono tracking-wide rounded-[0.8rem]"
          size="lg"
          onClick={onStartStop}
          variant={isRunning ? "outline" : "default"}
        >
          {isRunning ? (
            <>
              PAUSE
              <Pause className="h-5 w-5" />
            </>
          ) : (
            <>
              START
              <Play className="h-5 w-5" />
            </>
          )}
        </Button>
        <Button
          size="lg"
          onClick={onLap}
          variant="outline"
          disabled={time === 0}
          className="flex justify-between items-center gap-2 font-mono tracking-wide rounded-[0.8rem]"
        >
          LAP
          <Flag className="h-5 w-5" />
        </Button>
        <Button
          size="lg"
          onClick={onReset}
          variant="outline"
          className="flex justify-between items-center gap-2 font-mono tracking-wide rounded-[0.8rem]"
        >
          RESET
          <RotateCcw className="h-5 w-5" />
        </Button>
        {showFullscreenToggle && onToggleFullscreen && (
          <Button size="lg" onClick={onToggleFullscreen} variant="outline">
            {isFullscreen ? (
              <>
                <Minimize2 className="mr-2 h-5 w-5" />
                COMPACT
              </>
            ) : (
              <>
                <Maximize2 className="mr-2 h-5 w-5" />
                FULLSCREEN
              </>
            )}
          </Button>
        )}
      </div>
      {showKeyboardHints && (
        <p className="text-sm text-muted-foreground">
          press <kbd className="px-2 py-1 bg-muted rounded">space</kbd> to
          start/pause, <kbd className="px-2 py-1 bg-muted rounded">l</kbd> for
          lap, <kbd className="px-2 py-1 bg-muted rounded">r</kbd> to reset
          {showFullscreenToggle && (
            <>
              , <kbd className="px-2 py-1 bg-muted rounded">f</kbd> to toggle
              fullscreen
            </>
          )}
        </p>
      )}
    </div>
  );
}

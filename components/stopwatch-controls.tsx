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
    <div className="flex flex-col items-center gap-2 w-full">
      <div className="flex gap-2">
        <Button
          className="min-w-32 flex justify-between items-center"
          size="lg"
          onClick={onStartStop}
          variant={isRunning ? "secondary" : "default"}
        >
          {isRunning ? (
            <>
              pause
              <Pause className="h-5 w-5" />
            </>
          ) : (
            <>
              start
              <Play className="h-5 w-5" />
            </>
          )}
        </Button>
        <Button
          size="lg"
          onClick={onLap}
          variant="outline"
          disabled={time === 0}
          className="flex justify-between items-center min-w-32"
        >
          lap
          <Flag className="h-5 w-5" />
        </Button>
        <Button size="lg" onClick={onReset} variant="outline">
          reset
          <RotateCcw className="h-5 w-5" />
        </Button>
        {showFullscreenToggle && onToggleFullscreen && (
          <Button size="lg" onClick={onToggleFullscreen} variant="outline">
            {isFullscreen ? (
              <>
                <Minimize2 className="mr-2 h-5 w-5" />
                compact
              </>
            ) : (
              <>
                <Maximize2 className="mr-2 h-5 w-5" />
                fullscreen
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

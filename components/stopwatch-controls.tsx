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
  showKeyboardHints = true,
}: StopwatchControlsProps) {
  return (
    <div className="flex flex-col items-center gap-4">
      <div className="flex gap-4">
        <Button
          size="lg"
          onClick={onStartStop}
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
          onClick={onLap}
          variant="outline"
          disabled={time === 0}
        >
          <Flag className="mr-2 h-5 w-5" />
          lap
        </Button>
        <Button size="lg" onClick={onReset} variant="outline">
          <RotateCcw className="mr-2 h-5 w-5" />
          reset
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

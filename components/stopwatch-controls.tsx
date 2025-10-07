"use client";

import { Button } from "./ui/button";
import {
  Play,
  Pause,
  RotateCcw,
  Flag,
  Maximize2,
  Minimize2,
  Keyboard,
} from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover";

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
        {showKeyboardHints && (
          <Popover>
            <PopoverTrigger asChild>
              <Button size="lg" variant="ghost">
                <Keyboard className="h-5 w-5" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80">
              <div className="space-y-2">
                <h4 className="font-medium text-sm">keyboard shortcuts</h4>
                <div className="text-sm space-y-2">
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">start/pause</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">
                      space
                    </kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">lap</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">l</kbd>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-muted-foreground">reset</span>
                    <kbd className="px-2 py-1 bg-muted rounded text-xs">r</kbd>
                  </div>
                  {showFullscreenToggle && (
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">fullscreen</span>
                      <kbd className="px-2 py-1 bg-muted rounded text-xs">
                        f
                      </kbd>
                    </div>
                  )}
                </div>
              </div>
            </PopoverContent>
          </Popover>
        )}
      </div>
    </div>
  );
}

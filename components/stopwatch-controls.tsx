"use client";

import { Button } from "./ui/button";
import { Play, Pause, RotateCcw, Flag, Keyboard } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";

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
  showFullscreenToggle = true,
  showKeyboardHints = false,
}: StopwatchControlsProps) {
  return (
    <TooltipProvider>
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
          <Tooltip>
            <TooltipTrigger asChild>
              <div className="flex items-center justify-center p-2 mr-1 cursor-help">
                <Keyboard className="h-4 w-4 text-muted-foreground" />
              </div>
            </TooltipTrigger>
            <TooltipContent side="bottom" className="text-xs">
              <div className="flex flex-col gap-1 py-1.5">
                <div className="flex items-center justify-between gap-3">
                  <span>Start/Pause</span>
                  <kbd className="px-2 py-0.5 bg-background/50 border border-border rounded text-[10px]">
                    SPACE
                  </kbd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Lap</span>
                  <kbd className="px-2 py-0.5 bg-background/50 border border-border rounded text-[10px]">
                    L
                  </kbd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Reset</span>
                  <kbd className="px-2 py-0.5 bg-background/50 border border-border rounded text-[10px]">
                    R
                  </kbd>
                </div>
                <div className="flex items-center justify-between gap-3">
                  <span>Fullscreen</span>
                  <kbd className="px-2 py-0.5 bg-background/50 border border-border rounded text-[10px]">
                    F
                  </kbd>
                </div>
              </div>
            </TooltipContent>
          </Tooltip>
        </div>
      </div>
    </TooltipProvider>
  );
}

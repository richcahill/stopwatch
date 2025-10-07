"use client";

import type { Lap } from "@/lib/useStopwatch";

interface LapTimesProps {
  laps: Lap[];
}

export function LapTimes({ laps }: LapTimesProps) {
  const formatTimeString = (milliseconds: number) => {
    const totalMinutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    const minutes = totalMinutes.toString().padStart(2, "0");
    const secondsStr = seconds.toString().padStart(2, "0");
    const msStr = ms.toString().padStart(2, "0");

    return `${minutes}:${secondsStr}.${msStr}`;
  };

  const fastestLap =
    laps.length > 0
      ? laps.reduce((min, lap) => (lap.splitTime < min.splitTime ? lap : min))
      : null;

  const slowestLap =
    laps.length > 0
      ? laps.reduce((max, lap) => (lap.splitTime > max.splitTime ? lap : max))
      : null;

  if (laps.length === 0) {
    return null;
  }

  return (
    <div className="w-full max-w-md mt-4">
      <div className="border rounded-[1rem] overflow-hidden bg-muted p-1">
        <div className="px-4 py-2 grid grid-cols-3 gap-4 text-sm font-medium">
          <div>lap</div>
          <div className="text-right">split time</div>
          <div className="text-right">total time</div>
        </div>
        <div className="max-h-64 overflow-y-auto bg-background rounded-[0.9rem]">
          {laps.map((lap) => {
            const isFastest =
              fastestLap &&
              lap.lapNumber === fastestLap.lapNumber &&
              laps.length > 1;
            const isSlowest =
              slowestLap &&
              lap.lapNumber === slowestLap.lapNumber &&
              laps.length > 1;

            return (
              <div
                key={lap.lapNumber}
                className="px-4 py-3 grid grid-cols-3 gap-4 text-sm"
              >
                <div className="flex items-center gap-2">
                  <span>lap {lap.lapNumber}</span>
                  {isFastest && (
                    <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-green-500/10 text-green-600 dark:text-green-400">
                      fastest
                    </span>
                  )}
                  {isSlowest && (
                    <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-red-500/10 text-red-600 dark:text-red-400">
                      slowest
                    </span>
                  )}
                </div>
                <div className="text-right font-mono">
                  {formatTimeString(lap.splitTime)}
                </div>
                <div className="text-right font-mono text-muted-foreground">
                  {formatTimeString(lap.totalTime)}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}

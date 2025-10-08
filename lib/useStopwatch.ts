"use client";

import { useState, useEffect, useRef, useCallback } from "react";

export interface Lap {
  lapNumber: number;
  totalTime: number;
  splitTime: number;
}

export interface StopwatchState {
  time: number;
  isRunning: boolean;
  laps: Lap[];
}

export interface StopwatchActions {
  handleStartStop: () => void;
  handleReset: () => void;
  handleLap: () => void;
  formatTime: (milliseconds: number) => {
    minutes: string;
    seconds: string;
    milliseconds: string;
  };
}

export interface UseStopwatchReturn extends StopwatchState, StopwatchActions {}

export function useStopwatch(): UseStopwatchReturn {
  const [time, setTime] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [laps, setLaps] = useState<Lap[]>([]);
  const animationRef = useRef<number | null>(null);
  const startTimeRef = useRef<number>(0);
  const accumulatedTimeRef = useRef<number>(0);

  useEffect(() => {
    if (isRunning) {
      // capture the exact start time, accounting for any previously accumulated time
      startTimeRef.current = performance.now() - accumulatedTimeRef.current;

      const updateTime = () => {
        const now = performance.now();
        const elapsed = now - startTimeRef.current;

        // round to nearest 10ms for display (but track accurate time internally)
        const roundedTime = Math.floor(elapsed / 10) * 10;
        setTime(roundedTime);
        accumulatedTimeRef.current = elapsed;

        animationRef.current = requestAnimationFrame(updateTime);
      };

      animationRef.current = requestAnimationFrame(updateTime);
    } else {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    }

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isRunning]);

  const handleStartStop = useCallback(() => {
    setIsRunning((prev) => !prev);
  }, []);

  const handleReset = useCallback(() => {
    setIsRunning(false);
    setTime(0);
    setLaps([]);
    accumulatedTimeRef.current = 0;
  }, []);

  const handleLap = useCallback(() => {
    if (time === 0) return;

    setLaps((prevLaps) => {
      const previousLapTime = prevLaps.length > 0 ? prevLaps[0].totalTime : 0;
      const splitTime = time - previousLapTime;

      return [
        {
          lapNumber: prevLaps.length + 1,
          totalTime: time,
          splitTime,
        },
        ...prevLaps,
      ];
    });
  }, [time]);

  const formatTime = useCallback((milliseconds: number) => {
    const totalMinutes = Math.floor(milliseconds / 60000);
    const seconds = Math.floor((milliseconds % 60000) / 1000);
    const ms = Math.floor((milliseconds % 1000) / 10);

    return {
      minutes: totalMinutes.toString().padStart(2, "0"),
      seconds: seconds.toString().padStart(2, "0"),
      milliseconds: ms.toString().padStart(2, "0"),
    };
  }, []);

  return {
    time,
    isRunning,
    laps,
    handleStartStop,
    handleReset,
    handleLap,
    formatTime,
  };
}

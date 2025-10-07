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
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setTime((prevTime) => prevTime + 10);
      }, 10);
    } else {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
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
  }, []);

  const handleLap = useCallback(() => {
    if (time === 0) return;

    const previousLapTime = laps.length > 0 ? laps[0].totalTime : 0;
    const splitTime = time - previousLapTime;

    setLaps((prevLaps) => [
      {
        lapNumber: prevLaps.length + 1,
        totalTime: time,
        splitTime,
      },
      ...prevLaps,
    ]);
  }, [time, laps]);

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

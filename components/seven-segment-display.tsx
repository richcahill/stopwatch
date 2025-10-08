"use client";

import { memo, useState, useEffect, useRef, forwardRef, useMemo } from "react";
import { SevenSegmentDigit } from "./seven-segment-digit";
import { Button } from "./ui/button";
import { Maximize2, Minimize2 } from "lucide-react";

interface SevenSegmentDisplayProps {
  value: string;
  size?: "sm" | "md" | "lg";
  isFullscreen?: boolean;
  controlsHeight?: number;
  onToggleFullscreen?: () => void;
}

export const SevenSegmentDisplay = memo(
  forwardRef<HTMLDivElement, SevenSegmentDisplayProps>(
    function SevenSegmentDisplay(
      {
        value,
        size = "md",
        isFullscreen = false,
        controlsHeight = 140,
        onToggleFullscreen,
      },
      ref
    ) {
      const SEGMENT_THICKNESS_MULTIPLIER = 2.0;

      const [digitWidth, setDigitWidth] = useState(60);
      const [digitHeight, setDigitHeight] = useState(100);
      const [colonWidth, setColonWidth] = useState(16);
      const [thickness, setThickness] = useState(7);
      const [gap, setGap] = useState(8);

      const internalRef = useRef<HTMLDivElement>(null);
      const containerRef =
        (ref as React.RefObject<HTMLDivElement>) || internalRef;

      useEffect(() => {
        if (!isFullscreen) {
          setDigitWidth(60);
          setDigitHeight(100);
          setColonWidth(16);
          setThickness(7);
          setGap(8);
          return;
        }

        const calculateDimensions = () => {
          if (!containerRef.current) return;

          const viewportWidth = window.innerWidth;
          const viewportHeight = window.innerHeight;

          const containerPadding = 32;
          const displayPadding = 64;
          const labelHeight = 32;

          const screenArea = viewportWidth * viewportHeight;
          const areaDimension = Math.sqrt(screenArea);
          const newThickness = Math.max(
            5,
            areaDimension * 0.008 * SEGMENT_THICKNESS_MULTIPLIER
          );

          const newGap = Math.max(8, areaDimension * 0.008);

          const newDigitHeight =
            viewportHeight -
            containerPadding * 2 -
            displayPadding * 2 -
            labelHeight;

          const newColonWidth = areaDimension * 0.01;
          const totalGaps = newGap * 7;
          const availableWidth =
            viewportWidth -
            containerPadding * 2 -
            displayPadding * 2 -
            totalGaps -
            newColonWidth * 2;
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
      }, [
        isFullscreen,
        controlsHeight,
        containerRef,
        SEGMENT_THICKNESS_MULTIPLIER,
      ]);

      // memoize string split for better performance
      const chars = useMemo(() => value.split(""), [value]);
      
      // detect leading zeros
      let foundNonZero = false;

      return (
        <div className="border rounded-[1rem] overflow-hidden bg-muted p-1 w-fit relative flex flex-col">
          <div className="px-3 py-2 pb-3 text-xs font-mono tracking-widest text-muted-foreground flex justify-between items-start">
            <div>STOPWATCH</div>
            {onToggleFullscreen && (
              <Button
                size="sm"
                variant="ghost"
                onClick={onToggleFullscreen}
                className=" top-2 right-2 z-10 h-6 w-6 -m-1"
              >
                {isFullscreen ? (
                  <Minimize2 className="h-3.5 w-3.5" />
                ) : (
                  <Maximize2 className="h-3.5 w-3.5" />
                )}
              </Button>
            )}
          </div>

          <div
            ref={containerRef}
            className="flex items-center justify-center bg-background rounded-[0.8rem] py-8 px-12"
            style={{ gap: `${gap}px` }}
          >
            {chars.map((char, index) => {
              if (char === ":") {
                const dotSize = thickness ?? 8;
                const gapBetweenDots = digitHeight ? digitHeight / 3 : 20;
                const colonOpacity = foundNonZero ? 1 : 0.2;
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-center mx-1"
                    style={{
                      width: colonWidth,
                      height: digitHeight,
                      opacity: colonOpacity,
                    }}
                  >
                    <div
                      className="bg-foreground"
                      style={{ width: dotSize, height: dotSize }}
                    ></div>
                    <div style={{ height: gapBetweenDots }}></div>
                    <div
                      className="bg-foreground"
                      style={{ width: dotSize, height: dotSize }}
                    ></div>
                  </div>
                );
              }

              const isLeadingZero = !foundNonZero && char === "0";
              if (char !== "0") {
                foundNonZero = true;
              }

              return (
                <SevenSegmentDigit
                  key={index}
                  digit={char}
                  size={size}
                  width={digitWidth}
                  height={digitHeight}
                  thickness={thickness}
                  opacity={isLeadingZero ? 0.2 : 1}
                />
              );
            })}
          </div>
        </div>
      );
    }
  )
);

"use client";

import { useRef, useState } from "react";

export default function Stopwatch() {
  let [startTime, setStartTime] = useState<number>(0);
  let [currentTime, setCurrentTime] = useState<number>(0);
  let intervalRef = useRef<NodeJS.Timeout | null>(null);

  function handleStart(): void {
    // Stop if there is a running timer
    handleStop();
    // Reset the startTime to the current time
    setStartTime(Date.now());
    // Create an interval to update the current time
    intervalRef.current = setInterval(() => {
      setCurrentTime(Date.now());
    }, 1);
  }

  function handleStop(): void {
    if (intervalRef.current) {
      clearInterval(intervalRef.current);
    }
  }

  return (
    <div>
      <h1>Stopwatch</h1>
      <div>Elapsed Time - {currentTime - startTime}</div>
      <div>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </div>
    </div>
  );
}

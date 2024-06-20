"use client";

import { useState } from "react";

export default function ThrottledButton() {
  const [count, setCount] = useState(0);
  const [ignore, setIgnore] = useState(false);

  function incrementCounter() {
    setCount((prevCount) => prevCount + 1);
  }

  function throttledButtonClick(fn: () => void): void {
    if (ignore) {
      return;
    }
    // Set ignore to true
    setIgnore(true);
    // Execute the function
    fn();
    // Turn ignore back to false after the time interval
    setTimeout(() => {
      setIgnore(false);
    }, 1000);
  }

  return (
    <div>
      <button onClick={() => throttledButtonClick(incrementCounter)}>
        Increment
      </button>
      <div>{count}</div>
    </div>
  );
}

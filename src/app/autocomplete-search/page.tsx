"use client";

import { useCallback, useEffect, useRef, useState } from "react";

export default function Autocomplete() {
  const [value, setValue] = useState("");
  const [results, setResults] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const timerRef = useRef<any>();

  const getResults = useCallback(async function (search: string) {
    setIsLoading(true);
    const searchParams = new URLSearchParams();
    searchParams.append("query", search);
    const response = await fetch(`/api/autocomplete-search?${searchParams}`);
    const items = await response.json();
    setResults(items);
    setIsLoading(false);
  }, []);

  function handleChange(newValue: string) {
    // Update the state
    setValue(newValue);
    // If a timer exists already, clear that timer, and create a new one
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
    timerRef.current = setTimeout(() => getResults(newValue), 1000);
  }

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={value}
        onChange={(e) => handleChange(e.target.value)}
      />
      <div>
        {isLoading && <div>Loading...</div>}
        {results.map((res) => (
          <div key={res}>{res}</div>
        ))}
      </div>
    </div>
  );
}

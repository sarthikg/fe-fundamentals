"use client";
import { useEffect, useRef, useState } from "react";

export default function InfiniteScroll() {
  let [items, setItems] = useState<number[]>([]);
  let intersectionRef = useRef<IntersectionObserver | null>();
  let containerRef = useRef<HTMLDivElement | null>(null);

  async function fetchNextElements(prevEndIndex: number): Promise<number[]> {
    const searchParams = new URLSearchParams();
    searchParams.append("prevEndIndex", `${prevEndIndex}`);
    const response = await fetch("/api/infinite-scroll?" + searchParams);
    return response.json();
  }

  useEffect(() => {
    let ignore = false;

    async function handleIntersectionChange(
      enteries: IntersectionObserverEntry[]
    ) {
      const entry = enteries.at(-1);
      const index = parseInt(
        entry?.target.getAttribute("data-index") as string
      );
      if (entry?.isIntersecting) {
        const newElements = await fetchNextElements(index);
        setItems((prev) => [...prev, ...newElements]);
      }
    }

    async function fetchInitialNodes() {
      const newElements = await fetchNextElements(0);
      if (!ignore) {
        setItems((prev) => [...prev, ...newElements]);
      }
      const observer = new IntersectionObserver(handleIntersectionChange);
      intersectionRef.current = observer;
    }
    fetchInitialNodes();

    return function () {
      ignore = true;
    };
  }, []);

  useEffect(() => {
    // Disconnect the previously observed element
    intersectionRef.current?.disconnect();
    // Connect the new element to be observed
    const newElement = containerRef.current?.lastChild as Element;
    if (newElement) intersectionRef.current?.observe(newElement);
  }, [items]);

  return (
    <div>
      <div ref={containerRef}>
        {items.map((item) => (
          <div key={item} data-index={item}>
            Item #{item}
          </div>
        ))}
      </div>
    </div>
  );
}

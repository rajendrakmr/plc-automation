"use client";

import { useEffect, useRef, useState } from "react";

export default function Search() {
  const [open, setOpen] = useState(false);
  const wrapperRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener(
        "mousedown",
        handleClickOutside
      );
    };
  }, []);

  return (
    <>
      <div
        className={`rk_expand_search ${open ? "active" : ""}`}
        ref={wrapperRef}
      >
        {/* ICON */}
        <div className="rk_expand_search_icon">
          <svg viewBox="0 0 20 20">
            <path d="M12.9 14.32a8 8 0 111.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zm-.82-1.16a6 6 0 10-8.49-8.49 6 6 0 008.49 8.49z" />
          </svg>
        </div>

        {/* INPUT */}
        <input
          type="text"
          placeholder="Search Part Number"
          className="rk_expand_search_input"
          onFocus={() => setOpen(true)}
        />
      </div> 
    </>
  );
}
"use client";

import React, { useState, useEffect } from "react";

const DisplaySizeDetector = () => {
  const [displaySize, setDisplaySize] = useState("");

  const updateDisplaySize = () => {
    const width = window.innerWidth;
    if (width < 640) {
      setDisplaySize("sm");
    } else if (width < 768) {
      setDisplaySize("md");
    } else if (width < 1024) {
      setDisplaySize("lg");
    } else if (width < 1280) {
      setDisplaySize("xl");
    } else {
      setDisplaySize("2xl");
    }
  };

  useEffect(() => {
    updateDisplaySize();
    window.addEventListener("resize", updateDisplaySize);

    return () => window.removeEventListener("resize", updateDisplaySize);
  }, []);

  return (
    <div className="p-4 border rounded-lg">
      <h2 className="text-xl font-bold">Current Display Size</h2>
      <p className="text-lg mt-2">
        Screen size: <span className="font-semibold">{displaySize}</span>
      </p>
    </div>
  );
};

export default DisplaySizeDetector;

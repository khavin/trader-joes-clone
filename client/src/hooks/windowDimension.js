import { useState, useEffect } from "react";

// Get current dimensions
function getWindowDimension() {
  const height = window.innerHeight;
  const width = window.innerWidth;

  return {
    width,
    height,
  };
}

// This is a custom hook, which can be used to get the current dimensions of the window
// More info refer - https://stackoverflow.com/questions/36862334/get-viewport-window-height-in-reactjs/36862446#36862446
export function useWindowDimensions() {
  const [dimension, updateDimension] = useState(getWindowDimension());
  useEffect(() => {
    function handleResize() {
      updateDimension(getWindowDimension);
    }
    window.addEventListener("resize", handleResize);

    // Clean up function
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return dimension;
}

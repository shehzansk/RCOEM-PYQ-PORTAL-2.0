import React, { useState, useEffect } from "react";
import { MoonIcon, SunIcon } from "@heroicons/react/solid";

function ThemeSwitcher() {
  const [isDark, setIsDark] = useState(false);

  // Load theme from localStorage on mount
  useEffect(() => {
    const storedTheme = localStorage.getItem("theme");
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches;

    const darkMode = storedTheme === "dark" || (!storedTheme && prefersDark);
    setIsDark(darkMode);
    document.documentElement.classList.toggle("dark", darkMode);
  }, []);

  // Toggle theme and update localStorage
  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    document.documentElement.classList.toggle("dark", newTheme);

    // Optional: Re-run FinisherHeader when theme changes
    setTimeout(() => {
      if (window.FinisherHeader) {
        document.querySelector("#finisher-canvas")?.remove(); // Remove old canvas if needed

        const config = newTheme
          ? {
              count: 10,
              size: { min: 1300, max: 1500, pulse: 0 },
              speed: { x: { min: 0.1, max: 0.6 }, y: { min: 0.1, max: 0.6 } },
              colors: {
                background: "#9138e5",
                particles: ["#ff4848", "#000000", "#2235e5", "#000000", "#ff0000"],
              },
              blending: "overlay",
              opacity: { center: 0.5, edge: 0.05 },
              skew: 0,
              shapes: ["c"],
            }
          : {
              count: 6,
              size: { min: 1100, max: 1300, pulse: 0 },
              speed: { x: { min: 0.1, max: 0.3 }, y: { min: 0.1, max: 0.3 } },
              colors: {
                background: "#9138e5",
                particles: ["#6bd6ff", "#ffcb57", "#ff333d"],
              },
              blending: "overlay",
              opacity: { center: 1, edge: 0.1 },
              skew: 0,
              shapes: ["c"],
            };

        new window.FinisherHeader(config);
      }
    }, 100);
  };

  return (
    <button
      onClick={toggleTheme}
      className="p-2 rounded-full bg-gray-200 dark:bg-gray-700 transition-colors"
      aria-label="Toggle theme"
    >
      {isDark ? (
        <SunIcon className="h-6 w-6 text-yellow-400" />
      ) : (
        <MoonIcon className="h-6 w-6 text-blue-700" />
      )}
    </button>
  );
}

export default ThemeSwitcher;

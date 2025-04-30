// src/App.js
import React, { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import LandingPage from "./components/LandingPage"; // New landing page component
import Portal from "./components/portal"; // Existing PYQ portal interface
import Contact from "./components/contact";
import Contribute from "./components/contribute";

function App() {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "./finisher-header.es5.min.js";
    script.async = true;

    script.onload = () => {
      const isDark = document.documentElement.classList.contains("dark");

      const config = isDark
        ? {
            count: 10,
            size: { min: 1300, max: 1500, pulse: 0 },
            speed: {
              x: { min: 0.1, max: 0.6 },
              y: { min: 0.1, max: 0.6 },
            },
            colors: {
              background: "#9138e5",
              particles: [
                "#ff4848",
                "#000000",
                "#2235e5",
                "#000000",
                "#ff0000",
              ],
            },
            blending: "overlay",
            opacity: { center: 0.5, edge: 0.05 },
            skew: 0,
            shapes: ["c"],
          }
        : {
            count: 6,
            size: { min: 1100, max: 1300, pulse: 0 },
            speed: {
              x: { min: 0.1, max: 0.3 },
              y: { min: 0.1, max: 0.3 },
            },
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
    };

    document.body.appendChild(script);
  }, []);

  return (
    <>
      {/* Fixed container for the finisher canvas with correct class names */}
      <div className="finisher-header header-wrapper fixed top-0 left-0 w-full h-full -z-10 overflow-hidden"></div>

      {/* Your main app */}
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/portal" element={<Portal />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/contribute" element={<Contribute />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;

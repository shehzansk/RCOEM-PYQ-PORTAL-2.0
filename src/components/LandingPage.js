import React, { useRef } from "react";
import { motion } from "framer-motion";
import ThemeSwitcher from "./ThemeSwitcher";
import Portal from "./portal";
import logo from "../media/rcoemLogo.png";

function LandingPage() {
  const portalRef = useRef(null);

  const handleCTAClick = () => {
    if (portalRef.current) {
      portalRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="flex flex-col">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="sticky top-0 z-50 flex justify-between items-center p-5 bg-black/20 backdrop-blur-3xl rounded-t-none rounded-b-3xl shadow-xl transition-all duration-300 hover:shadow-2xl"
      >
        <a href="/">
          <div className="flex items-center">
            <img
              src={logo}
              alt="Portal Logo"
              className="w-10 h-10 object-contain mr-2"
            />
            <div
              className="text-2xl md:text-3xl font-bold tracking-wider text-transparent bg-clip-text drop-shadow-lg 
  bg-gradient-to-r from-orange-200 to-orange-400 dark:from-purple-400 dark:to-pink-500"
            >
              RCOEM PYQ Portal
            </div>
          </div>{" "}
        </a>
        <div className="flex items-center space-x-4">
          <ThemeSwitcher />
          <a
            href="https://github.com/shehzansk/RCOEM-PYQ-PORTAL-2.0"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center text-white hover:text-gray-300 transition-colors duration-200"
          >
            <svg
              className="w-9 h-9"
              fill="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 0C5.373 0 0 5.373 0 12c0 5.303 3.438 9.8 8.205 11.387.6.113.82-.263.82-.583 0-.288-.01-1.05-.015-2.06-3.338.727-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.09-.745.082-.73.082-.73 1.205.085 1.84 1.237 1.84 1.237 1.07 1.835 2.807 1.305 3.495.998.108-.776.42-1.305.762-1.605-2.665-.305-5.467-1.335-5.467-5.93 0-1.31.468-2.38 1.236-3.22-.124-.304-.536-1.523.117-3.176 0 0 1.008-.322 3.3 1.23a11.51 11.51 0 013.003-.404c1.018.005 2.043.138 3.003.404 2.29-1.553 3.296-1.23 3.296-1.23.655 1.653.243 2.872.12 3.176.77.84 1.235 1.91 1.235 3.22 0 4.61-2.807 5.622-5.48 5.92.432.372.815 1.102.815 2.222 0 1.606-.015 2.9-.015 3.293 0 .321.217.699.825.58C20.565 21.798 24 17.303 24 12c0-6.627-5.373-12-12-12z" />
            </svg>
          </a>
        </div>
      </motion.header>

      {/* Hero Section */}
      <section className="min-h-screen flex flex-col justify-center items-center text-center ">
        <motion.div
          whileHover={{ scale: 1.02 }}
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          className="mx-auto w-full max-w-5xl p-10 bg-black/10 backdrop-blur-md rounded-3xl border border-transparent shadow-xl transition-all duration-300 hover:shadow-2xl hover:border-white/30"
        >
          <motion.h1
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-5xl md:text-7xl font-extrabold bg-gradient-to-r from-blue-500 to-indigo-600 text-transparent bg-clip-text"
          >
            Access PYQs in a Flash
          </motion.h1>
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="mt-6 text-lg md:text-xl text-gray-800 dark:text-gray-300"
          >
            A sleek, interactive portal for accessing previous year questions.
          </motion.p>
          <motion.button
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 1, duration: 0.5 }}
            onClick={handleCTAClick}
            className="mt-10 px-8 py-4 bg-gradient-to-r from-green-400 to-blue-500 text-white font-semibold rounded-full shadow-lg hover:shadow-2xl transition-all duration-300"
          >
            Get Started
          </motion.button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 0.5 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <svg
            className="w-6 h-6 text-white animate-bounce"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M19 9l-7 7-7-7"
            ></path>
          </svg>
        </motion.div>
      </section>

      {/* Portal Section */}
      <section ref={portalRef} className="py-24">
        <Portal />
      </section>

      {/* Footer */}

      <footer className="mt-28 p-5 text-center text-gray-300 bg-black/20 backdrop-blur-3xl rounded-t-3xl shadow-xl hover:shadow-2xl">
        <div className="mt-4">
          <h3 className="text-lg">
            Made with ❤ by{" "}
            <a
              href="https://github.com/shehzansk"
              target="_blank"
              rel="noopener noreferrer"
              className="underline hover:text-gray-300"
            >
              Shehzan Sheikh
            </a>
          </h3>
        </div>
      </footer>
    </div>
  );
}

export default LandingPage;

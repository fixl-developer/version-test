import React, { memo, useState } from "react";
import { Difficulty } from "@/types/snake";

interface ControlsProps {
  onPause: () => void;
  onRestart: () => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onToggleTheme: () => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  isPaused: boolean;
  isDarkMode: boolean;
  isMuted: boolean;
  difficulty: Difficulty;
}

/**
 * Renders game control buttons
 */
const Controls: React.FC<ControlsProps> = memo(
  ({
    onPause,
    onRestart,
    onDifficultyChange,
    onToggleTheme,
    onToggleMute,
    onToggleFullscreen,
    isPaused,
    isDarkMode,
    isMuted,
    difficulty,
  }) => {
    const [showSettings, setShowSettings] = useState(false);

    return (
      <div className="flex flex-col gap-4">
        {/* Main controls */}
        <div className="flex gap-2">
          <button
            onClick={onPause}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-nokia-green ${
              isDarkMode
                ? "bg-nokia-dark text-nokia-green hover:bg-nokia-light"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            aria-label={isPaused ? "Resume game" : "Pause game"}
          >
            {isPaused ? "▶ Resume" : "⏸ Pause"}
          </button>
          <button
            onClick={onRestart}
            className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-nokia-green ${
              isDarkMode
                ? "bg-nokia-dark text-nokia-green hover:bg-nokia-light"
                : "bg-gray-200 text-gray-800 hover:bg-gray-300"
            }`}
            aria-label="Restart game"
          >
            🔄 Restart
          </button>
        </div>

        {/* Settings toggle */}
        <button
          onClick={() => setShowSettings(!showSettings)}
          className={`px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-nokia-green ${
            isDarkMode
              ? "bg-nokia-dark text-nokia-green hover:bg-nokia-light"
              : "bg-gray-200 text-gray-800 hover:bg-gray-300"
          }`}
          aria-label="Toggle settings"
        >
          ⚙️ Settings
        </button>

        {/* Settings panel */}
        {showSettings && (
          <div
            className={`p-4 rounded-lg border-2 transition-all duration-300 animate-fade-in ${
              isDarkMode
                ? "bg-nokia-dark border-nokia-green"
                : "bg-gray-200 border-gray-400"
            }`}
          >
            {/* Difficulty selector */}
            <div className="mb-4">
              <label
                className={`block text-sm font-semibold mb-2 ${
                  isDarkMode ? "text-nokia-green" : "text-gray-700"
                }`}
              >
                Difficulty
              </label>
              <div className="flex gap-2">
                {Object.values(Difficulty).map((level) => (
                  <button
                    key={level}
                    onClick={() => onDifficultyChange(level)}
                    className={`px-3 py-1 rounded text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-nokia-green ${
                      difficulty === level
                        ? isDarkMode
                          ? "bg-nokia-green text-black"
                          : "bg-gray-800 text-white"
                        : isDarkMode
                        ? "bg-nokia-dark text-nokia-green hover:bg-nokia-light"
                        : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                    }`}
                    aria-label={`Set difficulty to ${level.toLowerCase()}`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            {/* Theme toggle */}
            <div className="mb-4">
              <button
                onClick={onToggleTheme}
                className={`w-full px-3 py-2 rounded text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-nokia-green ${
                  isDarkMode
                    ? "bg-nokia-dark text-nokia-green hover:bg-nokia-light"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
                aria-label="Toggle dark mode"
              >
                {isDarkMode ? "☀️ Light Mode" : "🌙 Dark Mode"}
              </button>
            </div>

            {/* Mute toggle */}
            <div className="mb-4">
              <button
                onClick={onToggleMute}
                className={`w-full px-3 py-2 rounded text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-nokia-green ${
                  isDarkMode
                    ? "bg-nokia-dark text-nokia-green hover:bg-nokia-light"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
                aria-label={isMuted ? "Unmute sound" : "Mute sound"}
              >
                {isMuted ? "🔇 Unmute" : "🔊 Mute"}
              </button>
            </div>

            {/* Fullscreen toggle */}
            <div>
              <button
                onClick={onToggleFullscreen}
                className={`w-full px-3 py-2 rounded text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-nokia-green ${
                  isDarkMode
                    ? "bg-nokia-dark text-nokia-green hover:bg-nokia-light"
                    : "bg-gray-300 text-gray-700 hover:bg-gray-400"
                }`}
                aria-label="Toggle fullscreen"
              >
                ⛶ Fullscreen
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Controls.displayName = "Controls";

export default Controls;

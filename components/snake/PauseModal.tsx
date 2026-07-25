import React, { memo } from "react";

interface PauseModalProps {
  onResume: () => void;
  isDarkMode: boolean;
}

/**
 * Displays a pause overlay when the game is paused
 */
const PauseModal: React.FC<PauseModalProps> = memo(({ onResume, isDarkMode }) => {
  return (
    <div
      className="absolute inset-0 flex items-center justify-center rounded-lg animate-fade-in"
      style={{
        backgroundColor: isDarkMode ? "rgba(0, 17, 0, 0.9)" : "rgba(0, 0, 0, 0.7)",
      }}
    >
      <div
        className={`text-center p-8 rounded-lg border-2 ${
          isDarkMode
            ? "bg-nokia-dark border-nokia-green"
            : "bg-white border-gray-400"
        }`}
      >
        <h2
          className={`text-4xl font-bold mb-4 ${
            isDarkMode ? "text-nokia-green" : "text-gray-800"
          }`}
        >
          PAUSED
        </h2>
        <p
          className={`mb-6 ${isDarkMode ? "text-nokia-light" : "text-gray-600"}`}
        >
          Press P or click Resume to continue
        </p>
        <button
          onClick={onResume}
          className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-nokia-green ${
            isDarkMode
              ? "bg-nokia-green text-black hover:bg-nokia-light"
              : "bg-gray-800 text-white hover:bg-gray-700"
          }`}
          aria-label="Resume game"
        >
          ▶ Resume
        </button>
      </div>
    </div>
  );
});

PauseModal.displayName = "PauseModal";

export default PauseModal;

import React, { memo, useState, useEffect } from "react";
import { COUNTDOWN_DURATION } from "@/lib/constants";

interface GameOverModalProps {
  score: number;
  highScore: number;
  onRestart: () => void;
  isDarkMode: boolean;
}

/**
 * Displays game over screen with score and restart option
 */
const GameOverModal: React.FC<GameOverModalProps> = memo(
  ({ score, highScore, onRestart, isDarkMode }) => {
    const [countdown, setCountdown] = useState<number>(COUNTDOWN_DURATION);
    const [isCountingDown, setIsCountingDown] = useState<boolean>(false);

    useEffect(() => {
      let interval: NodeJS.Timeout | null = null;
      
      if (isCountingDown && countdown > 0) {
        interval = setInterval(() => {
          setCountdown((prev) => prev - 1);
        }, 1000);
      } else if (isCountingDown && countdown === 0) {
        onRestart();
        setIsCountingDown(false);
        setCountdown(COUNTDOWN_DURATION);
      }

      return () => {
        if (interval) clearInterval(interval);
      };
    }, [isCountingDown, countdown, onRestart]);

    const handleRestart = () => {
      setIsCountingDown(true);
    };

    const isNewHighScore = score >= highScore && score > 0;

    return (
      <div
        className="absolute inset-0 flex items-center justify-center rounded-lg animate-fade-in"
        style={{
          backgroundColor: isDarkMode ? "rgba(0, 17, 0, 0.95)" : "rgba(0, 0, 0, 0.8)",
        }}
      >
        <div
          className={`text-center p-8 rounded-lg border-2 animate-slide-up ${
            isDarkMode
              ? "bg-nokia-dark border-nokia-green"
              : "bg-white border-2 border-gray-400"
          }`}
        >
          <h2
            className={`text-5xl font-bold mb-2 ${
              isDarkMode ? "text-nokia-green" : "text-gray-800"
            }`}
          >
            GAME OVER
          </h2>
          
          {isNewHighScore && (
            <div
              className={`text-xl font-bold mb-4 animate-pulse ${
                isDarkMode ? "text-yellow-400" : "text-yellow-600"
              }`}
            >
              🏆 NEW HIGH SCORE! 🏆
            </div>
          )}

          <div className="mb-6">
            <div
              className={`text-lg mb-2 ${isDarkMode ? "text-nokia-light" : "text-gray-600"}`}
            >
              Final Score
            </div>
            <div
              className={`text-6xl font-bold font-mono ${
                isDarkMode ? "text-nokia-green" : "text-gray-800"
              }`}
            >
              {score}
            </div>
          </div>

          <div className="mb-6">
            <div
              className={`text-sm ${isDarkMode ? "text-nokia-light" : "text-gray-600"}`}
            >
              High Score
            </div>
            <div
              className={`text-2xl font-bold font-mono ${
                isDarkMode ? "text-nokia-green" : "text-gray-800"
              }`}
            >
              {highScore}
            </div>
          </div>

          {isCountingDown ? (
            <div
              className={`text-4xl font-bold animate-pulse ${
                isDarkMode ? "text-nokia-green" : "text-gray-800"
              }`}
            >
              {countdown}
            </div>
          ) : (
            <button
              onClick={handleRestart}
              className={`px-8 py-4 rounded-lg font-semibold text-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-nokia-green ${
                isDarkMode
                  ? "bg-nokia-green text-black hover:bg-nokia-light"
                  : "bg-gray-800 text-white hover:bg-gray-700"
              }`}
              aria-label="Restart game"
            >
              🔄 Play Again
            </button>
          )}
        </div>
      </div>
    );
  }
);

GameOverModal.displayName = "GameOverModal";

export default GameOverModal;

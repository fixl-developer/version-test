import React, { memo } from "react";

interface ScoreBoardProps {
  score: number;
  highScore: number;
  isDarkMode: boolean;
}

/**
 * Displays the current score and high score
 */
const ScoreBoard: React.FC<ScoreBoardProps> = memo(({ score, highScore, isDarkMode }) => {
  return (
    <div
      className={`flex gap-8 rounded-lg p-4 transition-colors duration-300 ${
        isDarkMode ? "bg-nokia-dark" : "bg-gray-200"
      }`}
    >
      <div className="text-center">
        <div
          className={`text-sm font-semibold uppercase tracking-wider ${
            isDarkMode ? "text-nokia-green" : "text-gray-600"
          }`}
        >
          Score
        </div>
        <div
          className={`text-3xl font-bold font-mono ${
            isDarkMode ? "text-nokia-green" : "text-gray-800"
          }`}
        >
          {score}
        </div>
      </div>
      <div className="text-center">
        <div
          className={`text-sm font-semibold uppercase tracking-wider ${
            isDarkMode ? "text-nokia-green" : "text-gray-600"
          }`}
        >
          Best
        </div>
        <div
          className={`text-3xl font-bold font-mono ${
            isDarkMode ? "text-nokia-green" : "text-gray-800"
          }`}
        >
          {highScore}
        </div>
      </div>
    </div>
  );
});

ScoreBoard.displayName = "ScoreBoard";

export default ScoreBoard;

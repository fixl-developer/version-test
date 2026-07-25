import React, { memo } from "react";
import { Position } from "@/types/snake";
import { GAME_CONFIG } from "@/lib/constants";
import Snake from "./Snake";
import Food from "./Food";

interface SnakeBoardProps {
  snake: Position[];
  food: Position;
  isDarkMode: boolean;
}

/**
 * Renders the game board with snake and food
 */
const SnakeBoard: React.FC<SnakeBoardProps> = memo(({ snake, food, isDarkMode }) => {
  const { boardSize, cellSize } = GAME_CONFIG;
  const boardSizePx = boardSize * cellSize;

  return (
    <div
      className="relative rounded-lg border-4 shadow-2xl transition-colors duration-300"
      style={{
        width: `${boardSizePx}px`,
        height: `${boardSizePx}px`,
        backgroundColor: isDarkMode ? "#001100" : "#f0f0f0",
        borderColor: isDarkMode ? "#00FF00" : "#004400",
      }}
      role="img"
      aria-label="Snake game board"
    >
      {/* Render grid lines for retro effect */}
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: isDarkMode
            ? "linear-gradient(#00FF00 1px, transparent 1px), linear-gradient(90deg, #00FF00 1px, transparent 1px)"
            : "linear-gradient(#004400 1px, transparent 1px), linear-gradient(90deg, #004400 1px, transparent 1px)",
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
      />

      {/* Render food */}
      <Food position={food} isDarkMode={isDarkMode} />

      {/* Render snake */}
      <Snake snake={snake} isDarkMode={isDarkMode} />
    </div>
  );
});

SnakeBoard.displayName = "SnakeBoard";

export default SnakeBoard;

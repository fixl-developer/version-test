import React, { memo } from "react";
import { Position } from "@/types/snake";
import { GAME_CONFIG } from "@/lib/constants";

interface SnakeProps {
  snake: Position[];
  isDarkMode: boolean;
}

/**
 * Renders the snake on the board
 */
const Snake: React.FC<SnakeProps> = memo(({ snake, isDarkMode }) => {
  const { cellSize } = GAME_CONFIG;

  return (
    <>
      {snake.map((segment, index) => {
        const isHead = index === 0;
        const x = segment.x * cellSize;
        const y = segment.y * cellSize;

        return (
          <div
            key={`${segment.x}-${segment.y}-${index}`}
            className="absolute transition-all duration-75 ease-in-out"
            style={{
              left: `${x}px`,
              top: `${y}px`,
              width: `${cellSize - 2}px`,
              height: `${cellSize - 2}px`,
              backgroundColor: isHead
                ? isDarkMode
                  ? "#00FF00"
                  : "#00CC00"
                : isDarkMode
                ? "#00CC00"
                : "#009900",
              borderRadius: isHead ? "4px" : "3px",
              boxShadow: isHead
                ? `0 0 10px ${isDarkMode ? "#00FF00" : "#00CC00"}`
                : "none",
              border: isHead
                ? `2px solid ${isDarkMode ? "#FFFFFF" : "#004400"}`
                : "none",
            }}
          />
        );
      })}
    </>
  );
});

Snake.displayName = "Snake";

export default Snake;

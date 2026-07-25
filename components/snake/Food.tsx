import React, { memo } from "react";
import { Position } from "@/types/snake";
import { GAME_CONFIG } from "@/lib/constants";

interface FoodProps {
  position: Position;
  isDarkMode: boolean;
}

/**
 * Renders the food on the board with pulse animation
 */
const Food: React.FC<FoodProps> = memo(({ position, isDarkMode }) => {
  const { cellSize } = GAME_CONFIG;
  const x = position.x * cellSize;
  const y = position.y * cellSize;

  return (
    <div
      className="absolute animate-pulse-slow rounded-full"
      style={{
        left: `${x + 2}px`,
        top: `${y + 2}px`,
        width: `${cellSize - 4}px`,
        height: `${cellSize - 4}px`,
        backgroundColor: isDarkMode ? "#FF0000" : "#CC0000",
        boxShadow: `0 0 8px ${isDarkMode ? "#FF0000" : "#CC0000"}`,
      }}
    />
  );
});

Food.displayName = "Food";

export default Food;

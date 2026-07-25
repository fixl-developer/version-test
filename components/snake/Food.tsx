import React, { memo } from "react";
import { Position } from "@/types/snake";
import { GAME_CONFIG } from "@/lib/constants";
import { Theme, THEMES } from "@/lib/theme";

interface FoodProps {
  position: Position;
  theme: Theme;
}

const Food: React.FC<FoodProps> = memo(({ position, theme }) => {
  const { cellSize } = GAME_CONFIG;
  const t = THEMES[theme];

  return (
    <div
      className="absolute animate-pulse-slow rounded-full"
      style={{
        left: `${position.x * cellSize + 2}px`,
        top: `${position.y * cellSize + 2}px`,
        width: `${cellSize - 4}px`,
        height: `${cellSize - 4}px`,
        backgroundColor: t.foodColor,
        boxShadow: `0 0 8px ${t.foodGlow}`,
      }}
    />
  );
});

Food.displayName = "Food";

export default Food;

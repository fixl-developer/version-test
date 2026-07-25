import React, { memo } from "react";
import { Position } from "@/types/snake";
import { GAME_CONFIG } from "@/lib/constants";
import { Theme, THEMES } from "@/lib/theme";

interface SnakeProps {
  snake: Position[];
  theme: Theme;
}

const Snake: React.FC<SnakeProps> = memo(({ snake, theme }) => {
  const { cellSize } = GAME_CONFIG;
  const t = THEMES[theme];

  return (
    <>
      {snake.map((segment, index) => {
        const isHead = index === 0;
        return (
          <div
            key={`${segment.x}-${segment.y}-${index}`}
            className="absolute transition-all duration-75 ease-in-out"
            style={{
              left: `${segment.x * cellSize}px`,
              top: `${segment.y * cellSize}px`,
              width: `${cellSize - 2}px`,
              height: `${cellSize - 2}px`,
              backgroundColor: isHead ? t.snakeHead : t.snakeBody,
              borderRadius: isHead ? "4px" : "3px",
              boxShadow: isHead ? `0 0 10px ${t.snakeGlow}` : "none",
              border: isHead ? `2px solid ${t.snakeHeadBorder}` : "none",
            }}
          />
        );
      })}
    </>
  );
});

Snake.displayName = "Snake";

export default Snake;

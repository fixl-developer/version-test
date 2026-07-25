import React, { memo } from "react";
import { Position } from "@/types/snake";
import { GAME_CONFIG } from "@/lib/constants";
import { Theme, THEMES } from "@/lib/theme";
import Snake from "./Snake";
import Food from "./Food";

interface SnakeBoardProps {
  snake: Position[];
  food: Position;
  theme: Theme;
}

const SnakeBoard: React.FC<SnakeBoardProps> = memo(({ snake, food, theme }) => {
  const { boardSize, cellSize } = GAME_CONFIG;
  const boardSizePx = boardSize * cellSize;
  const t = THEMES[theme];

  return (
    <div
      className="relative rounded-lg border-4 shadow-2xl transition-colors duration-300"
      style={{
        width: `${boardSizePx}px`,
        height: `${boardSizePx}px`,
        backgroundColor: t.boardBg,
        borderColor: t.boardBorder,
      }}
      role="img"
      aria-label="Snake game board"
    >
      <div
        className="absolute inset-0 pointer-events-none opacity-10"
        style={{
          backgroundImage: `linear-gradient(${t.gridColor} 1px, transparent 1px), linear-gradient(90deg, ${t.gridColor} 1px, transparent 1px)`,
          backgroundSize: `${cellSize}px ${cellSize}px`,
        }}
      />
      <Food position={food} theme={theme} />
      <Snake snake={snake} theme={theme} />
    </div>
  );
});

SnakeBoard.displayName = "SnakeBoard";

export default SnakeBoard;

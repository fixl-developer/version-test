import { Position } from "@/types/snake";
import { GAME_CONFIG } from "./constants";
import { isPositionOccupied } from "./collision";

/**
 * Generates a random position on the board
 * @returns A random position within board bounds
 */
function getRandomPosition(): Position {
  const { boardSize } = GAME_CONFIG;
  return {
    x: Math.floor(Math.random() * boardSize),
    y: Math.floor(Math.random() * boardSize),
  };
}

/**
 * Generates a random food position that is not occupied by the snake
 * @param snake - Array of snake body positions
 * @returns A valid food position
 */
export function generateFood(snake: Position[]): Position {
  let food: Position;
  let attempts = 0;
  const maxAttempts = 100;

  do {
    food = getRandomPosition();
    attempts++;
  } while (isPositionOccupied(food, snake) && attempts < maxAttempts);

  // Fallback: if we can't find a valid position after max attempts,
  // return the first available position by scanning the board
  if (attempts >= maxAttempts) {
    const { boardSize } = GAME_CONFIG;
    for (let y = 0; y < boardSize; y++) {
      for (let x = 0; x < boardSize; x++) {
        const position = { x, y };
        if (!isPositionOccupied(position, snake)) {
          return position;
        }
      }
    }
  }

  return food;
}

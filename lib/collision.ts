import { Position } from "@/types/snake";
import { GAME_CONFIG } from "./constants";

/**
 * Checks if the snake has collided with a wall
 * @param head - The head position of the snake
 * @returns True if collision with wall, false otherwise
 */
export function checkWallCollision(head: Position): boolean {
  const { boardSize } = GAME_CONFIG;
  return (
    head.x < 0 ||
    head.x >= boardSize ||
    head.y < 0 ||
    head.y >= boardSize
  );
}

/**
 * Checks if the snake has collided with itself
 * @param snake - Array of snake body positions
 * @returns True if collision with self, false otherwise
 */
export function checkSelfCollision(snake: Position[]): boolean {
  const head = snake[0];
  const body = snake.slice(1);
  
  return body.some(
    (segment) => segment.x === head.x && segment.y === head.y
  );
}

/**
 * Checks if a position is occupied by the snake
 * @param position - The position to check
 * @param snake - Array of snake body positions
 * @returns True if position is occupied, false otherwise
 */
export function isPositionOccupied(position: Position, snake: Position[]): boolean {
  return snake.some(
    (segment) => segment.x === position.x && segment.y === position.y
  );
}

/**
 * Checks if the snake head has reached the food
 * @param head - The head position of the snake
 * @param food - The food position
 * @returns True if snake reached food, false otherwise
 */
export function checkFoodCollision(head: Position, food: Position): boolean {
  return head.x === food.x && head.y === food.y;
}

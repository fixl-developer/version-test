import { Position, Direction } from "@/types/snake";

/**
 * Gets the next position based on current position and direction
 * @param current - Current position
 * @param direction - Direction of movement
 * @returns Next position
 */
export function getNextPosition(
  current: Position,
  direction: Direction
): Position {
  switch (direction) {
    case Direction.UP:
      return { x: current.x, y: current.y - 1 };
    case Direction.DOWN:
      return { x: current.x, y: current.y + 1 };
    case Direction.LEFT:
      return { x: current.x - 1, y: current.y };
    case Direction.RIGHT:
      return { x: current.x + 1, y: current.y };
    default:
      return current;
  }
}

/**
 * Checks if a direction change is valid (prevents 180-degree turns)
 * @param currentDirection - Current direction of movement
 * @param newDirection - Proposed new direction
 * @returns True if direction change is valid, false otherwise
 */
export function isValidDirectionChange(
  currentDirection: Direction,
  newDirection: Direction
): boolean {
  const oppositeDirections: Record<Direction, Direction> = {
    [Direction.UP]: Direction.DOWN,
    [Direction.DOWN]: Direction.UP,
    [Direction.LEFT]: Direction.RIGHT,
    [Direction.RIGHT]: Direction.LEFT,
  };

  return oppositeDirections[currentDirection] !== newDirection;
}

/**
 * Maps keyboard key to direction
 * @param key - Keyboard key code
 * @returns Direction or null if not a direction key
 */
export function keyToDirection(key: string): Direction | null {
  const directionMap: Record<string, Direction> = {
    ArrowUp: Direction.UP,
    ArrowDown: Direction.DOWN,
    ArrowLeft: Direction.LEFT,
    ArrowRight: Direction.RIGHT,
    KeyW: Direction.UP,
    KeyS: Direction.DOWN,
    KeyA: Direction.LEFT,
    KeyD: Direction.RIGHT,
  };

  return directionMap[key] || null;
}

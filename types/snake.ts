/**
 * Represents a position on the game board
 */
export interface Position {
  x: number;
  y: number;
}

/**
 * Represents the direction the snake is moving
 */
export enum Direction {
  UP = "UP",
  DOWN = "DOWN",
  LEFT = "LEFT",
  RIGHT = "RIGHT",
}

/**
 * Represents the difficulty level of the game
 */
export enum Difficulty {
  EASY = "EASY",
  MEDIUM = "MEDIUM",
  HARD = "HARD",
}

/**
 * Represents the current game state
 */
export enum GameState {
  IDLE = "IDLE",
  RUNNING = "RUNNING",
  PAUSED = "PAUSED",
  GAME_OVER = "GAME_OVER",
}

/**
 * Represents the snake game state
 */
export interface SnakeGameState {
  snake: Position[];
  food: Position;
  direction: Direction;
  nextDirection: Direction;
  score: number;
  highScore: number;
  speed: number;
  gameState: GameState;
  difficulty: Difficulty;
  isDarkMode: boolean;
  isMuted: boolean;
  foodCount: number;
}

/**
 * Represents the game configuration
 */
export interface GameConfig {
  boardSize: number;
  cellSize: number;
  initialSpeed: number;
  minSpeed: number;
  speedIncrement: number;
  speedIncreaseInterval: number;
}

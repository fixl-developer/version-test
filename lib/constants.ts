import { GameConfig, Difficulty } from "@/types/snake";

/**
 * Game configuration constants
 */
export const GAME_CONFIG: GameConfig = {
  boardSize: 20,
  cellSize: 25,
  initialSpeed: 150,
  minSpeed: 60,
  speedIncrement: 10,
  speedIncreaseInterval: 5,
};

/**
 * Difficulty settings with different initial speeds
 */
export const DIFFICULTY_SETTINGS: Record<Difficulty, number> = {
  [Difficulty.EASY]: 200,
  [Difficulty.MEDIUM]: 150,
  [Difficulty.HARD]: 100,
};

/**
 * Local storage keys
 */
export const STORAGE_KEYS = {
  HIGH_SCORE: "nokia_snake_high_score",
  DIFFICULTY: "nokia_snake_difficulty",
  THEME: "nokia_snake_theme",
  MUTED: "nokia_snake_muted",
} as const;

/**
 * Keyboard key mappings
 */
export const KEY_MAPPINGS = {
  ARROW_UP: "ArrowUp",
  ARROW_DOWN: "ArrowDown",
  ARROW_LEFT: "ArrowLeft",
  ARROW_RIGHT: "ArrowRight",
  W: "KeyW",
  A: "KeyA",
  S: "KeyS",
  D: "KeyD",
  P: "KeyP",
  SPACE: "Space",
  ESCAPE: "Escape",
} as const;

/**
 * Initial snake position (center of board)
 */
export const INITIAL_SNAKE_POSITION = [
  { x: 10, y: 10 },
  { x: 9, y: 10 },
  { x: 8, y: 10 },
];

/**
 * Initial direction (moving right)
 */
export const INITIAL_DIRECTION = "RIGHT" as const;

/**
 * Countdown duration for restart (in seconds)
 */
export const COUNTDOWN_DURATION = 3;

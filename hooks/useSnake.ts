import { useState, useCallback, useEffect } from "react";
import {
  Position,
  Direction,
  GameState,
  Difficulty,
  SnakeGameState,
} from "@/types/snake";
import {
  GAME_CONFIG,
  DIFFICULTY_SETTINGS,
  INITIAL_SNAKE_POSITION,
  INITIAL_DIRECTION,
} from "@/lib/constants";
import { generateFood } from "@/lib/food";
import { getNextPosition } from "@/lib/movement";
import {
  checkWallCollision,
  checkSelfCollision,
  checkFoodCollision,
} from "@/lib/collision";
import { getHighScore, setHighScore, getTopScores, saveTopScore, ScoreEntry } from "@/lib/storage";

/**
 * Custom hook for managing snake game state
 * @returns Snake game state and control functions
 */
export function useSnake() {
  const [gameState, setGameState] = useState<GameState>(GameState.IDLE);
  const [snake, setSnake] = useState<Position[]>(INITIAL_SNAKE_POSITION);
  const [food, setFood] = useState<Position>(() =>
    generateFood(INITIAL_SNAKE_POSITION)
  );
  const [direction, setDirection] = useState<Direction>(
    INITIAL_DIRECTION as Direction
  );
  const [nextDirection, setNextDirection] = useState<Direction>(
    INITIAL_DIRECTION as Direction
  );
  const [score, setScore] = useState<number>(0);
  const [highScore, setHighScoreState] = useState<number>(getHighScore());
  const [topScores, setTopScores] = useState<ScoreEntry[]>(getTopScores());
  const [speed, setSpeed] = useState<number>(
    DIFFICULTY_SETTINGS[Difficulty.MEDIUM]
  );
  const [difficulty, setDifficulty] = useState<Difficulty>(Difficulty.MEDIUM);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [foodCount, setFoodCount] = useState<number>(0);

  // Update direction from nextDirection (prevents rapid direction changes)
  useEffect(() => {
    setDirection(nextDirection);
  }, [nextDirection]);

  /**
   * Resets the game to initial state
   */
  const resetGame = useCallback(() => {
    setSnake(INITIAL_SNAKE_POSITION);
    setFood(generateFood(INITIAL_SNAKE_POSITION));
    setDirection(INITIAL_DIRECTION as Direction);
    setNextDirection(INITIAL_DIRECTION as Direction);
    setScore(0);
    setFoodCount(0);
    setSpeed(DIFFICULTY_SETTINGS[Difficulty.MEDIUM]);
    setGameState(GameState.IDLE);
  }, [difficulty]);

  /**
   * Starts the game
   */
  const startGame = useCallback(() => {
    resetGame();
    setGameState(GameState.RUNNING);
  }, [resetGame]);

  /**
   * Pauses or resumes the game
   */
  const togglePause = useCallback(() => {
    if (gameState === GameState.RUNNING) {
      setGameState(GameState.PAUSED);
    } else if (gameState === GameState.PAUSED) {
      setGameState(GameState.RUNNING);
    }
  }, [gameState]);

  /**
   * Handles game over
   */
  const handleGameOver = useCallback(() => {
    setGameState(GameState.GAME_OVER);
    
    if (score > highScore) {
      setHighScoreState(score);
      setHighScore(score);
    }
    if (score > 0) {
      setTopScores(saveTopScore(score));
    }
  }, [score, highScore]);

  /**
   * Moves the snake one step
   */
  const moveSnake = useCallback(() => {
    if (gameState !== GameState.RUNNING) return;

    // Calculate new head position
    const head = snake[0];
    const newHead = getNextPosition(head, direction);

    // Check for collisions
    if (checkWallCollision(newHead) || checkSelfCollision(snake)) {
      handleGameOver();
      return;
    }

    // Create new snake with new head
    const newSnake = [newHead, ...snake];

    // Check if food was eaten
    if (checkFoodCollision(newHead, food)) {
      // Snake grows (don't remove tail)
      setSnake(newSnake);
      setScore((prev: number) => prev + 10);
      setFoodCount((prev: number) => prev + 1);
      
      // Generate new food
      setFood(generateFood(newSnake));

      // Increase speed every 5 foods
      const newFoodCount = foodCount + 1;
      if (newFoodCount % GAME_CONFIG.speedIncreaseInterval === 0) {
        const newSpeed = Math.max(
          GAME_CONFIG.minSpeed,
          speed - GAME_CONFIG.speedIncrement
        );
        setSpeed(newSpeed);
      }
    } else {
      // Snake moves (remove tail)
      newSnake.pop();
      setSnake(newSnake);
    }
  }, [snake, direction, food, gameState, speed, foodCount, handleGameOver]);

  /**
   * Changes the direction
   */
  const changeDirection = useCallback((newDirection: Direction) => {
    setNextDirection(newDirection);
  }, []);

  /**
   * Changes the difficulty
   */
  const changeDifficulty = useCallback((newDifficulty: Difficulty) => {
    setDifficulty(newDifficulty);
    setSpeed(DIFFICULTY_SETTINGS[newDifficulty]);
  }, []);

  /**
   * Toggles dark mode
   */
  const toggleDarkMode = useCallback(() => {
    setIsDarkMode((prev: boolean) => !prev);
  }, []);

  /**
   * Toggles mute
   */
  const toggleMute = useCallback(() => {
    setIsMuted((prev: boolean) => !prev);
  }, []);

  return {
    // State
    snake,
    food,
    direction,
    score,
    highScore,
    topScores,
    speed,
    gameState,
    difficulty,
    isDarkMode,
    isMuted,
    foodCount,
    
    // Actions
    moveSnake,
    changeDirection,
    startGame,
    resetGame,
    togglePause,
    changeDifficulty,
    toggleDarkMode,
    toggleMute,
  };
}

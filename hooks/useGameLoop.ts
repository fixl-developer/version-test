import { useEffect, useRef, useCallback } from "react";
import { GameState } from "@/types/snake";

/**
 * Custom hook for managing the game loop using requestAnimationFrame
 * @param callback - Function to call on each frame
 * @param gameState - Current game state
 * @param speed - Current game speed in milliseconds
 * @param isRunning - Whether the game loop should be running
 */
export function useGameLoop(
  callback: () => void,
  gameState: GameState,
  speed: number,
  isRunning: boolean
) {
  const lastTimeRef = useRef<number>(0);
  const animationFrameRef = useRef<number | null>(null);
  const accumulatorRef = useRef<number>(0);

  const loop = useCallback(
    (timestamp: number) => {
      if (!isRunning || gameState !== GameState.RUNNING) {
        animationFrameRef.current = null;
        return;
      }

      if (!lastTimeRef.current) {
        lastTimeRef.current = timestamp;
      }

      const deltaTime = timestamp - lastTimeRef.current;
      lastTimeRef.current = timestamp;

      accumulatorRef.current += deltaTime;

      // Execute callback when accumulated time exceeds speed threshold
      while (accumulatorRef.current >= speed) {
        callback();
        accumulatorRef.current -= speed;
      }

      animationFrameRef.current = requestAnimationFrame(loop);
    },
    [callback, gameState, speed, isRunning]
  );

  const startLoop = useCallback(() => {
    if (animationFrameRef.current === null && isRunning) {
      lastTimeRef.current = 0;
      accumulatorRef.current = 0;
      animationFrameRef.current = requestAnimationFrame(loop);
    }
  }, [loop, isRunning]);

  const stopLoop = useCallback(() => {
    if (animationFrameRef.current !== null) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
  }, []);

  useEffect(() => {
    if (isRunning && gameState === GameState.RUNNING) {
      startLoop();
    } else {
      stopLoop();
    }

    return () => {
      stopLoop();
    };
  }, [isRunning, gameState, startLoop, stopLoop]);

  return { startLoop, stopLoop };
}

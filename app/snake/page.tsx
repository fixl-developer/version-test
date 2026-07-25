"use client";

import React, { useEffect, useCallback, useState } from "react";
import { useSnake } from "@/hooks/useSnake";
import { useGameLoop } from "@/hooks/useGameLoop";
import { useKeyboard } from "@/hooks/useKeyboard";
import { GameState } from "@/types/snake";
import SnakeBoard from "@/components/snake/SnakeBoard";
import ScoreBoard from "@/components/snake/ScoreBoard";
import Controls from "@/components/snake/Controls";
import PauseModal from "@/components/snake/PauseModal";
import GameOverModal from "@/components/snake/GameOverModal";
import { getThemePreference, setThemePreference, getMutePreference, setMutePreference } from "@/lib/storage";

/**
 * Main Snake Game Page
 * Implements the complete game logic with keyboard controls, game loop, and UI
 */
export default function SnakeGamePage() {
  const {
    snake,
    food,
    direction,
    score,
    highScore,
    speed,
    gameState,
    difficulty,
    isDarkMode,
    isMuted,
    moveSnake,
    changeDirection,
    startGame,
    resetGame,
    togglePause,
    changeDifficulty,
    toggleDarkMode,
    toggleMute,
  } = useSnake();

  // Load theme and mute preferences on mount
  useEffect(() => {
    const savedTheme = getThemePreference();
    const savedMute = getMutePreference();
    
    if (savedTheme !== null) {
      // Apply theme to document
      if (savedTheme) {
        document.documentElement.classList.add("dark");
      } else {
        document.documentElement.classList.remove("dark");
      }
    }
    
    if (savedMute !== null) {
      // Mute preference is handled in the hook
    }
  }, []);

  // Sync dark mode with document class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
    setThemePreference(isDarkMode);
  }, [isDarkMode]);

  // Sync mute preference
  useEffect(() => {
    setMutePreference(isMuted);
  }, [isMuted]);

  // Game loop
  useGameLoop(moveSnake, gameState, speed, gameState === GameState.RUNNING);

  // Keyboard controls
  useKeyboard(
    changeDirection,
    togglePause,
    direction,
    gameState !== GameState.GAME_OVER
  );

  // Fullscreen toggle
  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  // Mobile touch controls
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart({
      x: e.touches[0].clientX,
      y: e.touches[0].clientY,
    });
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart) return;

    const touchEnd = {
      x: e.changedTouches[0].clientX,
      y: e.changedTouches[0].clientY,
    };

    const deltaX = touchEnd.x - touchStart.x;
    const deltaY = touchEnd.y - touchStart.y;

    // Minimum swipe distance
    const minSwipeDistance = 50;

    if (Math.abs(deltaX) > Math.abs(deltaY)) {
      // Horizontal swipe
      if (Math.abs(deltaX) > minSwipeDistance) {
        if (deltaX > 0) {
          changeDirection("RIGHT" as any);
        } else {
          changeDirection("LEFT" as any);
        }
      }
    } else {
      // Vertical swipe
      if (Math.abs(deltaY) > minSwipeDistance) {
        if (deltaY > 0) {
          changeDirection("DOWN" as any);
        } else {
          changeDirection("UP" as any);
        }
      }
    }

    setTouchStart(null);
  }, [touchStart, changeDirection]);

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center p-4 transition-colors duration-300 ${
        isDarkMode ? "bg-black text-nokia-green" : "bg-gray-100 text-gray-800"
      }`}
    >
      {/* Header */}
      <div className="text-center mb-6">
        <h1
          className={`text-5xl font-bold mb-2 tracking-wider ${
            isDarkMode ? "text-nokia-green" : "text-gray-800"
          }`}
        >
          NOKIA SNAKE
        </h1>
        <div
          className={`text-sm ${isDarkMode ? "text-nokia-light" : "text-gray-600"}`}
        >
          Classic Snake Game
        </div>
      </div>

      {/* Score Board */}
      <ScoreBoard score={score} highScore={highScore} isDarkMode={isDarkMode} />

      {/* Game Container */}
      <div className="relative mt-6">
        {/* Game Board */}
        <div
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
          className="relative"
        >
          <SnakeBoard snake={snake} food={food} isDarkMode={isDarkMode} />

          {/* Pause Modal */}
          {gameState === GameState.PAUSED && (
            <PauseModal onResume={togglePause} isDarkMode={isDarkMode} />
          )}

          {/* Game Over Modal */}
          {gameState === GameState.GAME_OVER && (
            <GameOverModal
              score={score}
              highScore={highScore}
              onRestart={resetGame}
              isDarkMode={isDarkMode}
            />
          )}

          {/* Start Screen */}
          {gameState === GameState.IDLE && (
            <div
              className="absolute inset-0 flex items-center justify-center rounded-lg animate-fade-in"
              style={{
                backgroundColor: isDarkMode
                  ? "rgba(0, 17, 0, 0.95)"
                  : "rgba(0, 0, 0, 0.7)",
              }}
            >
              <div
                className={`text-center p-8 rounded-lg border-2 animate-slide-up ${
                  isDarkMode
                    ? "bg-nokia-dark border-nokia-green"
                    : "bg-white border-gray-400"
                }`}
              >
                <h2
                  className={`text-4xl font-bold mb-4 ${
                    isDarkMode ? "text-nokia-green" : "text-gray-800"
                  }`}
                >
                  Ready to Play?
                </h2>
                <button
                  onClick={startGame}
                  className={`px-8 py-4 rounded-lg font-semibold text-xl transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-nokia-green ${
                    isDarkMode
                      ? "bg-nokia-green text-black hover:bg-nokia-light"
                      : "bg-gray-800 text-white hover:bg-gray-700"
                  }`}
                  aria-label="Start game"
                >
                  ▶ Start Game
                </button>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Controls */}
      <div className="mt-6 flex flex-col sm:flex-row gap-6 items-start sm:items-center">
        <Controls
          onPause={togglePause}
          onRestart={resetGame}
          onDifficultyChange={changeDifficulty}
          onToggleTheme={toggleDarkMode}
          onToggleMute={toggleMute}
          onToggleFullscreen={toggleFullscreen}
          isPaused={gameState === GameState.PAUSED}
          isDarkMode={isDarkMode}
          isMuted={isMuted}
          difficulty={difficulty}
        />
      </div>

      {/* Instructions */}
      <div
        className={`mt-8 text-center text-sm ${
          isDarkMode ? "text-nokia-light" : "text-gray-600"
        }`}
      >
        <div className="mb-2">
          <strong>Controls:</strong> Arrow Keys / WASD
        </div>
        <div className="mb-2">
          <strong>Pause:</strong> P or Space
        </div>
        <div>
          <strong>Mobile:</strong> Swipe to move
        </div>
      </div>
    </div>
  );
}

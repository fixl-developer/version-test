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
import { getMutePreference, setMutePreference } from "@/lib/storage";
import { THEMES } from "@/lib/theme";
import VersionSwitcher from "@/components/snake/VersionSwitcher";

export default function SnakeGamePage() {
  const {
    snake,
    food,
    direction,
    score,
    highScore,
    topScores,
    speed,
    gameState,
    difficulty,
    theme,
    isMuted,
    moveSnake,
    changeDirection,
    startGame,
    resetGame,
    togglePause,
    changeDifficulty,
    cycleTheme,
    toggleMute,
  } = useSnake();

  const t = THEMES[theme];

  useEffect(() => {
    setMutePreference(isMuted);
  }, [isMuted]);

  useGameLoop(moveSnake, gameState, speed, gameState === GameState.RUNNING);
  useKeyboard(changeDirection, togglePause, direction, gameState !== GameState.GAME_OVER);

  const toggleFullscreen = useCallback(() => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
    } else {
      document.exitFullscreen();
    }
  }, []);

  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);

  const handleTouchStart = useCallback((e: React.TouchEvent) => {
    setTouchStart({ x: e.touches[0].clientX, y: e.touches[0].clientY });
  }, []);

  const handleTouchEnd = useCallback((e: React.TouchEvent) => {
    if (!touchStart) return;
    const dx = e.changedTouches[0].clientX - touchStart.x;
    const dy = e.changedTouches[0].clientY - touchStart.y;
    if (Math.abs(dx) > Math.abs(dy)) {
      if (Math.abs(dx) > 50) changeDirection(dx > 0 ? "RIGHT" as any : "LEFT" as any);
    } else {
      if (Math.abs(dy) > 50) changeDirection(dy > 0 ? "DOWN" as any : "UP" as any);
    }
    setTouchStart(null);
  }, [touchStart, changeDirection]);

  return (
    <div className={`min-h-screen ${t.pageBg} ${t.textPrimary} transition-colors duration-300`}>
      {/* Header */}
      <header className="text-center py-6">
        <h1 className={`text-4xl font-bold tracking-widest ${t.textPrimary}`}>
          SNAKE
        </h1>
        <p className={`text-xs tracking-widest mt-1 mb-3 ${t.textSecondary}`}>CLASSIC REIMAGINED</p>
        <VersionSwitcher />
      </header>

      {/* Main layout: board left, panel right on desktop */}
      <main className="flex flex-col lg:flex-row gap-6 items-start justify-center px-4 pb-12">

        {/* Board */}
        <div
          className="relative"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <SnakeBoard snake={snake} food={food} theme={theme} />

          {gameState === GameState.PAUSED && (
            <PauseModal onResume={togglePause} theme={theme} />
          )}

          {gameState === GameState.GAME_OVER && (
            <GameOverModal
              score={score}
              highScore={highScore}
              topScores={topScores}
              onRestart={resetGame}
              theme={theme}
            />
          )}

          {gameState === GameState.IDLE && (
            <div
              className="absolute inset-0 flex items-center justify-center rounded-lg animate-fade-in"
              style={{ backgroundColor: t.overlayBg }}
            >
              <div className={`text-center p-8 rounded-lg border-2 animate-slide-up ${t.panelBg} ${t.panelBorder}`}>
                <h2 className={`text-4xl font-bold mb-2 ${t.textPrimary}`}>Ready?</h2>
                <p className={`text-sm mb-6 ${t.textSecondary}`}>Arrow keys / WASD to move</p>
                <button
                  onClick={startGame}
                  className={`px-8 py-4 rounded-lg font-semibold text-xl transition-all duration-200 focus:outline-none focus:ring-2 ${t.btnActive} ${t.ringColor}`}
                  aria-label="Start game"
                >
                  ▶ Start Game
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Side panel */}
        <div className="flex flex-col gap-4 w-full lg:w-52">
          <ScoreBoard score={score} highScore={highScore} theme={theme} />

          <Controls
            onPause={togglePause}
            onRestart={resetGame}
            onDifficultyChange={changeDifficulty}
            onCycleTheme={cycleTheme}
            onToggleMute={toggleMute}
            onToggleFullscreen={toggleFullscreen}
            isPaused={gameState === GameState.PAUSED}
            theme={theme}
            isMuted={isMuted}
            difficulty={difficulty}
          />

          <div className={`text-xs ${t.textSecondary} space-y-1`}>
            <div><span className={`font-bold ${t.textPrimary}`}>Move:</span> Arrow / WASD</div>
            <div><span className={`font-bold ${t.textPrimary}`}>Pause:</span> P or Space</div>
            <div><span className={`font-bold ${t.textPrimary}`}>Mobile:</span> Swipe</div>
          </div>
        </div>
      </main>
    </div>
  );
}

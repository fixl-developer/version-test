import React, { memo, useState, useEffect } from "react";
import { COUNTDOWN_DURATION } from "@/lib/constants";
import { ScoreEntry } from "@/lib/storage";
import { Theme, THEMES } from "@/lib/theme";

interface GameOverModalProps {
  score: number;
  highScore: number;
  topScores: ScoreEntry[];
  onRestart: () => void;
  theme: Theme;
}

const GameOverModal: React.FC<GameOverModalProps> = memo(
  ({ score, highScore, topScores, onRestart, theme }) => {
    const [countdown, setCountdown] = useState<number>(COUNTDOWN_DURATION);
    const [isCountingDown, setIsCountingDown] = useState<boolean>(false);
    const t = THEMES[theme];

    useEffect(() => {
      let interval: NodeJS.Timeout | null = null;
      if (isCountingDown && countdown > 0) {
        interval = setInterval(() => setCountdown((prev) => prev - 1), 1000);
      } else if (isCountingDown && countdown === 0) {
        onRestart();
        setIsCountingDown(false);
        setCountdown(COUNTDOWN_DURATION);
      }
      return () => { if (interval) clearInterval(interval); };
    }, [isCountingDown, countdown, onRestart]);

    const isNewHighScore = score >= highScore && score > 0;

    return (
      <div
        className="absolute inset-0 flex items-center justify-center rounded-lg animate-fade-in"
        style={{ backgroundColor: t.overlayBg }}
      >
        <div className={`text-center p-8 rounded-lg border-2 animate-slide-up ${t.panelBg} ${t.panelBorder}`}>
          <h2 className={`text-5xl font-bold mb-2 ${t.textPrimary}`}>GAME OVER</h2>

          {isNewHighScore && (
            <div className="text-xl font-bold mb-4 animate-pulse text-yellow-400">
              NEW HIGH SCORE!
            </div>
          )}

          <div className="mb-4">
            <div className={`text-lg mb-1 ${t.textSecondary}`}>Final Score</div>
            <div className={`text-6xl font-bold font-mono ${t.textPrimary}`}>{score}</div>
          </div>

          {topScores.length > 0 && (
            <div className="mb-6">
              <div className={`text-xs font-semibold uppercase tracking-widest mb-2 ${t.textSecondary}`}>
                Top Scores
              </div>
              <div className="flex flex-col gap-1">
                {topScores.map((entry, i) => (
                  <div
                    key={i}
                    className={`flex justify-between items-center px-3 py-1 rounded text-sm font-mono ${t.panelBg} ${t.textPrimary}`}
                    style={{ opacity: i === 0 ? 1 : 0.7 }}
                  >
                    <span className="w-5 text-left">#{i + 1}</span>
                    <span className="font-bold">{entry.score}</span>
                    <span className={t.textSecondary}>{entry.date}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {isCountingDown ? (
            <div className={`text-4xl font-bold animate-pulse ${t.textPrimary}`}>{countdown}</div>
          ) : (
            <button
              onClick={() => setIsCountingDown(true)}
              className={`px-8 py-4 rounded-lg font-semibold text-xl transition-all duration-200 focus:outline-none focus:ring-2 ${t.btnActive} ${t.ringColor}`}
              aria-label="Restart game"
            >
              Play Again
            </button>
          )}
        </div>
      </div>
    );
  }
);

GameOverModal.displayName = "GameOverModal";

export default GameOverModal;

import React, { memo } from "react";
import { Theme, THEMES } from "@/lib/theme";

interface ScoreBoardProps {
  score: number;
  highScore: number;
  theme: Theme;
}

const ScoreBoard: React.FC<ScoreBoardProps> = memo(({ score, highScore, theme }) => {
  const t = THEMES[theme];

  return (
    <div className={`rounded-lg p-4 border-2 transition-colors duration-300 ${t.panelBg} ${t.panelBorder}`}>
      <div className="flex gap-8 justify-center">
        <div className="text-center">
          <div className={`text-xs font-semibold uppercase tracking-widest mb-1 ${t.textSecondary}`}>
            Score
          </div>
          <div className={`text-4xl font-bold font-mono ${t.textPrimary}`}>
            {score}
          </div>
        </div>
        <div className={`w-px ${t.panelBorder.replace('border-', 'bg-')} opacity-40`} />
        <div className="text-center">
          <div className={`text-xs font-semibold uppercase tracking-widest mb-1 ${t.textSecondary}`}>
            Best
          </div>
          <div className={`text-4xl font-bold font-mono ${t.textPrimary}`}>
            {highScore}
          </div>
        </div>
      </div>
    </div>
  );
});

ScoreBoard.displayName = "ScoreBoard";

export default ScoreBoard;

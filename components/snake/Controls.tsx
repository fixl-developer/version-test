import React, { memo, useState } from "react";
import { Difficulty } from "@/types/snake";
import { Theme, THEMES, THEME_LABELS } from "@/lib/theme";

interface ControlsProps {
  onPause: () => void;
  onRestart: () => void;
  onDifficultyChange: (difficulty: Difficulty) => void;
  onCycleTheme: () => void;
  onToggleMute: () => void;
  onToggleFullscreen: () => void;
  isPaused: boolean;
  theme: Theme;
  isMuted: boolean;
  difficulty: Difficulty;
}

const Controls: React.FC<ControlsProps> = memo(
  ({
    onPause,
    onRestart,
    onDifficultyChange,
    onCycleTheme,
    onToggleMute,
    onToggleFullscreen,
    isPaused,
    theme,
    isMuted,
    difficulty,
  }) => {
    const [showSettings, setShowSettings] = useState(false);
    const t = THEMES[theme];

    const btn = `px-4 py-2 rounded-lg font-semibold transition-all duration-200 focus:outline-none focus:ring-2 ${t.btnBase} ${t.ringColor}`;
    const settingsBtn = `w-full px-3 py-2 rounded text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 ${t.btnBase} ${t.ringColor}`;

    return (
      <div className="flex flex-col gap-4">
        <div className="flex gap-2">
          <button onClick={onPause} className={btn} aria-label={isPaused ? "Resume" : "Pause"}>
            {isPaused ? "▶ Resume" : "⏸ Pause"}
          </button>
          <button onClick={onRestart} className={btn} aria-label="Restart">
            🔄 Restart
          </button>
        </div>

        <button
          onClick={() => setShowSettings(!showSettings)}
          className={btn}
          aria-label="Settings"
        >
          ⚙️ Settings
        </button>

        {showSettings && (
          <div className={`p-4 rounded-lg border-2 animate-fade-in ${t.panelBg} ${t.panelBorder}`}>
            <div className="mb-4">
              <label className={`block text-xs font-semibold uppercase tracking-widest mb-2 ${t.textSecondary}`}>
                Difficulty
              </label>
              <div className="flex gap-2">
                {Object.values(Difficulty).map((level) => (
                  <button
                    key={level}
                    onClick={() => onDifficultyChange(level)}
                    className={`px-3 py-1 rounded text-sm font-semibold transition-all duration-200 focus:outline-none focus:ring-2 ${t.ringColor} ${
                      difficulty === level ? t.btnActive : t.btnBase
                    }`}
                  >
                    {level}
                  </button>
                ))}
              </div>
            </div>

            <div className="mb-3">
              <button onClick={onCycleTheme} className={settingsBtn} aria-label="Cycle theme">
                {THEME_LABELS[theme]} — Switch Theme
              </button>
            </div>

            <div className="mb-3">
              <button onClick={onToggleMute} className={settingsBtn} aria-label={isMuted ? "Unmute" : "Mute"}>
                {isMuted ? "🔇 Unmute" : "🔊 Mute"}
              </button>
            </div>

            <div>
              <button onClick={onToggleFullscreen} className={settingsBtn} aria-label="Fullscreen">
                ⛶ Fullscreen
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }
);

Controls.displayName = "Controls";

export default Controls;

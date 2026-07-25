import React, { memo } from "react";
import { Theme, THEMES } from "@/lib/theme";

interface PauseModalProps {
  onResume: () => void;
  theme: Theme;
}

const PauseModal: React.FC<PauseModalProps> = memo(({ onResume, theme }) => {
  const t = THEMES[theme];

  return (
    <div
      className="absolute inset-0 flex items-center justify-center rounded-lg animate-fade-in"
      style={{ backgroundColor: t.overlayBg }}
    >
      <div className={`text-center p-8 rounded-lg border-2 ${t.panelBg} ${t.panelBorder}`}>
        <h2 className={`text-4xl font-bold mb-4 ${t.textPrimary}`}>PAUSED</h2>
        <p className={`mb-6 ${t.textSecondary}`}>Press P or click Resume to continue</p>
        <button
          onClick={onResume}
          className={`px-6 py-3 rounded-lg font-semibold text-lg transition-all duration-200 focus:outline-none focus:ring-2 ${t.btnActive} ${t.ringColor}`}
          aria-label="Resume game"
        >
          ▶ Resume
        </button>
      </div>
    </div>
  );
});

PauseModal.displayName = "PauseModal";

export default PauseModal;

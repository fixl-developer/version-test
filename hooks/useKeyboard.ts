import { useEffect, useCallback } from "react";
import { Direction } from "@/types/snake";
import { KEY_MAPPINGS } from "@/lib/constants";
import { keyToDirection, isValidDirectionChange } from "@/lib/movement";

/**
 * Custom hook for handling keyboard input
 * @param onDirectionChange - Callback when direction changes
 * @param onPauseToggle - Callback when pause is toggled
 * @param currentDirection - Current snake direction
 * @param isEnabled - Whether keyboard input is enabled
 */
export function useKeyboard(
  onDirectionChange: (direction: Direction) => void,
  onPauseToggle: () => void,
  currentDirection: Direction,
  isEnabled: boolean
) {
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      if (!isEnabled) return;

      // Handle pause toggle
      if (
        event.code === KEY_MAPPINGS.P ||
        event.code === KEY_MAPPINGS.ESCAPE ||
        event.code === KEY_MAPPINGS.SPACE
      ) {
        event.preventDefault();
        onPauseToggle();
        return;
      }

      // Handle direction changes
      const newDirection = keyToDirection(event.code);
      if (newDirection) {
        event.preventDefault();
        
        // Validate direction change (prevent 180-degree turns)
        if (isValidDirectionChange(currentDirection, newDirection)) {
          onDirectionChange(newDirection);
        }
      }
    },
    [isEnabled, currentDirection, onDirectionChange, onPauseToggle]
  );

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [handleKeyDown]);
}

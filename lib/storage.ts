import { STORAGE_KEYS } from "./constants";
import { Theme } from "./theme";

/**
 * Gets a value from localStorage
 * @param key - Storage key
 * @returns The stored value or null if not found
 */
export function getFromStorage<T>(key: string): T | null {
  if (typeof window === "undefined") return null;
  
  try {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error reading from localStorage (${key}):`, error);
    return null;
  }
}

/**
 * Sets a value in localStorage
 * @param key - Storage key
 * @param value - Value to store
 */
export function setToStorage<T>(key: string, value: T): void {
  if (typeof window === "undefined") return;
  
  try {
    window.localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error writing to localStorage (${key}):`, error);
  }
}

/**
 * Removes a value from localStorage
 * @param key - Storage key
 */
export function removeFromStorage(key: string): void {
  if (typeof window === "undefined") return;
  
  try {
    window.localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from localStorage (${key}):`, error);
  }
}

/**
 * Gets the high score from localStorage
 * @returns The high score or 0 if not found
 */
export function getHighScore(): number {
  return getFromStorage<number>(STORAGE_KEYS.HIGH_SCORE) || 0;
}

/**
 * Sets the high score in localStorage
 * @param score - The high score to store
 */
export function setHighScore(score: number): void {
  setToStorage(STORAGE_KEYS.HIGH_SCORE, score);
}

export interface ScoreEntry {
  score: number;
  date: string;
}

export function getTopScores(): ScoreEntry[] {
  return getFromStorage<ScoreEntry[]>(STORAGE_KEYS.TOP_SCORES) || [];
}

export function saveTopScore(score: number): ScoreEntry[] {
  const existing = getTopScores();
  const date = new Date().toLocaleDateString("en-GB", { day: "2-digit", month: "short" });
  const updated = [...existing, { score, date }]
    .sort((a, b) => b.score - a.score)
    .slice(0, 3);
  setToStorage(STORAGE_KEYS.TOP_SCORES, updated);
  return updated;
}

export function getThemePreference(): Theme {
  const stored = getFromStorage<string>(STORAGE_KEYS.THEME);
  if (stored === 'nokia' || stored === 'neon' || stored === 'light') return stored;
  return 'nokia';
}

export function setThemePreference(theme: Theme): void {
  setToStorage(STORAGE_KEYS.THEME, theme);
}

/**
 * Gets the mute preference from localStorage
 * @returns True if muted, false otherwise
 */
export function getMutePreference(): boolean {
  return getFromStorage<boolean>(STORAGE_KEYS.MUTED) ?? false;
}

/**
 * Sets the mute preference in localStorage
 * @param isMuted - True to mute, false to unmute
 */
export function setMutePreference(isMuted: boolean): void {
  setToStorage(STORAGE_KEYS.MUTED, isMuted);
}

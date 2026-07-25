import { STORAGE_KEYS } from "./constants";

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

/**
 * Gets the theme preference from localStorage
 * @returns True if dark mode, false otherwise
 */
export function getThemePreference(): boolean {
  return getFromStorage<boolean>(STORAGE_KEYS.THEME) ?? true;
}

/**
 * Sets the theme preference in localStorage
 * @param isDarkMode - True for dark mode, false for light mode
 */
export function setThemePreference(isDarkMode: boolean): void {
  setToStorage(STORAGE_KEYS.THEME, isDarkMode);
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

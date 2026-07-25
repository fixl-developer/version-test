export type Theme = 'nokia' | 'neon' | 'light'

export const THEME_LABELS: Record<Theme, string> = {
  nokia: '🟢 Nokia',
  neon: '🔵 Neon',
  light: '☀️ Light',
}

export const THEME_CYCLE: Record<Theme, Theme> = {
  nokia: 'neon',
  neon: 'light',
  light: 'nokia',
}

export interface ThemeColors {
  boardBg: string
  boardBorder: string
  gridColor: string
  snakeHead: string
  snakeBody: string
  snakeHeadBorder: string
  snakeGlow: string
  foodColor: string
  foodGlow: string
  pageBg: string
  panelBg: string
  panelBorder: string
  textPrimary: string
  textSecondary: string
  btnBase: string
  btnActive: string
  overlayBg: string
  ringColor: string
}

export const THEMES: Record<Theme, ThemeColors> = {
  nokia: {
    boardBg: '#001100',
    boardBorder: '#00FF00',
    gridColor: '#00FF00',
    snakeHead: '#00FF00',
    snakeBody: '#00CC00',
    snakeHeadBorder: '#FFFFFF',
    snakeGlow: '#00FF00',
    foodColor: '#FF0000',
    foodGlow: '#FF0000',
    pageBg: 'bg-black',
    panelBg: 'bg-[#001100]',
    panelBorder: 'border-[#00FF00]',
    textPrimary: 'text-[#00FF00]',
    textSecondary: 'text-[#00CC00]',
    btnBase: 'bg-[#001100] text-[#00FF00] hover:bg-[#004400]',
    btnActive: 'bg-[#00FF00] text-black',
    overlayBg: 'rgba(0, 17, 0, 0.95)',
    ringColor: 'focus:ring-[#00FF00]',
  },
  neon: {
    boardBg: '#0D0D1A',
    boardBorder: '#00FFFF',
    gridColor: '#00FFFF',
    snakeHead: '#00FFFF',
    snakeBody: '#0099CC',
    snakeHeadBorder: '#FF00FF',
    snakeGlow: '#00FFFF',
    foodColor: '#FF00FF',
    foodGlow: '#FF00FF',
    pageBg: 'bg-[#0D0D1A]',
    panelBg: 'bg-[#1A1A2E]',
    panelBorder: 'border-cyan-400',
    textPrimary: 'text-cyan-400',
    textSecondary: 'text-fuchsia-400',
    btnBase: 'bg-[#1A1A2E] text-cyan-400 hover:bg-[#16213E]',
    btnActive: 'bg-cyan-400 text-black',
    overlayBg: 'rgba(13, 13, 26, 0.95)',
    ringColor: 'focus:ring-cyan-400',
  },
  light: {
    boardBg: '#f0f0f0',
    boardBorder: '#004400',
    gridColor: '#004400',
    snakeHead: '#00CC00',
    snakeBody: '#009900',
    snakeHeadBorder: '#004400',
    snakeGlow: '#00CC00',
    foodColor: '#CC0000',
    foodGlow: '#CC0000',
    pageBg: 'bg-gray-100',
    panelBg: 'bg-gray-200',
    panelBorder: 'border-gray-400',
    textPrimary: 'text-gray-800',
    textSecondary: 'text-gray-600',
    btnBase: 'bg-gray-200 text-gray-800 hover:bg-gray-300',
    btnActive: 'bg-gray-800 text-white',
    overlayBg: 'rgba(0, 0, 0, 0.8)',
    ringColor: 'focus:ring-gray-500',
  },
}

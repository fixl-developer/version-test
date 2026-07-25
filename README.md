# Nokia Snake Game

A production-quality Classic Nokia Snake Game built with Next.js 15 (App Router), TypeScript, React, and Tailwind CSS.

## Features

- **Classic Nokia Snake Gameplay**: Authentic snake game experience with smooth movement
- **Responsive Design**: Works on desktop and mobile devices
- **Dark/Light Mode**: Toggle between retro dark mode and light mode
- **Difficulty Levels**: Easy, Medium, and Hard difficulty settings
- **High Score Tracking**: Persistent high score storage using LocalStorage
- **Keyboard Controls**: Arrow keys and WASD support
- **Mobile Touch Controls**: Swipe gestures for mobile play
- **Pause/Resume**: Pause the game anytime with P key or Space
- **Game Over Screen**: Shows final score, high score, and restart option
- **Countdown Restart**: 3-second countdown before game restart
- **Fullscreen Mode**: Toggle fullscreen for immersive gameplay
- **Sound Toggle**: Mute/unmute sound effects
- **Smooth Animations**: requestAnimationFrame-based game loop for smooth rendering
- **Retro Nokia Styling**: Classic green theme with authentic Nokia aesthetics

## Tech Stack

- **Next.js 15**: React framework with App Router
- **TypeScript**: Type-safe development
- **React Hooks**: Modern React patterns (useState, useEffect, useCallback, useMemo)
- **Tailwind CSS**: Utility-first CSS framework
- **No External Game Libraries**: Pure React/TypeScript implementation
- **requestAnimationFrame**: Efficient game loop implementation

## Project Structure

```
snakegame/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   ├── page.tsx            # Landing page
│   ├── globals.css         # Global styles and Tailwind directives
│   └── snake/
│       └── page.tsx        # Main game page
├── components/
│   └── snake/
│       ├── SnakeBoard.tsx  # Game board component
│       ├── Snake.tsx       # Snake rendering component
│       ├── Food.tsx        # Food rendering component
│       ├── ScoreBoard.tsx  # Score display component
│       ├── Controls.tsx    # Game controls component
│       ├── PauseModal.tsx  # Pause overlay component
│       └── GameOverModal.tsx # Game over screen component
├── hooks/
│   ├── useGameLoop.ts      # Game loop management hook
│   ├── useKeyboard.ts      # Keyboard input handling hook
│   └── useSnake.ts         # Snake game state management hook
├── lib/
│   ├── collision.ts        # Collision detection utilities
│   ├── food.ts             # Food generation utilities
│   ├── movement.ts         # Movement logic utilities
│   ├── storage.ts           # LocalStorage utilities
│   └── constants.ts        # Game constants
├── types/
│   └── snake.ts            # TypeScript type definitions
├── package.json            # Dependencies and scripts
├── tsconfig.json           # TypeScript configuration
├── tailwind.config.ts      # Tailwind CSS configuration
├── next.config.ts          # Next.js configuration
├── postcss.config.mjs      # PostCSS configuration
└── .eslintrc.json          # ESLint configuration
```

## Installation

1. **Install dependencies**:
   ```bash
   npm install
   ```

2. **Run the development server**:
   ```bash
   npm run dev
   ```

3. **Open your browser**:
   Navigate to [http://localhost:3000](http://localhost:3000)

4. **Start playing**:
   Click "Play Game" on the landing page to start the game

## Game Controls

### Desktop
- **Arrow Keys**: Move snake (Up, Down, Left, Right)
- **WASD**: Alternative movement controls
- **P**: Pause/Resume game
- **Space**: Pause/Resume game
- **Escape**: Pause game

### Mobile
- **Swipe**: Swipe in the direction you want to move

## Game Rules

1. **Objective**: Eat food to grow longer and increase your score
2. **Movement**: Snake continuously moves in the current direction
3. **Eating**: Each food eaten increases score by 10 points and snake length by 1
4. **Speed**: Game speed increases every 5 foods eaten (minimum 60ms)
5. **Collision**: Game ends if snake hits a wall or itself
6. **High Score**: Your best score is saved automatically

## Difficulty Levels

- **Easy**: Initial speed 200ms
- **Medium**: Initial speed 150ms (default)
- **Hard**: Initial speed 100ms

## Speed Progression

The game speed increases every 5 foods eaten:
- Starts at difficulty-based speed
- Decreases by 10ms every 5 foods
- Minimum speed: 60ms

## Build for Production

```bash
npm run build
npm start
```

## Linting

```bash
npm run lint
```

## Game Board Specifications

- **Grid Size**: 20x20 cells
- **Cell Size**: 25px
- **Board Size**: 500x500px
- **Initial Snake Length**: 3 blocks
- **Snake Head**: Different color with glow effect
- **Food**: Red with pulse animation

## Accessibility

- Keyboard accessible controls
- ARIA labels on all interactive elements
- Focusable buttons with visible focus rings
- Screen reader friendly

## Performance Optimizations

- React.memo for component memoization
- useCallback for function memoization
- useMemo for expensive computations
- Efficient requestAnimationFrame game loop
- Delta timing for consistent movement
- Minimal re-renders

## Browser Support

- Modern browsers with ES2020 support
- Chrome/Edge (recommended)
- Firefox
- Safari

## License

This project is open source and available for educational purposes.

## Credits

Built with Next.js, React, TypeScript, and Tailwind CSS.
Inspired by the classic Nokia Snake game.

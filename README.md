# Biglight Component Library

Multi-brand component library built with Preact, Tailwind CSS, and Storybook.

## Overview

A design-to-code workflow demonstration with foundational components (Button, Input, Dropdown, Card) and a composition example (Login Drawer). All components support theme switching between Brand A and Brand B.

## Features

- 5 core components (Button, Input, Dropdown, Card, LoginDrawer)
- Multi-brand theme support (Brand A & B)
- CSS variable-based design tokens
- Storybook integration with all variants
- Accessibility support (keyboard navigation, ARIA attributes)
- TypeScript throughout

## Installation

```bash
npm install
```

**Prerequisites**: Node.js 18+

## Running

**Development server**:
```bash
npm run dev
```
Runs at `http://localhost:5173`

**Storybook**:
```bash
npm run storybook
```
Runs at `http://localhost:6006`

**Build Storybook**:
```bash
npm run build-storybook
```

## Theme Switching

Use the theme selector in the Storybook toolbar to switch between:
- **Brand A**: Orange primary, Paper secondary
- **Brand B**: Cherry primary, Salt secondary

## Time Spent

~6 hours

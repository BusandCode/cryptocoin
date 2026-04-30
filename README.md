# Cryptocoin - Financial Dashboard Application

A modern, responsive financial dashboard built with React, TypeScript, and Vite. Cryptocoin provides users with a comprehensive view of their financial accounts, wallet management, transaction history, and quick financial actions.

## Table of Contents

- [Quick Start](#quick-start)
- [Project Architecture](#project-architecture)
- [Technology Stack](#technology-stack)
- [Project Structure](#project-structure)
- [Component Guide](#component-guide)
- [Development Workflow](#development-workflow)
- [Build & Deployment](#build--deployment)

---

## Quick Start

### Prerequisites

- Node.js 18+ and npm/yarn installed

### Installation

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

The app will be available at `http://localhost:5173` (default Vite port).

---

## Project Architecture

### Overview

Finsight follows a **component-based architecture** with clear separation of concerns:

```
App (Root)
├── HomePage (Landing page)
└── Dashboard (Main application)
    ├── Wallet (Wallet management)
    ├── Header (Navigation & user info)
    ├── BalanceSection (Account balance display)
    ├── CardSection (Payment cards)
    ├── QuickActions (Fast transaction options)
    ├── RecentActivity (Transaction history)
    └── BottomNav (Mobile navigation)
```

### Data Flow

- **State Management**: React hooks (`useState`, `useEffect`)
- **Routing**: React Router v7 for navigation between pages
- **Styling**: Tailwind CSS for utility-first styling
- **Icons**: Lucide React and React Icons for UI elements

---

## Technology Stack

| Technology | Purpose | Version |
|---|---|---|
| React | UI Framework | 19.2.4 |
| TypeScript | Type Safety | 6.0.2 |
| Vite | Build Tool & Dev Server | 8.0.4 |
| React Router | Client-side Routing | 7.14.1 |
| Tailwind CSS | Styling | 4.2.2 |
| Lucide React | Icons | 1.8.0 |
| React Icons | Additional Icons | 5.6.0 |
| ESLint | Code Linting | 9.39.4 |

---

## Project Structure

### Root Files

```
├── index.html           # Entry point HTML file
├── package.json         # Dependencies and scripts
├── tsconfig.json        # TypeScript base configuration
├── tsconfig.app.json    # App-specific TypeScript config
├── tsconfig.node.json   # Node/build config
├── vite.config.ts       # Vite bundler configuration
├── eslint.config.js     # Linting rules
└── README.md            # This file
```

### Source Directory (`src/`)

#### Top-Level Files

- **`main.tsx`** - React application bootstrap, renders App component to DOM
- **`App.tsx`** - Root component with routing configuration
- **`HomePage.tsx`** - Landing page with marketing content and scroll animations
- **`index.css`** - Global styles
- **`types.ts`** - Shared TypeScript type definitions

#### `/components` - Reusable UI Components

**Authentication (`/auth`)**
- `Login.tsx` - User login form component
- `Register.tsx` - User registration form component

**Dashboard (`/dashboard`)**
- `Dashboard.tsx` - Main dashboard layout container
- `Wallet.ts` - Wallet utility/helper functions

**Dashboard Subcomponents (`/dashboard/components`)**
- `Header.tsx` - Top navigation bar with user menu
- `BalanceSection.tsx` - Displays account balance and account information
- `CardSection.tsx` - Shows payment card options
- `QuickActions.tsx` - Buttons for common transactions (Send, Receive, Withdraw, Pay)
- `RecentActivity.tsx` - Transaction history feed
- `BottomNav.tsx` - Mobile bottom navigation bar
- `NavIcons.tsx` - Icon components for navigation
- `WithdrawalModal.tsx` - Modal dialog for withdrawal transactions

**Dashboard Data (`/dashboard/data`)**
- `transactions.ts` - Mock transaction data for RecentActivity component

**Wallet (`/wallet`)**
- `Wallet.ts` - Wallet type definitions and utilities

#### `/styles` - Global Stylesheets

- `landing.css` - Styles for HomePage and landing page animations
- `dashboard.css` - Styles for dashboard components

#### `/assets` - Static Assets

- `fonts/` - Custom font files (Poppins via @fontsource)

---

## Component Guide

### Key Components by Purpose

#### **Layout Components**

| Component | Purpose | Props |
|---|---|---|
| `Dashboard` | Main layout wrapper | N/A |
| `Header` | Top navigation & user info | Receives auth state |
| `BottomNav` | Mobile navigation (sticky) | Navigation callbacks |

#### **Financial Display Components**

| Component | Purpose | Data Source |
|---|---|---|
| `BalanceSection` | Shows total balance & account details | State/Props |
| `CardSection` | Displays payment methods | State/Props |
| `RecentActivity` | Transaction history list | `transactions.ts` |

#### **Action Components**

| Component | Purpose | Behavior |
|---|---|---|
| `QuickActions` | 4 quick action buttons | Open modals/navigate |
| `WithdrawalModal` | Withdrawal form & confirmation | Modal state |

#### **Page Components**

| Component | Purpose | Route |
|---|---|---|
| `HomePage` | Landing/marketing page | `/` |
| `Dashboard` | Main app interface | `/dashboard` |
| `Login` | Authentication page | `/login` |
| `Register` | Registration page | `/register` |

---

## Development Workflow

### Common Tasks

#### Running the Dev Server

```bash
npm run dev
```

This starts Vite's development server with Hot Module Replacement (HMR). Changes save automatically.

#### Adding a New Component

1. Create a `.tsx` file in the appropriate directory under `/src/components`
2. Use functional components with React hooks
3. Export the component as default
4. Import and use in parent components

Example:
```typescript
// src/components/MyComponent.tsx
import React from 'react';

const MyComponent: React.FC<Props> = ({ prop1 }) => {
  return <div>{prop1}</div>;
};

export default MyComponent;
```

#### Styling Components

- **Preferred**: Use Tailwind CSS classes directly in JSX
- **Alternative**: Add CSS in `/src/styles/` files
- **File**: `dashboard.css` for dashboard-related styles
- **File**: `landing.css` for homepage animations

#### Linting & Type Checking

```bash
# Run ESLint to find issues
npm run lint

# TypeScript compilation check (in build)
npm run build  # Runs tsc -b first
```

### Code Conventions

- **Naming**: PascalCase for components, camelCase for functions/variables
- **Typing**: Use TypeScript types; avoid `any`
- **Imports**: Group imports (React, libraries, local components)
- **Hooks**: Use functional components with hooks, not class components

---

## Build & Deployment

### Development Build

```bash
npm run dev
```

Runs Vite dev server at `http://localhost:5173` with HMR.

### Production Build

```bash
npm run build
```

Creates optimized production bundle:
1. TypeScript compilation (`tsc -b`)
2. Vite build bundling → `dist/` directory
3. Output is minified and optimized

### Preview Production Build Locally

```bash
npm run preview
```

Serves the production build locally for testing before deployment.

### Deployment Steps

1. Run `npm run build` to generate `dist/` folder
2. Deploy `dist/` folder contents to your hosting provider (Vercel, Netlify, GitHub Pages, etc.)
3. Ensure routing is configured for SPA (single page application)

---

## Debugging & Troubleshooting

### Hot Module Replacement Not Working

- Restart dev server: `npm run dev`
- Clear `.vite` cache

### Build Errors

- Check TypeScript errors: `npx tsc --noEmit`
- Review ESLint: `npm run lint`
- Clear `node_modules` and reinstall: `rm -rf node_modules && npm install`

### Type Errors

- Check `src/types.ts` for shared type definitions
- Verify TypeScript strict mode is enabled in `tsconfig.json`
- Use explicit return types in functions for better IDE support

---

## Performance Considerations

- **Code Splitting**: React Router enables automatic route-based code splitting
- **Lazy Loading**: Intersection Observer in HomePage for scroll animations
- **CSS**: Tailwind purges unused styles in production builds

---

## Future Enhancements

- [ ] Backend API integration for real transaction data
- [ ] Authentication system (login/register flow)
- [ ] State management library (Redux/Zustand) for complex state
- [ ] E2E testing (Cypress/Playwright)
- [ ] Unit tests (Vitest)
- [ ] PWA capabilities for mobile app experience

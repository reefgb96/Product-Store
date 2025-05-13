# Full Stack TypeScript Project

This is a modern full-stack application built with TypeScript, featuring a React frontend and Node.js/Express backend.

## Project Structure

```
.
├── client/             # React frontend
└── server/             # Node.js/Express backend
```

## Frontend Features

- React 18 with TypeScript
- Vite for fast development and building
- React Router for navigation
- Axios for API calls
- ESLint and Prettier for code quality
- Modern folder structure

## Backend Features

- Node.js with TypeScript
- Express.js framework
- CORS enabled
- Environment variables support
- Basic CRUD operations structure
- ESLint and Prettier

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository
2. Install frontend dependencies:
   ```bash
   cd client
   npm install
   ```
3. Install backend dependencies:
   ```bash
   cd server
   npm install
   ```

### Development

1. Start the backend server:
   ```bash
   cd server
   npm run dev
   ```

2. Start the frontend development server:
   ```bash
   cd client
   npm run dev
   ```

The frontend will be available at `http://localhost:5173`
The backend will be available at `http://localhost:3000`

## Available Scripts

### Frontend (client directory)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier

### Backend (server directory)
- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run start` - Start production server
- `npm run lint` - Run ESLint
- `npm run format` - Format code with Prettier 
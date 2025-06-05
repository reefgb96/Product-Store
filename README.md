# Simple Product Management App

This project is a simple product management application with a React frontend and a Node.js/Express backend, built with TypeScript.

The application allows users to view, add, edit, and delete products. It includes features for searching, sorting, and pagination. Data is persisted using a simple database (Simulated with Sequelize and SQLite in development for demonstration purposes). The UI is designed to mimic the provided mockup.

## Project Structure

```
.
├── client/             # React frontend
└── server/             # Node.js/Express backend
```

## Features Implemented

### Frontend

-   Displaying a list of products.
-   Viewing product details in a side pane on item click.
-   Adding a new empty product.
-   Saving product details (new and existing).
-   Deleting products.
-   Validation for product details (name not empty, price > 0).
-   Pagination (Displaying 5 products per page, navigation to next/previous, first/last page).
-   Searching products by title or description.
-   Sorting products (by name).
-   Routing with `react-router-dom` (hash-based) for product list and details (`#/products`, `#/products/:productId`).
-   Synchronizing pagination, search, and sort with URL query parameters.
-   Displaying loaders during data fetching and mutation operations.
-   Displaying error messages for failed operations.
-   Displaying a static error page for server issues.
-   Basic styling mimicking the mockup.

### Backend

-   Node.js/Express.js with TypeScript.
-   Basic API routes for CRUD operations (`/api/products`).
-   Added API endpoints for searching, sorting, and pagination.
-   Refactored logic into controller, service, and db-manager layers.
-   Implemented basic error handling middleware.
-   Wrapped service and db-manager logic in try-catch blocks.
-   Separated routes into a dedicated directory.
-   Database synchronization and seeding with mock data.
-   CORS enabled.

## Getting Started

### Prerequisites

-   Node.js (v18 or higher)
-   npm or yarn

### Installation

1.  Clone the repository.
2.  Install frontend dependencies:
    ```bash
    cd client
    npm install
    ```
3.  Install backend dependencies:
    ```bash
    cd server
    npm install
    ```

### Development

1.  Start the backend server:
    ```bash
    cd server
    npm run dev
    ```

2.  Start the frontend development server:
    ```bash
    cd client
    npm run dev
    ```

The frontend will be available at `http://localhost:5173`. The main route is `/products`.
The backend will be available at `http://localhost:3000`.
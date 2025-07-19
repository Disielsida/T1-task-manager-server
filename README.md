# T1 Task Manager — Server

Backend REST API for managing tasks using **Node.js**, **Express**, and **TypeScript**.

## Stack

- Node.js + Express
- TypeScript
- In-memory data store (array)
- ESLint + Prettier

## Scripts

```bash
npm run dev        # Start server with ts-node-dev
npm run lint       # Run ESLint
npm run lint:fix   # Fix ESLint errors
npm run format     # Format with Prettier
```

## API Endpoints

```http
GET    /tasks         # Get all tasks
GET    /tasks/:id     # Get task by ID
POST   /tasks         # Create a new task
PATCH  /tasks/:id     # Update task by ID
DELETE /tasks/:id     # Delete task by ID
```

# Vitalae Backend Server

This backend server stores user data for the Vitalae website using Node.js, Express, and SQLite.

## Prerequisites
- [Node.js](https://nodejs.org/) (v14 or higher recommended)

## Setup
1. Open a terminal and navigate to the `vitalae` directory:
   ```sh
   cd vitalae
   ```
2. Install dependencies:
   ```sh
   npm install
   ```

## Running the Server
Start the backend server with:
```sh
npm start
```
The server will run on [http://localhost:3001](http://localhost:3001) by default.

## API Endpoints
- `POST /api/register` — Register a new user. Expects JSON body: `{ "name": "...", "email": "...", "password": "..." }`
- `GET /api/users` — Get a list of all registered users (excluding passwords).

## Database
- User data is stored in a local SQLite database file named `users.db` in the `vitalae` directory.

## Connecting to the Frontend
- Update your frontend code (e.g., in `script.js`) to make requests to `http://localhost:3001/api/register` and `http://localhost:3001/api/users` for user registration and retrieval.
- If deploying both frontend and backend, consider using a reverse proxy or updating CORS settings as needed.

## Deployment
- For production, deploy the backend on a server (e.g., using services like Heroku, Render, or a VPS).
- Ensure the `users.db` file is secure and backed up as needed.

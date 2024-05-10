---

# Vue.js Frontend and Node.js Backend with TypeScript

This project demonstrates how to build a full-stack web application using Vue.js for the frontend and Node.js with TypeScript for the backend.

## Frontend (Vue.js)

### Project Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/vladiere/verbose-student
   ```

2. Navigate to the frontend directory:

   ```bash
   cd spotify/frontend
   ```

3. Install dependencies:

   ```bash
   npm install
   ```

### Development

1. Run the development server:

   ```bash
   npm run dev
   ```

2. Visit `http://localhost:5173` in your browser to view the application.

### Build

To build the project for production:

```bash
npm run build
```

The compiled files will be in the `dist` directory.

## Backend (Node.js with TypeScript)

### Project Setup

1. Navigate to the backend directory:

   ```bash
   cd ../backend
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

### Development

1. Run the development server:

   ```bash
   npm run start:dev
   ```

   This will compile the TypeScript files and start the server using nodemon.

2. The server will be running on `http://localhost:3000` by default.

### Build and Start

To build the TypeScript files and start the server:

```bash
npm run build
npm start
```

### Directory Structure

- `src`: Contains the source files for the backend.
- `dist`: Contains the compiled JavaScript files.
- `tsconfig.json`: TypeScript configuration file.

## Additional Information

- Make sure to configure the backend to connect to your database and adjust any environment variables as needed.
- Refer to the respective documentation for Vue.js and Node.js with TypeScript for more detailed information on development and deployment.

---

### Database Migrations

To migrate the database:

```bash
cd ../migrations
```
Copy the .sql files content and then paste it in your database manager.

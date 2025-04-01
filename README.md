# Task Manager App

A simple task manager app that allows users to **Create**, **Read**, **Update**, and **Delete** tasks. Built with **Next.js** for the frontend and **Prisma** for database management, this app provides a clean, responsive interface that works on both desktop and mobile devices.

## Features

- **Create**: Add new tasks with a title and description.
- **Read**: View a list of all tasks and their details.
- **Update**: Edit an existing task.
- **Delete**: Remove a task from the list.
- **Input Validation**: Ensures all fields are filled before submitting.

## Technologies Used

- **Next.js**: Frontend framework
- **Prisma**: Database ORM
- **Tailwind CSS**: Styling framework
- **Framer Motion**: Animations
- **API Routes**: For backend logic (CRUD operations)

## Installation Guide

To run this project locally, follow these steps:

### 1. Clone the repository:

```bash
git clone https://github.com/devJames3/task-manager.git
```

### 2. Install dependencies:

Navigate to the project folder and install the necessary packages:

```bash
cd task-manager-app
npm install
```

### 3. Set up environment variables:

Create a `.env` file in the root directory of the project and add the necessary environment variables for the database connection. Example for Sqlite:

```bash
DATABASE_URL="file:./database_name.db"
```

### 4. Set up the database:

If you don’t have a database set up, you'll need to create one and apply the migrations.

#### Steps for setting up the database:

- Install PostgreSQL (or another relational database, depending on your choice).

- We used `Sqlite` for development but you can create a new database if you haven't already, using your preferred database client (e.g., psql, pgAdmin, or any other tool). But

- Run Prisma migrations to set up the database schema. This will apply the models defined in your Prisma schema (schema.prisma) to the database.

Run the following command to apply the migrations:

```bash
npx prisma migrate dev
```

Generate the database tables based on the models in your Prisma schema.

Create a .env file (if it doesn’t exist) with the correct database URL.

### 5. Run the app:

```bash
npm run dev
```

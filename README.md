# Task Manager API

## Overview

A RESTful API for managing tasks built with Node.js and Express. This API allows you to create, read, update, and delete tasks with features like filtering by completion status, sorting by creation date, and priority management.

## Features

- ✅ Create, Read, Update, and Delete tasks
- ✅ Filter tasks by completion status
- ✅ Sort tasks by creation date (ascending/descending)
- ✅ Priority management (low, medium, high)
- ✅ Input validation and error handling
- ✅ In-memory data storage

## Setup Instructions

### Prerequisites

- Node.js version 18 or higher
- npm (Node Package Manager)

### Installation

1. Clone the repository:
   ```bash
   git clone https://github.com/airtribe-projects/task-manager-api-sudheer1509.git
   cd task-manager-api-sudheer1509
   ```

2. Install dependencies:
   ```bash
   npm install
   ```
   
   This will install:
   - **express** (^4.18.2) - Web framework for Node.js
   - **nodemon** (dev dependency) - Auto-restart server during development

3. Start the server:
   ```bash
   npm run dev
   ```
   
   This uses the `dev` script configured in package.json to run the server with nodemon.
   
   Alternatively, run without nodemon:
   ```bash
   node app.js
   ```

4. The server will start on `http://localhost:3000`

## API Endpoints

### Base URL
```
http://localhost:3000/api/v1
```

### 1. Get All Tasks

**Endpoint:** `GET /tasks`

**Description:** Retrieve all tasks with optional filtering and sorting.

**Query Parameters:**
- `completed` (optional): Filter by completion status (`true` or `false`)
- `sort` (optional): Sort by creation date (`asc` or `desc`, default: `asc`)

**Examples:**
```bash
# Get all tasks
GET http://localhost:3000/api/v1/tasks

# Get completed tasks
GET http://localhost:3000/api/v1/tasks?completed=true

# Get tasks sorted by newest first
GET http://localhost:3000/api/v1/tasks?sort=desc

# Get completed tasks sorted by newest first
GET http://localhost:3000/api/v1/tasks?completed=true&sort=desc
```

**Response:**
```json
{
  "count": 15,
  "tasks": [
    {
      "id": 1,
      "title": "Set up environment",
      "description": "Install Node.js, npm, and git",
      "completed": true,
      "priority": "high",
      "createdAt": "2026-03-01T08:30:00.000Z"
    }
  ]
}
```

---

### 2. Get Task by ID

**Endpoint:** `GET /tasks/:id`

**Description:** Retrieve a specific task by its ID.

**Example:**
```bash
GET http://localhost:3000/api/v1/tasks/1
```

**Response:**
```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true,
  "priority": "high",
  "createdAt": "2026-03-01T08:30:00.000Z"
}
```

**Error Response (404):**

Returned when the task with the specified ID does not exist.

```json
{
  "error": "Task not found"
}
```

**Error Response (400):**

Returned when the ID parameter is invalid (not a number).

```json
{
  "error": "Invalid task ID"
}
```

---

### 3. Create Task

**Endpoint:** `POST /tasks`

**Description:** Create a new task.

**Request Body:**
```json
{
  "title": "Learn Express.js",
  "description": "Complete Express.js tutorial",
  "completed": false,
  "priority": "high"
}
```

**Required Fields:**
- `title` (string, non-empty)
- `description` (string, non-empty)

**Optional Fields:**
- `completed` (boolean, default: `false`)
- `priority` (string: "low", "medium", or "high", default: "medium")

**Example:**
```bash
POST http://localhost:3000/api/v1/tasks
Content-Type: application/json

{
  "title": "Learn Express.js",
  "description": "Complete Express.js tutorial",
  "completed": false,
  "priority": "high"
}
```

**Response (201):**
```json
{
  "id": 16,
  "title": "Learn Express.js",
  "description": "Complete Express.js tutorial",
  "completed": false,
  "priority": "high",
  "createdAt": "2026-03-24T10:30:00.000Z"
}
```

**Error Response (400):**

Returned when validation fails for any required field.

```json
{
  "error": "Title is required and must be a non-empty string"
}
```

Other possible validation errors:
- `"Description is required and must be a non-empty string"`
- `"Completed must be a boolean value"`
- `"Priority must be one of: low, medium, high"`

---

### 4. Update Task

**Endpoint:** `PUT /tasks/:id`

**Description:** Update an existing task. All fields are optional.

**Request Body:**
```json
{
  "title": "Updated title",
  "description": "Updated description",
  "completed": true,
  "priority": "low"
}
```

**Example:**
```bash
PUT http://localhost:3000/api/v1/tasks/1
Content-Type: application/json

{
  "completed": true,
  "priority": "low"
}
```

**Response (200):**
```json
{
  "id": 1,
  "title": "Set up environment",
  "description": "Install Node.js, npm, and git",
  "completed": true,
  "priority": "low",
  "createdAt": "2026-03-01T08:30:00.000Z"
}
```

**Error Response (404):**

Returned when the task with the specified ID does not exist.

```json
{
  "error": "Task not found"
}
```

**Error Response (400):**

Returned when validation fails for any field or the ID parameter is invalid.

```json
{
  "error": "Title must be a non-empty string"
}
```

Other possible validation errors:
- `"Description must be a non-empty string"`
- `"Completed must be a boolean value"`
- `"Invalid task ID"`

---

### 5. Delete Task

**Endpoint:** `DELETE /tasks/:id`

**Description:** Delete a task by its ID.

**Example:**
```bash
DELETE http://localhost:3000/api/v1/tasks/1
```

**Response (200):**
```json
{
  "message": "Task deleted successfully"
}
```

**Error Response (404):**

Returned when the task with the specified ID does not exist.

```json
{
  "error": "Task not found"
}
```

**Error Response (400):**

Returned when the ID parameter is invalid (not a number).

```json
{
  "error": "Invalid task ID"
}
```

---

## Testing the API

### Using Postman

1. **Setup**
   - Open Postman
   - Set the base URL to `http://localhost:3000/api/v1`

2. **Get All Tasks**
   - Method: `GET`
   - URL: `http://localhost:3000/api/v1/tasks`
   - Optional query parameters:
     - `?completed=true` or `?completed=false`
     - `?sort=asc` or `?sort=desc`
     - `?priority=low`, `?priority=medium`, or `?priority=high`

3. **Get Task by ID**
   - Method: `GET`
   - URL: `http://localhost:3000/api/v1/tasks/1`

4. **Create a Task**
   - Method: `POST`
   - URL: `http://localhost:3000/api/v1/tasks`
   - Headers: `Content-Type: application/json`
   - Body (select "raw" and "JSON"):
     ```json
     {
       "title": "New Task",
       "description": "Task description",
       "completed": false,
       "priority": "high"
     }
     ```

5. **Update a Task**
   - Method: `PUT`
   - URL: `http://localhost:3000/api/v1/tasks/1`
   - Headers: `Content-Type: application/json`
   - Body (select "raw" and "JSON"):
     ```json
     {
       "completed": true,
       "priority": "low"
     }
     ```

6. **Delete a Task**
   - Method: `DELETE`
   - URL: `http://localhost:3000/api/v1/tasks/1`

7. **Get Tasks by Priority**
   - Method: `GET`
   - URL: `http://localhost:3000/api/v1/tasks/priority/high`
   - Replace `high` with `low` or `medium` as needed

### Running Tests

Run the test suite:
```bash
npm test
```

## Error Codes

- `200` - Success
- `201` - Created
- `400` - Bad Request (Invalid input)
- `404` - Not Found
- `500` - Internal Server Error

## Data Validation

### Title & Description
- Must be non-empty strings
- Whitespace is trimmed

### Completed
- Must be a boolean value (`true` or `false`)

### Priority
- Must be one of: `"low"`, `"medium"`, `"high"`
- Validated during creation and updates

### Task ID
- Must be a valid number
- Returns 400 error for invalid IDs

## Project Structure

```
task-manager-api-sudheer1509/
├── app.js                    # Main application entry point
├── package.json              # Project dependencies
├── models/
│   └── tasksModel.js        # In-memory task data
├── controllers/
│   └── tasksController.js   # Business logic
├── routes/
│   └── tasksRoutes.js       # API routes
└── test/
    └── server.test.js       # Test cases
```

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework

## Notes

- Data is stored in memory and will be lost when the server restarts
- The server runs on port 3000 by default
- All timestamps are in ISO 8601 format (UTC)


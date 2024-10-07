# Task Management System Documentation

## API Documentation

### Base URL
```
http://localhost:8000/api/v1
```

### Endpoints

#### 1. Create a Task

- **URL:** `/task/create`
- **Method:** `POST`
- **Description:** Create a new task by providing task details.

- **Request Body:**
  ```json
  {
    "title": "string",         // Title of the task
    "description": "string",   // Detailed description of the task
    "dueDate": "string",       // Due date of the task (format: YYYY-MM-DD)
    "priority": "string",      // Priority of the task (values: low, medium, high)
    "status": "string"         // Current status of the task (values: pending, in-progress, completed)
  }
  ```

- **Responses:**
  - **201 Created**
    - **Description:** Task created successfully.
    - **Response Body:**
      ```json
      {
        "_id": "string",         // Task ID
        "title": "string",
        "description": "string",
        "dueDate": "string",
        "priority": "string",
        "status": "string"
      }
      ```
  - **400 Bad Request**
    - **Description:** Invalid task data (missing required fields).
    - **Response Body:**
      ```json
      {
        "message": "Title is required!" // or other validation messages
      }
      ```
  - **500 Internal Server Error**
    - **Description:** General error handling for server issues.
    - **Response Body:**
      ```json
      {
        "message": "Error message here"
      }
      ```

#### 2. Get All Tasks

- **URL:** `/tasks`
- **Method:** `GET`
- **Description:** Retrieve all tasks.

- **Responses:**
  - **200 OK**
    - **Response Body:**
      ```json
      {
        "length": 0,                // Number of tasks
        "tasks": [                  // Array of task objects
          {
            "_id": "string",
            "title": "string",
            "description": "string",
            "dueDate": "string",
            "priority": "string",
            "status": "string"
          }
        ]
      }
      ```

#### 3. Get a Task

- **URL:** `/task/:id`
- **Method:** `GET`
- **Description:** Retrieve a single task by its ID.

- **Responses:**
  - **200 OK**
    - **Response Body:**
      ```json
      {
        "_id": "string",
        "title": "string",
        "description": "string",
        "dueDate": "string",
        "priority": "string",
        "status": "string"
      }
      ```
  - **400 Bad Request**
    - **Description:** Please provide a task ID.
  - **404 Not Found**
    - **Description:** Task not found.

#### 4. Update a Task

- **URL:** `/task/:id`
- **Method:** `PATCH`
- **Description:** Update an existing task by ID.

- **Request Body:**
  ```json
  {
    "title": "string",
    "description": "string",
    "dueDate": "string",
    "priority": "string",
    "status": "string",
    "completed": "boolean"
  }
  ```

- **Responses:**
  - **200 OK**
    - **Response Body:**
      ```json
      {
        "_id": "string",
        "title": "string",
        "description": "string",
        "dueDate": "string",
        "priority": "string",
        "status": "string"
      }
      ```
  - **404 Not Found**
    - **Description:** Task not found.

#### 5. Delete a Task

- **URL:** `/task/:id`
- **Method:** `DELETE`
- **Description:** Delete a task by its ID.

- **Responses:**
  - **200 OK**
    - **Response Body:**
      ```json
      {
        "message": "Task deleted successfully!"
      }
      ```
  - **404 Not Found**
    - **Description:** Task not found.

---

## Frontend Documentation

### Tasks Context

The `TasksContext` provides a context for managing tasks in a React application. It uses Axios for making API calls to the backend.

### Key Features

- **State Management:** 
  - `tasks`: Array of tasks fetched from the API.
  - `loading`: Boolean indicating loading state.
  - `task`: Object representing the currently selected task.
  - `isEditing`: Boolean indicating if a task is being edited.
  - `priority`: String for filtering tasks by priority.
  - `activeTask`: Currently active task for editing.
  - `modalMode`: Mode of the modal (`add` or `edit`).
  - `profileModal`: Boolean to manage profile modal visibility.

### Functions

1. **getTasks:** Fetches all tasks from the API and updates the `tasks` state.
2. **getTask:** Fetches a specific task based on its ID.
3. **createTask:** Creates a new task using the provided task data.
4. **updateTask:** Updates an existing task with the given data.
5. **deleteTask:** Deletes a task based on its ID.
6. **handleInput:** Handles changes to input fields for the task.

### Usage

Wrap your application with the `TasksProvider` to provide context to your components:

```javascript
import { TasksProvider } from "./context/TasksContext";

const App = () => {
  return (
    <TasksProvider>
      {/* Your components here */}
    </TasksProvider>
  );
};
```

Use the `useTasks` hook to access tasks and functions in your components:

```javascript
import { useTasks } from "./context/TasksContext";

const MyComponent = () => {
  const { tasks, createTask, loading } = useTasks();

  // Use tasks and functions as needed
};
```

### Note
Ensure that the API server is running, and the `serverUrl` is correctly set in your context to avoid connectivity issues.

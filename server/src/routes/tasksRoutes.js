import express from "express";
import {
  createTask,
  deleteTask,
  getTask,
  getTasks,
  updateTask,
} from "../controllers/task/taskController.js";

const taskRoutes = express.Router();

/**
 * @swagger
 * /task/create:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task by providing task details.
 *     responses:
 *       201:
 *         description: Task created successfully
 *       400:
 *         description: Bad request, invalid task data
 */
taskRoutes.post("/task/create", createTask);

/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve a list of all tasks.
 *     responses:
 *       200:
 *         description: Successfully retrieved list of tasks
 *       500:
 *         description: Internal server error
 */
taskRoutes.get("/tasks", getTasks);

/**
 * @swagger
 * /task/{id}:
 *   get:
 *     summary: Get a specific task
 *     description: Retrieve a task by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Successfully retrieved task
 *       404:
 *         description: Task not found
 */
taskRoutes.get("/task/:id", getTask);

/**
 * @swagger
 * /task/{id}:
 *   patch:
 *     summary: Update a task
 *     description: Update a task's details by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task updated successfully
 *       404:
 *         description: Task not found
 */
taskRoutes.patch("/task/:id", updateTask);

/**
 * @swagger
 * /task/{id}:
 *   delete:
 *     summary: Delete a task
 *     description: Delete a task by its ID.
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *         description: The task ID
 *     responses:
 *       200:
 *         description: Task deleted successfully
 *       404:
 *         description: Task not found
 */
taskRoutes.delete("/task/:id", deleteTask);

export default taskRoutes;

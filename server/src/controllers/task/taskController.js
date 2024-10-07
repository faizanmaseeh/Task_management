import asyncHandler from "express-async-handler";
import TaskModel from "../../models/tasks/TaskModel.js";

/**
 * @swagger
 * components:
 *   schemas:
 *     Task:
 *       type: object
 *       required:
 *         - title
 *         - description
 *         - dueDate
 *         - priority
 *         - status
 *       properties:
 *         title:
 *           type: string
 *           description: Title of the task
 *         description:
 *           type: string
 *           description: Detailed description of the task
 *         dueDate:
 *           type: string
 *           format: date
 *           description: Due date of the task
 *         priority:
 *           type: string
 *           enum: [low, medium, high]
 *           description: Priority of the task
 *         status:
 *           type: string
 *           enum: [pending, in-progress, completed]
 *           description: Current status of the task
 *         completed:
 *           type: boolean
 *           description: Is the task completed?
 *         user:
 *           type: string
 *           description: User ID who created the task
 */

/**
 * @swagger
 * /task/create:
 *   post:
 *     summary: Create a new task
 *     description: Create a new task by providing task details.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       201:
 *         description: Task created successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       400:
 *         description: Bad request, invalid task data
 *       500:
 *         description: Internal server error
 */
export const createTask = asyncHandler(async (req, res) => {
  try {
    const { title, description, dueDate, priority, status } = req.body;

    if (!title || title.trim() === "") {
      return res.status(400).json({ message: "Title is required!" });
    }

    if (!description || description.trim() === "") {
      return res.status(400).json({ message: "Description is required!" });
    }

    const task = new TaskModel({
      title,
      description,
      dueDate,
      priority,
      status
    });

    await task.save();

    return res.status(201).json(task);
  } catch (error) {
    console.log("Error in createTask: ", error.message);
    return res.status(500).json({ message: error.message });
  }
});


/**
 * @swagger
 * /tasks:
 *   get:
 *     summary: Get all tasks
 *     description: Retrieve a list of all tasks for the current user.
 *     responses:
 *       200:
 *         description: Successfully retrieved list of tasks
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 length:
 *                   type: integer
 *                   description: The number of tasks returned
 *                 tasks:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Task'
 *       500:
 *         description: Internal server error
 */
export const getTasks = asyncHandler(async (req, res) => {
  try {

    const tasks = await TaskModel.find({});

    res.status(200).json({
      length: tasks.length,
      tasks,
    });
  } catch (error) {
    console.log("Error in getTasks: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

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
 *           description: The task ID
 *     responses:
 *       200:
 *         description: Successfully retrieved task
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
export const getTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      res.status(400).json({ message: "Please provide a task id" });
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    res.status(200).json(task);
  } catch (error) {
    console.log("Error in getTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

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
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Task'
 *     responses:
 *       200:
 *         description: Task updated successfully
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/Task'
 *       404:
 *         description: Task not found
 *       500:
 *         description: Internal server error
 */
export const updateTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, dueDate, priority, status, completed } = req.body;

    if (!id) {
      res.status(400).json({ message: "Please provide a task id" });
    }

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    task.title = title || task.title;
    task.description = description || task.description;
    task.dueDate = dueDate || task.dueDate;
    task.priority = priority || task.priority;
    task.status = status || task.status;
    task.completed = completed || task.completed;

    await task.save();

    return res.status(200).json(task);
  } catch (error) {
    console.log("Error in updateTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

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
 *       500:
 *         description: Internal server error
 */
export const deleteTask = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;

    const task = await TaskModel.findById(id);

    if (!task) {
      res.status(404).json({ message: "Task not found!" });
    }

    await TaskModel.findByIdAndDelete(id);

    return res.status(200).json({ message: "Task deleted successfully!" });
  } catch (error) {
    console.log("Error in deleteTask: ", error.message);
    res.status(500).json({ message: error.message });
  }
});

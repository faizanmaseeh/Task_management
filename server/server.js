import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import connect from "./src/db/connect.js";
import cookieParser from "cookie-parser";
import errorHandler from "./src/helpers/errorhandler.js";
import swaggerJSDoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";
import taskRoutes from "./src/routes/tasksRoutes.js";

dotenv.config();

const port = process.env.PORT || 8000;

const app = express();

// Swagger setup
const swaggerDefinition = {
  openapi: "3.0.0",
  info: {
    title: "Task Manager API",
    version: "1.0.0",
    description: "API documentation for Task Manager",
  },
  servers: [
    {
      url: `http://localhost:${port}/api/v1`,
    },
  ],
};

const options = {
  swaggerDefinition,
  apis: ["./src/routes/*.js"], 
};

const swaggerSpec = swaggerJSDoc(options);

// Middleware
app.use(
  cors({
    origin: process.env.CLIENT_URL,
    credentials: true,
  })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());

// Swagger route for API documentation
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Error handler middleware
app.use(errorHandler);

// Routes
app.use("/api/v1", taskRoutes); 

const server = async () => {
  try {
    await connect();

    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
      console.log(`Swagger Docs available at http://localhost:${port}/api-docs`);
    });
  } catch (error) {
    console.log("Failed to start server.....", error.message);
    process.exit(1);
  }
};

server();

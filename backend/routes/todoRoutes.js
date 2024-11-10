import express from "express";
import {
  createTodo,
  deleteTodo,
  getTodoById,
  getTodos,
  updateTodo,
} from "../controllers/todoController.js";
import userAuth from "../middlewares/authMiddleware.js";
console.log("TodO Routes");

const router = express.Router();

// jobs register routes
router.post("/create-todo/", userAuth, createTodo);

// jobs view
router.get("/get-todos/", userAuth, getTodos);

// jobs view
router.patch("/update-todo/:id", userAuth, updateTodo);

// jobs view
router.delete("/delete-todo/:id", userAuth, deleteTodo);

// Person's status wise Aggrigation
router.get("/get-todo-byid/:id", userAuth, getTodoById);

export default router;

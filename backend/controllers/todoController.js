import Todo from "../models/todo.js";

export const createTodo = async (req, res, next) => {
  try {
    console.log(req.user.userId);

    const { title, description, is_complete, is_pinned } = req.body;
    const userId = req.user.userId; // Assuming the user is authenticated and userId is in req.user

    // Check if title is provided
    if (!title) {
      return next("Title is required");
    }

    // Create a new Todo instance with default values if necessary
    const newTodo = new Todo({
      userId,
      title,
      description,
      is_complete: is_complete || false, // Default to false if not provided
      is_pinned: is_pinned || false, // Default to false if not provided
      created_at: Date.now(),
      updated_at: Date.now(),
    });

    // Save the new Todo to the database
    const savedTodo = await newTodo.save();

    // Send a success response with the saved Todo
    res.status(201).json({
      message: "Todo created successfully",
      todo: savedTodo,
    });
  } catch (error) {
    // Handle unexpected errors
    res
      .status(500)
      .json({ message: "Error creating todo", error: error.message });
  }
};

// READ all Todos for a specific user
export const getTodos = async (req, res) => {
  try {
    const userId = req.user.userId;

    const todos = await Todo.find({ userId });
    res.status(200).json({
      message: "Todos fetched successfully",
      todos,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching todos", error: error.message });
  }
};

// READ a specific Todo by ID
export const getTodoById = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    const todo = await Todo.findOne({ _id: id, userId });
    if (!todo) {
      return res.status(404).json({ message: "Todo not found" });
    }

    res.status(200).json({
      message: "Todo fetched successfully",
      todo,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching todo", error: error.message });
  }
};

// UPDATE a Todo
export const updateTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;
    const { title, is_complete, is_pinned } = req.body;

    // Find the Todo by ID and check if it belongs to the current user
    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or not owned by user" });
    }

    // Update the Todo if it exists and belongs to the current user
    todo.title = title || todo.title; // Update only if provided
    todo.is_pinned = is_pinned || todo.is_pinned; // Update only if provided
    todo.completed = is_complete || todo.completed; // Update only if provided
    todo.updated_at = Date.now();

    // Save the updated Todo
    const updatedTodo = await todo.save();

    res.status(200).json({
      message: "Todo updated successfully",
      todo: updatedTodo,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating todo", error: error.message });
  }
};

// DELETE a Todo
export const deleteTodo = async (req, res) => {
  try {
    const { id } = req.params;
    const userId = req.user.userId;

    // Find the Todo by ID and check if it belongs to the current user
    const todo = await Todo.findOne({ _id: id, userId });

    if (!todo) {
      return res
        .status(404)
        .json({ message: "Todo not found or not owned by user" });
    }

    // Delete the Todo if it exists and belongs to the current user
    await Todo.findByIdAndDelete(id);

    res.status(200).json({
      message: "Todo deleted successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting todo", error: error.message });
  }
};

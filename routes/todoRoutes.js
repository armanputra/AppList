const express = require('express');
const Todo = require('../models/Todo');
const { protect } = require('../middleware/authMiddleware');
const router = express.Router();

// Get all todos
router.get('/', protect, async (req, res) => {
  const todos = await Todo.find({ user: req.user._id });
  res.json(todos);
});

// Create a new todo
router.post('/', protect, async (req, res) => {
  const { title, description, priority, deadline } = req.body;
  const todo = new Todo({
    title,
    description,
    priority,
    deadline,
    user: req.user._id
  });
  const createdTodo = await todo.save();
  res.status(201).json(createdTodo);
});

// Get a single todo
router.get('/:id', protect, async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (todo.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  res.json(todo);
});

// Update a todo
router.put('/:id', protect, async (req, res) => {
  const { title, description, priority, deadline, completed } = req.body;
  const todo = await Todo.findById(req.params.id);
  if (todo.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  todo.title = title || todo.title;
  todo.description = description || todo.description;
  todo.priority = priority || todo.priority;
  todo.deadline = deadline || todo.deadline;
  todo.completed = completed || todo.completed;
  const updatedTodo = await todo.save();
  res.json(updatedTodo);
});

// Delete a todo
router.delete('/:id', protect, async (req, res) => {
  const todo = await Todo.findById(req.params.id);
  if (todo.user.toString() !== req.user._id.toString()) {
    return res.status(401).json({ message: 'Not authorized' });
  }
  await todo.remove();
  res.json({ message: 'Todo removed' });
});

module.exports = router;

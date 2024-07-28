const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');
const todoRoutes = require('./routes/todoRoutes');
const userRoutes = require('./routes/userRoutes');

// Load environment variables from .env file
dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/todos', todoRoutes);
app.use('/users', userRoutes);

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => app.listen(PORT, () => console.log(`Server running on port ${PORT}`)))
  .catch((error) => console.log(error.message));

const mongoose = require('mongoose');

const todoSchema = mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  priority: { type: String, default: 'Medium' },
  deadline: { type: Date },
  completed: { type: Boolean, default: false },
  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
}, { timestamps: true });

module.exports = mongoose.model('Todo', todoSchema);

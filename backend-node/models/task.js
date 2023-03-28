const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  title: { type: String, required: true },
  description: { type: String },
  dueDate: { type: Date, required: true },
  priority: { type: String, enum: ['low', 'medium', 'high'], default: 'medium' },
  completed: { type: Boolean, default: false },
  assignedTo: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  sharedWith: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
  folder: {type: mongoose.Schema.Types.ObjectId, ref: "Folder"},
});

module.exports = mongoose.model('Task', taskSchema);

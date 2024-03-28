const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
    title: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true },
    status: { type: Boolean, required: true, default: false }
})

const taskModel = mongoose.model('tasks', taskSchema);

module.exports = taskModel;
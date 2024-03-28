const taskModel = require('../models/task.model');
const userModel = require('../models/user.model')
const getTaskController = async (req, res) => {
    const { userId } = req.body;
    try {
        const user = await userModel.findById(userId).populate('tasks');
        const tasks = user.tasks.map(task => {
            return {
                title: task.title,
                description: task.description,
                priority: task.priority,
                status: task.status
            }
        })
        return res.status(200).json(tasks);
    } catch (error) {
        console.log(error)
        return res.status(500).json({ message: 'Interanal server Error' })
    }
}

const createTaskController = async (req, res) => {
    const { userId, title, description, priority, status } = req.body;
    try {
        const task = new taskModel({ title, description, priority, status });
        await task.save();
        const taskId = task._id.toString();
        const user = await userModel.findById(userId);
        user.tasks.push(taskId);
        await user.save();
        return res.status(200).send('Task created successfully');
    } catch (error) {
        console.log(error);
        return res.status(500).send('Task creation failure');
    }
}

const updateTaskController = (req, res) => {
    const { title, description, priority, status } = req.body;
    console.log(title, description, priority, status);

    return res.send('update..');
}
const deleteTaskController = (req, res) => {
    // const { title, description, priority, status } = req.body;
    // console.log(title, description, priority, status);
    return res.send('delete..');
}


module.exports = { getTaskController, createTaskController, updateTaskController, deleteTaskController };
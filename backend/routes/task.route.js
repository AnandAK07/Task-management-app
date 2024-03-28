const express = require('express');
const router = express.Router();
const { getTaskController, createTaskController, updateTaskController, deleteTaskController } = require('../controllers/taskController')

router.get('/', getTaskController);
router.post('/create', createTaskController);
router.patch('/:id', updateTaskController);
router.delete('/:id', deleteTaskController);

module.exports = router;
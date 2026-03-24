const express = require('express');
const router = express.Router();
const tasksController = require('../controllers/tasksController.js');

router.get('/tasks', tasksController.getAllTasks);
router.get('/tasks/:id', tasksController.getTaskById);
router.post('/tasks', tasksController.createTask);
router.put('/tasks/:id', tasksController.updateTask);
router.delete('/tasks/:id', tasksController.deleteTask);

router.get('/tasks/priority/:level', tasksController.getTasksByPriority);


module.exports = router;
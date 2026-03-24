const tasks = require("../models/tasksModel.js");

const getAllTasks = (req, res) => {
    const { completed: isCompleted, sort } = req.query;
    
    let resultTasks = tasks;
    
    // Filter by completion status
    if (isCompleted === 'true' || isCompleted === 'false') {
        const completedStatus = isCompleted === 'true';
        resultTasks = tasks.filter(t => t.completed === completedStatus);
    }
    
    // Sort by creation date (default: ascending)
    const sortOrder = sort === 'desc' ? 'desc' : 'asc';
    const sortedTasks = [...resultTasks].sort((a, b) => {
        const dateA = new Date(a.createdAt);
        const dateB = new Date(b.createdAt);
        return sortOrder === 'asc' ? dateA - dateB : dateB - dateA;
    });
    
    res.json({
        count: sortedTasks.length,
        tasks: sortedTasks
    });
}

const getTaskById = (req, res) => {
    try {
        const id = Number(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid task ID' });
        }
        
        const task = tasks.find(t => t.id === id);
        if (task) {
            res.json(task);
        } else {
            res.status(404).json({ error: 'Task not found' });
        }
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

const createTask = (req, res) => {
    try {
        const { title, description, completed = false, priority = 'medium' } = req.body;
        
        if (!title || typeof title !== 'string' || title.trim() === '') {
            return res.status(400).json({ error: 'Title is required and must be a non-empty string' });
        }
        
        if (!description || typeof description !== 'string' || description.trim() === '') {
            return res.status(400).json({ error: 'Description is required and must be a non-empty string' });
        }
        
        if (typeof completed !== 'boolean') {
            return res.status(400).json({ error: 'Completed must be a boolean value' });
        }

        if (priority && !['low', 'medium', 'high'].includes(priority.toLowerCase())) {
            return res.status(400).json({ error: 'Priority must be one of: low, medium, high' });
        }
        
        const id = tasks.length > 0 ? Math.max(...tasks.map(t => t.id)) + 1 : 1;
        const newTask = {
            id,
            title: title.trim(),
            description: description.trim(),
            completed,
            priority: priority.toLowerCase(),
            createdAt: new Date().toISOString()
        };
        tasks.push(newTask);
        res.status(201).json(newTask);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

const updateTask = (req, res) => {
    try {
        const id = Number(req.params.id);
        
        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid task ID' });
        }
        
        const { title, description, completed, priority } = req.body;
        
        if (title !== undefined && (typeof title !== 'string' || title.trim() === '')) {
            return res.status(400).json({ error: 'Title must be a non-empty string' });
        }
        
        if (description !== undefined && (typeof description !== 'string' || description.trim() === '')) {
            return res.status(400).json({ error: 'Description must be a non-empty string' });
        }
        
        if (completed !== undefined && typeof completed !== 'boolean') {
            return res.status(400).json({ error: 'Completed must be a boolean value' });
        }

        if(priority !== undefined && !['low', 'medium', 'high'].includes(priority.toLowerCase())){
            return res.status(400).json({ error: 'Invalid priority level. Valid levels are low, medium, high.' });
        }
        
        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }
        
        tasks[taskIndex] = {
            id,
            title: title !== undefined ? title.trim() : tasks[taskIndex].title,
            description: description !== undefined ? description.trim() : tasks[taskIndex].description,
            completed: completed !== undefined ? completed : tasks[taskIndex].completed,
            priority: priority !== undefined ? priority.toLowerCase() : tasks[taskIndex].priority,
            createdAt: tasks[taskIndex].createdAt
        };
        res.status(200).json(tasks[taskIndex]);
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

const deleteTask = (req, res) => {
    try {
        const id = Number(req.params.id);

        if (isNaN(id)) {
            return res.status(400).json({ error: 'Invalid task ID' });
        }

        const taskIndex = tasks.findIndex(t => t.id === id);
        if (taskIndex === -1) {
            return res.status(404).json({ error: 'Task not found' });
        }
        tasks.splice(taskIndex, 1);
        res.status(200).json({ message: 'Task deleted successfully' });
    } catch (error) {
        res.status(500).json({ error: 'Server error' });
    }
}

const getTasksByPriority = (req,res) =>{
    const level = req.params.level.toLowerCase();
    const validLevels = ['low', 'medium', 'high'];

    if(!validLevels.includes(level)){
        return res.status(400).json({error: 'Invalid priority level. Valid levels are low, medium, high.'});
    }

    const filteredTasks = tasks.filter(t => t.priority.toLowerCase() === level);
    res.json({
        count: filteredTasks.length,
        tasks: filteredTasks
    });
}

module.exports = {
    getAllTasks, getTaskById, createTask, updateTask, deleteTask, getTasksByPriority
};
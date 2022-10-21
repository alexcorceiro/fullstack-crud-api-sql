const express = require('express');
const { getAllTasks, getTasksById, deleteTask, updateTask, createTask } = require('../controllers/tasksController');
const pool = require('../db/bd');
const router = express.Router()

router.get("/tasks", getAllTasks)

router.get('/tasks/:id', getTasksById)

router.post('/tasks', createTask)

router.delete('/tasks/:id',deleteTask)

router.put('/tasks/:id', updateTask)





module.exports = router;
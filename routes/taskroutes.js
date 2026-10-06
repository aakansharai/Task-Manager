const express = require('express');
const pool = require('../db');
const { getAllTask, createTask, updateTask, tasksByStatus, deleteTask, taskById } = require('../controllers/taskControllers');
const router = express.Router();


router.get('/tasks', getAllTask);

router.post('/tasks/create', createTask);

router.put('/tasks/:id', updateTask);

router.delete('/tasks/delete/:id', deleteTask);

router.post('/tasks/status', tasksByStatus);

router.get('/tasks/:id', taskById);


module.exports = router;
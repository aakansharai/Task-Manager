const express = require('express');
const pool = require('../db');
const { getAllTask, createTask, updateTask, tasksByStatus, deleteTask, taskById, } = require('../controllers/taskControllers');
const { getPermission } = require('../controllers/permissionController');
const { register, login } = require('../controllers/authController')
const { checkPermission } = require('../middleware/checkpermission');
const router = express.Router();



// AUTHERISATION 
router.post('/auth/register', register);

router.post('/auth/login', login);



router.get('/tasks', checkPermission("view_task"), getAllTask);

router.post('/tasks/create', checkPermission("create_task"), createTask);

router.put('/tasks/:id', checkPermission("update_task"), updateTask);

router.delete('/tasks/delete/:id', checkPermission("delete_task"), deleteTask);

router.post('/tasks/status', checkPermission("view_task"), tasksByStatus);

router.get('/tasks/:id', checkPermission("view_task"), taskById);

router.get('/get/:id/permission', checkPermission("delete_task"), getPermission);


module.exports = router;
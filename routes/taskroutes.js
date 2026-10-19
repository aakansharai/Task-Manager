const express = require('express');
const pool = require('../db');
const { getAllTask, createTask, updateTask, tasksByStatus, deleteTask, taskById } = require('../controllers/taskControllers');
const { getPermission } = require('../controllers/permissionController');
const { register, login } = require('../controllers/authController')
const { autharizationToken } = require('../middleware/validateToken')
const { checkPermission } = require('../middleware/checkpermission');
const { validateRequest } = require('../middleware/validateRequest');
const router = express.Router();



// AUTHERISATION 
router.post('/auth/register', validateRequest, register);

router.post('/auth/login', login);



router.get('/tasks', autharizationToken, checkPermission("view_task"), getAllTask);

router.post('/tasks/create', autharizationToken, checkPermission("create_task"), createTask);

router.put('/tasks/:id', autharizationToken, checkPermission("update_task"), updateTask);

router.delete('/tasks/delete/:id', autharizationToken, checkPermission("delete_task"), deleteTask);

router.post('/tasks/status', autharizationToken, checkPermission("view_task"), tasksByStatus);

router.get('/tasks/:id', autharizationToken, checkPermission("view_task"), taskById);

router.get('/get/:id/permission', autharizationToken, checkPermission("delete_task"), getPermission);


module.exports = router;
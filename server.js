const express = require('express');
const pool = require('./db');

const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};


const app = express();
const PORT = 3000;

app.use(express.json());


app.use((req, res, next) => {
    var method = req.method;
    var url = req.url;
    var data = req.body;

    console.log("Method : ", method, "\n url : ", url, "\n Data : ", data);

    next();
})

app.get('/tasks', async (req, res) => {

    const tasks = await pool.query('SELECT * FROM tasks');
    console.log("All tasks", tasks.rows);
    res.json(tasks.rows);
})

app.get('/tasks/count', asyncHandler(async (req, res) => {
    const totalTasks = await pool.query('SELECT COUNT(*) FROM tasks')
    res.json(totalTasks.rows[0]);
}))

app.post('/tasks/create', async (req, res) => {
    if (!req.body.title || !req.body.title.trim()) {
        return res.status(400).json({ "error": "Task title is required" });
    }
    const createNewTask = await pool.query('INSERT INTO tasks (title) VALUES ($1) RETURNING *', [req.body.title]);
    res.status(201).json(createNewTask.rows[0])
})

app.put('/tasks/:id', async (req, res) => {
    var id_r = req.params.id;

    const taskExists = await pool.query('SELECT * FROM tasks WHERE id = $1', [id_r]);

    if (!taskExists.rowCount) {
        return res.status(404).json({ "error": "Task not found" })
    }
    if (!req.body.status) {
        return res.status(400).json({ "error": "provide status first.." });
    }
    if (req.body.status == "pending" || req.body.status == "completed") {
        const taskById = await pool.query('UPDATE tasks SET status = $1 WHERE id = $2 RETURNING *', [req.body.status, id_r]);
        res.status(200).json(taskById.rows[0]);
    } else {
        return res.status(400).json({ "error": "the status should be either pending or completed" });
    }

})

app.delete('/tasks/delete/:id', async (req, res) => {
    var rqId = Number(req.params.id);

    console.log("DELETE id = ", rqId);
    const taskExists = await pool.query('SELECT * FROM tasks WHERE id = $1', [rqId]);
    console.log("Task exists : ", taskExists.rows[0]);

    if (!taskExists.rows[0]) {
        return res.status(404).json({ message: "Task not found!" });
    }
    const deletedTask = await pool.query('DELETE FROM tasks WHERE id = $1 RETURNING *', [rqId]);
    res.status(200).json(deletedTask.rows[0]);

})

app.post('/tasks/status', async (req, res) => {
    if (!req.body.status) {
        return res.status(400).json({ "error": "status is required" });
    } else if (req.body.status == "pending" || req.body.status == "completed") {
        const tasksByStatus = await pool.query('SELECT * FROM tasks WHERE status = $1', [req.body.status]);
        res.status(200).json(tasksByStatus.rows);
    } else {
        return res.status(400).json({ "error": "the status should be either pending or completed" });
    }
})


app.get('/tasks/:id', async (req, res) => {
    var idRequested = Number(req.params.id);
    const taskById = await pool.query('SELECT * FROM tasks WHERE id = $1', [idRequested]);
    if (taskById.rowCount) {
        res.status(200).json(taskById.rows[0]);
    } else {
        res.status(404).json({ "message": "Task not found!" });
    }
})


app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
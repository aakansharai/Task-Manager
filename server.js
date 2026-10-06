const express = require('express');
const pool = require('./db');

const taskRoutes = require('./routes/taskroutes');
const logger = require('./middleware/logger');

const asyncHandler = (fn) => {
    return (req, res, next) => {
        Promise.resolve(fn(req, res, next)).catch(next);
    };
};


const app = express();
const PORT = 3000;

app.use(express.json());
app.use(logger);
app.use(taskRoutes);


app.use((error, req, res, next) => {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" })
})

app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
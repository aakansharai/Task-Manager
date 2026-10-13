const express = require('express');
const pool = require('../db');
const { checkPermission } = require('../middleware/checkpermission');

const getPermission = async (req, res) => {
    var id = Number(req.params.id);
    var requiredPermission = req.params.permission;
    checkPermission(requiredPermission);
    console.log(id)
    const permission = await pool.query(
        `SELECT
        u.id AS user_id,
        u.name AS user_name,
        r.name AS role_name,
        p.name AS permission_name
     FROM users u
     JOIN role r ON r.id = u.role_id
     JOIN role_permission rp ON rp.role_id = r.id
     JOIN permission p ON p.id = rp.permission_id
     WHERE u.id = $1`,
        [id]
    );
    if (permission.rowCount) {
        res.status(200).json(permission.rows)
    } else {
        res.status(404).json({ "message": "No user found with this user_id!" });
    }
}

module.exports = { getPermission };
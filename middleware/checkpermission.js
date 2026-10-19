const express = require('express');
const pool = require('../db');

const checkPermission = (requiredPermission) => {
    return async (req, res, next) => {
        console.log("Under check permission");
        try {
            console.log(req.user.id);
            console.log(requiredPermission);
            const permission = await pool.query(`SELECT EXISTS(
            SELECT 1 FROM users u 
            JOIN role r ON r.id = u.role_id
            JOIN role_permission rp ON rp.role_id = r.id
            JOIN permission p ON p.id = rp.permission_id
            WHERE p.name = $1 AND u.id = $2)`, [requiredPermission, req.user.id]);

            if (!permission.rows[0].exists) {
                return res.status(403).json({ message: "Forbidden" });
            }
            next();
        } catch (error) {
            console.error(error);
            res.status(500).json({ message: 'Internal server error' });

        }

    }
}

module.exports = { checkPermission };
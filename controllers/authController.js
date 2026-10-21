const express = require('express')
const pool = require('../db')
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


const register = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const existUser = await pool.query(`SELECT * FROM users WHERE email = $1`, [email]);

        if (existUser.rows.length > 0) {
            res.status(409).json({ message: "user already exists!" });
        }
        const passwordHash = await bcrypt.hash(password, 10);
        const newUser = await pool.query(`INSERT INTO users (name, email, password_hash, role_id) VALUES ($1, $2, $3, $4) RETURNING id, name, email, role_id`, [name, email, passwordHash, 3]);

        return res.status(201).json({ message: "User created successfully!", user: newUser.rows[0] });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal server error!" });

    }

}

const login = async (req, res) => {

    try {
        const { email, password } = req.body;
        console.log("Under function");

        if (!email || !password) {
            return res.status(400).json({ message: "Email and Password is required" });
        }
        const emailExist = await pool.query(`SELECT * FROM users WHERE users.email = $1`, [email]);
        console.log("EMAILExist", emailExist.rowCount);

        if (emailExist.rowCount === 0) {
            return res.status(404).json({ message: "User is not registered with this email!" });
        }
        const user = emailExist.rows[0];
        console.log("USER WE GOT : ", user);
        // const passworkHashed = pool.query(`SELECT password_hash FROM users WHERE email = $1`, [email]);
        const isMatch = await bcrypt.compare(password, user.password_hash);

        if (!isMatch) {
            return res.status(401).json({ message: "Email or password is Invalid" });
        }
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: "1h" });

        return res.status(200).json({ message: "Login Successfull!", token: token });


    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }

}

module.exports = { register, login }
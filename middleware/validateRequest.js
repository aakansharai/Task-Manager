const { validationResult } = require('express-validator');
const { body } = require('express-validator');


const validateRequest = (req, res, next) => {
    const error = validationResult(req);

    if (!error.isEmpty()) {
        return res.status(400).json({
            message: 'Validation failed',
            errors: error.array().map(error => ({
                field: error.path,
                message: error.msg
            }))
        });
    }
    next();

}
const registerValidator = [
    body('name')
        .trim()
        .notEmpty()
        .withMessage('Name is required'),

    body('email')
        .trim()
        .notEmpty()
        .withMessage('Email is required')
        .bail()
        .isEmail()
        .withMessage('Enter a valid email'),

    body('password')
        .isLength({ min: 8 })
        .withMessage('Password must be at least 8 characters long')


];

const createATaskValidation = [
    body('title')
        .trim()
        .notEmpty()
        .withMessage('Task title is required')
];

const updateTaskValidation = [
    body('status')
        .trim()
        .notEmpty()
        .isIn(['pending', 'completed'])
        .withMessage('status should be either pending or completed')
];

const taskByStatusValidation = [
    body('status')
        .trim()
        .notEmpty()
        .isIn(['pending', 'completed'])
        .withMessage('status should be either pending or completed')
];



module.exports = { validateRequest, createATaskValidation, updateTaskValidation, taskByStatusValidation, registerValidator };
const { validationResult } = require('express-validator');

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



module.exports = { validateRequest };
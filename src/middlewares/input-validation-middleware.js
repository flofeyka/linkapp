const validationResult = require('express-validator');

const inputValidationMiddleware = (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({errors: errors.array()});
        return;
    } else {
        next();
    }
}

module.exports = inputValidationMiddleware;

module.exports = class ApiError extends Error {
    status;
    errors;

    constructor(status, message, errors = []) {
        super(message);
        this.status = status;
        this.errors = errors;
    }

    static BadRequest(message = "Bad Request") {
        return new ApiError(400, message)
    }

    static NotFound(message = "Not found") {
        return new ApiError(404, message)
    }

    static Unauthorized(message = "User is not authorized") {
        return new ApiError(401, message);
    }

}
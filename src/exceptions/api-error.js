module.exports = class ApiError extends Error {
  status;
  errors;

  constructor(status, message, errors = []) {
    super(message);
    this.status = status;
    this.errors = errors;
  }

  static unAuthorizedError() {
    return new ApiError(401, "User is not authorized");
  }

  static notFound(message) {
    return new ApiError(404, message);
  }

  static BadRequest(message, errors = []) {
    return new ApiError(400, message, errors);
  }

  static InvalidId() {
    return new ApiError(400, "Invalid id");
  }
};

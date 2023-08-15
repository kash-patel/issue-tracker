"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.errorHandler = exports.notFoundError = void 0;
const notFoundError = (req, res, next) => {
    const error = Error(`URL not found: ${req.originalUrl}.`);
    res.status(404);
    next(error);
};
exports.notFoundError = notFoundError;
const errorHandler = (error, req, res, next) => {
    let statusCode = res.statusCode === 200 ? 500 : res.statusCode;
    let message = error.message;
    res.status(statusCode);
    res.json({
        message: message,
        stack: process.env.NODE_ENV === "production" ? null : error.stack,
    });
};
exports.errorHandler = errorHandler;

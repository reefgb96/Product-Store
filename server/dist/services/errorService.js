"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleServiceError = void 0;
const handleServiceError = (error, res, next) => {
    console.error("Service error:", error);
    res.status(500).json({ error: "An internal server error occurred." });
};
exports.handleServiceError = handleServiceError;

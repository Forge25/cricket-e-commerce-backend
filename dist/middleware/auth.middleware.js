"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.authorize = exports.authenticate = void 0;
const jwt_util_1 = require("../utils/jwt.util");
/**
 * Middleware to verify JWT token
 */
const authenticate = (req, res, next) => {
    try {
        // Get token from Authorization header
        const authHeader = req.headers.authorization;
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            res.status(401).json({
                success: false,
                message: "Access denied. No token provided.",
            });
            return;
        }
        // Extract token
        const token = authHeader.substring(7); // Remove 'Bearer ' prefix
        // Verify token
        const decoded = (0, jwt_util_1.verifyToken)(token);
        // Attach user to request
        req.user = decoded;
        next();
    }
    catch (error) {
        res.status(401).json({
            success: false,
            message: error.message || "Invalid token",
        });
    }
};
exports.authenticate = authenticate;
/**
 * Middleware to authorize based on user role
 */
const authorize = (...allowedRoles) => {
    return (req, res, next) => {
        if (!req.user) {
            res.status(401).json({
                success: false,
                message: "Access denied. Not authenticated.",
            });
            return;
        }
        if (!allowedRoles.includes(req.user.role)) {
            res.status(403).json({
                success: false,
                message: "Access denied. Insufficient permissions.",
            });
            return;
        }
        next();
    };
};
exports.authorize = authorize;
//# sourceMappingURL=auth.middleware.js.map
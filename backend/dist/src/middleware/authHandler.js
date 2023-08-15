"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthHandler = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userService_1 = require("../services/userService");
const requirePermissions = (requiredPermissions, canSendToOwn = false) => {
    return (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
        const token = req.cookies.jwt;
        if (token) {
            try {
                const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
                const userId = decoded.userId;
                if (!userId)
                    throw new Error("Unauthorized: Please sign in to verify credentials.");
                const userResourcePermissions = yield userService_1.UserService.getUserResourcePermissions(userId);
                let userHasRequiredResourcePermissions = true;
                for (const resourceId of Object.keys(requiredPermissions)) {
                    if (!userResourcePermissions.hasOwnProperty(resourceId) ||
                        userResourcePermissions[parseInt(resourceId)] <
                            requiredPermissions[parseInt(resourceId)])
                        userHasRequiredResourcePermissions = false;
                }
                const sendingToOwn = canSendToOwn && userId == parseInt(req.params.id);
                if (!userHasRequiredResourcePermissions && !sendingToOwn) {
                    res.status(401);
                    throw new Error("Unauthorized: Insufficient resource permissions.");
                }
            }
            catch (error) {
                throw error;
            }
        }
        else {
            res.status(401);
            throw new Error("Unauthorized: Please sign in to verify your credentials.");
        }
        next();
    }));
};
const requireSignIn = (0, express_async_handler_1.default)((req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    const token = req.cookies.jwt;
    if (token) {
        try {
            const decoded = jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET);
            const userDetails = yield userService_1.UserService.getUserDetailsByID(decoded.userID);
            req.user = userDetails;
        }
        catch (error) {
            res.status(401);
            throw new Error("Unauthorized.");
        }
    }
    else {
        res.status(401);
        throw new Error("Unauthorized: No token.");
    }
    next();
}));
exports.AuthHandler = {
    requirePermissions,
    requireSignIn,
};

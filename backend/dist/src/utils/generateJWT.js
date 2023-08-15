"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const generateJWT = (res, userDetails) => {
    const token = jsonwebtoken_1.default.sign(userDetails, process.env.JWT_SECRET, {
        expiresIn: "30d",
    });
    res.cookie("jwt", token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production" ? true : false,
        sameSite: "strict",
        maxAge: 30 * 24 * 60 * 60 * 1000,
    });
};
exports.default = generateJWT;

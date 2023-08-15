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
exports.UserController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const userService_1 = require("../services/userService");
const generateJWT_1 = __importDefault(require("../utils/generateJWT"));
const getAllUsers = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield userService_1.UserService.getAllUsers();
    res.send(users.rows);
}));
const getUserById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify a user ID.");
    const user = yield userService_1.UserService.getUserDetailsByID(parseInt(req.params.id));
    if (user)
        res.send(user);
    else
        res.status(404).json("No such user.");
}));
const authUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password } = req.body;
    const userDetails = yield userService_1.UserService.authenticateUser(username, password);
    (0, generateJWT_1.default)(res, userDetails);
    res.status(201).json(userDetails);
}));
const logoutUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.cookie("jwt", null, {
        httpOnly: true,
        expires: new Date(0),
    });
    res.status(200).json("User logged out.");
}));
const registerUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { username, password, firstName, lastName, roleIds } = req.body;
    if (!username || !password || !firstName || !lastName)
        throw new Error("Please include a username, password, first name, and last name.");
    const newUserDetails = yield userService_1.UserService.createUser(username, password, firstName, lastName, roleIds);
    res.json(newUserDetails);
}));
const getUserRoles = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please supply a valid user ID.");
    const userRoles = yield userService_1.UserService.getUserRoles(parseInt(req.params.id));
    res.json(userRoles);
}));
const updateUserRoles = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { newUserRoles } = req.body;
    if (!newUserRoles)
        throw new Error(`Please provided an array of updated role IDs for user ${req.params.id}.`);
    const updatedRoles = yield userService_1.UserService.updateUserRoles(parseInt(req.params.id), newUserRoles);
    res.json(updatedRoles);
}));
const getUserDepartments = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please supply a valid user ID.");
    const userDepartments = yield userService_1.UserService.getUserDepartments(parseInt(req.params.id));
    res.json(userDepartments);
}));
const getUserResources = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please supply a valid user ID.");
    const userResources = yield userService_1.UserService.getUserResources(parseInt(req.params.id));
    res.json(userResources);
}));
const deleteUser = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please supply the ID of the user to delete.");
    const deleteUserResult = yield userService_1.UserService.deleteUser(parseInt(req.params.id));
    res.json(deleteUserResult);
}));
exports.UserController = {
    getAllUsers,
    getUserById,
    registerUser,
    authUser,
    logoutUser,
    deleteUser,
    getUserRoles,
    updateUserRoles,
    getUserDepartments,
    getUserResources,
};

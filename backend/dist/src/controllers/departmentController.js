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
exports.DepartmentController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const departmentService_1 = require("../services/departmentService");
const roleService_1 = require("../services/roleService");
// Read all
const getAllDepartments = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield departmentService_1.DepartmentService.getAllDepartments();
    res.json(result);
}));
const getDepartmentRoles = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the department to fetch roles of.");
    const result = yield roleService_1.RoleService.getAllRoles(req.params.id);
    res.json(result);
}));
// Read specifc
const getDepartmentById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the department to GET.");
    const result = yield departmentService_1.DepartmentService.getDepartmentById(req.params.id);
    res.json(result);
}));
// Create
const createDepartment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name)
        throw new Error("Please specify the name of the department you wish to create.");
    const result = yield departmentService_1.DepartmentService.createDepartment(req.body.name);
    res.status(201).json(result);
}));
// Update
const updateDepartment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name)
        throw new Error(`Please specify the new name of department ${req.params.id}.`);
    const result = yield departmentService_1.DepartmentService.updateDepartment(req.params.id, req.body.name);
    res.json(result);
}));
// Delete
const deleteDepartment = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the department to DELETE.");
    const result = yield departmentService_1.DepartmentService.deleteDepartment(req.params.id);
    res.json(result);
}));
exports.DepartmentController = {
    createDepartment,
    getAllDepartments,
    getDepartmentRoles,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
};

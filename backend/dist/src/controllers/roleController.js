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
exports.RoleController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const roleService_1 = require("../services/roleService");
const roleResourcePermissionService_1 = require("../services/roleResourcePermissionService");
// Read all
const getAllRoles = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield roleService_1.RoleService.getAllRoles(req.body.departmentId);
    res.json(result);
}));
// Read specifc
const getRoleById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the role to GET.");
    const result = yield roleService_1.RoleService.getRoleById(req.params.id);
    res.json(result);
}));
const getRoleResourcePermissionsById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the role to get resource permissions for.");
    const result = yield roleResourcePermissionService_1.RoleResourcePermissionService.getRoleResourcePermissionsByRoleId(parseInt(req.params.id));
    res.json(result);
}));
// Create
const createRole = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name)
        throw new Error("Please specify the name of the role you wish to create.");
    if (!req.body.departmentId)
        throw new Error("Roles must have a department ID.");
    const result = yield roleService_1.RoleService.createRole(req.body.name, req.body.departmentId, req.body.resourcePermissions);
    res.status(201).json(result);
}));
// Update
const updateRole = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.name && !req.body.resourcePermissions)
        throw new Error(`Please specify the new name or resource permissions of role ${req.params.id}.`);
    const result = yield roleService_1.RoleService.updateRole(req.params.id, req.body.name, req.body.resourcePermissions);
    res.json(result);
}));
// Delete
const deleteRole = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the role to DELETE.");
    const result = yield roleService_1.RoleService.deleteRole(req.params.id);
    res.json(result);
}));
exports.RoleController = {
    createRole,
    getAllRoles,
    getRoleById,
    getRoleResourcePermissionsById,
    updateRole,
    deleteRole,
};

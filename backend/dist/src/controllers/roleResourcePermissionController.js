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
exports.RoleResourcePermissionController = void 0;
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const roleResourcePermissionService_1 = require("../services/roleResourcePermissionService");
// Read all
const getAllRoleResourcePermissions = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield roleResourcePermissionService_1.RoleResourcePermissionService.getAllRoleResourcePermissions();
    res.json(result);
}));
// Read specifc
const getRoleResourcePermissionById = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the role resource permission to get.");
    const result = yield roleResourcePermissionService_1.RoleResourcePermissionService.getRoleResourcePermissionById(parseInt(req.params.id));
    res.json(result);
}));
// Create
const createRoleResourcePermission = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.body.roleId || !req.body.resourceId || !req.body.permissionId)
        throw new Error("Please specify the role ID, resource ID, and permission ID of the role resource permission you wish to create.");
    const result = yield roleResourcePermissionService_1.RoleResourcePermissionService.createRoleResourcePermission(req.body.roleId, req.body.resourceId, req.body.permissionId);
    res.status(201).json(result);
}));
// Update
const updateRoleResourcePermission = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id || !req.body.newPermissionId)
        throw new Error(`Please specify the ID and new permission ID of role resource permission ${req.params.id}.`);
    const result = yield roleResourcePermissionService_1.RoleResourcePermissionService.updateRoleResourcePermission(parseInt(req.params.id), parseInt(req.body.newPermissionId));
    res.json(result);
}));
// Delete
const deleteRoleResourcePermission = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    if (!req.params.id)
        throw new Error("Please specify the ID of the roleResourcePermission to DELETE.");
    const result = yield roleResourcePermissionService_1.RoleResourcePermissionService.deleteRoleResourcePermission(parseInt(req.params.id));
    res.json(result);
}));
exports.RoleResourcePermissionController = {
    createRoleResourcePermission,
    getAllRoleResourcePermissions,
    getRoleResourcePermissionById,
    updateRoleResourcePermission,
    deleteRoleResourcePermission,
};

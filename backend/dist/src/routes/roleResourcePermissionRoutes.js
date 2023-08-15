"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleResourcePermissionController_1 = require("../controllers/roleResourcePermissionController");
const authHandler_1 = require("../middleware/authHandler");
const router = express_1.default.Router();
router.get("/", authHandler_1.AuthHandler.requirePermissions({ 6: 2 }), roleResourcePermissionController_1.RoleResourcePermissionController.getAllRoleResourcePermissions);
router.get("/:id", authHandler_1.AuthHandler.requirePermissions({ 6: 2 }), roleResourcePermissionController_1.RoleResourcePermissionController.getRoleResourcePermissionById);
router.post("/", authHandler_1.AuthHandler.requirePermissions({ 6: 3 }), roleResourcePermissionController_1.RoleResourcePermissionController.createRoleResourcePermission);
router.patch("/:id", authHandler_1.AuthHandler.requirePermissions({ 6: 3 }), roleResourcePermissionController_1.RoleResourcePermissionController.updateRoleResourcePermission);
router.delete("/:id", authHandler_1.AuthHandler.requirePermissions({ 6: 3 }), roleResourcePermissionController_1.RoleResourcePermissionController.deleteRoleResourcePermission);
exports.default = router;

"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const roleController_1 = require("../controllers/roleController");
const authHandler_1 = require("../middleware/authHandler");
const router = express_1.default.Router();
router.get("/", authHandler_1.AuthHandler.requirePermissions({ 6: 2 }), roleController_1.RoleController.getAllRoles);
router.get("/:id", authHandler_1.AuthHandler.requirePermissions({ 6: 2 }), roleController_1.RoleController.getRoleById);
router.get("/:id/permissions", authHandler_1.AuthHandler.requirePermissions({ 6: 2 }), roleController_1.RoleController.getRoleResourcePermissionsById);
router.post("/", authHandler_1.AuthHandler.requirePermissions({ 6: 3 }), roleController_1.RoleController.createRole);
router.patch("/:id", authHandler_1.AuthHandler.requirePermissions({ 6: 3 }), roleController_1.RoleController.updateRole);
router.delete("/:id", authHandler_1.AuthHandler.requirePermissions({ 6: 3 }), roleController_1.RoleController.deleteRole);
exports.default = router;

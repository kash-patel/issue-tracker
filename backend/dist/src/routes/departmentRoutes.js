"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const departmentController_1 = require("../controllers/departmentController");
const authHandler_1 = require("../middleware/authHandler");
const router = express_1.default.Router();
router.get("/", authHandler_1.AuthHandler.requirePermissions({ 2: 2 }), departmentController_1.DepartmentController.getAllDepartments);
router.get("/:id", authHandler_1.AuthHandler.requirePermissions({ 2: 2 }), departmentController_1.DepartmentController.getDepartmentById);
router.get("/:id/roles", authHandler_1.AuthHandler.requirePermissions({ 2: 2, 6: 2 }), departmentController_1.DepartmentController.getDepartmentRoles);
router.post("/", authHandler_1.AuthHandler.requirePermissions({ 2: 3 }), departmentController_1.DepartmentController.createDepartment);
router.patch("/:id", authHandler_1.AuthHandler.requirePermissions({ 2: 3 }), departmentController_1.DepartmentController.updateDepartment);
router.delete("/:id", authHandler_1.AuthHandler.requirePermissions({ 2: 3 }), departmentController_1.DepartmentController.deleteDepartment);
exports.default = router;

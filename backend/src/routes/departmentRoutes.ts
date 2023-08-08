import express from "express";
import { DepartmentController } from "../controllers/departmentController";
import { AuthHandler } from "../middleware/authHandler";

const router = express.Router();

router.get(
	"/",
	AuthHandler.requirePermissions({ 2: 2 }),
	DepartmentController.getAllDepartments
);
router.get(
	"/:id",
	AuthHandler.requirePermissions({ 2: 2 }),
	DepartmentController.getDepartmentById
);
router.get(
	"/:id/roles",
	AuthHandler.requirePermissions({ 2: 2, 6: 2 }),
	DepartmentController.getDepartmentRoles
);
router.post(
	"/",
	AuthHandler.requirePermissions({ 2: 3 }),
	DepartmentController.createDepartment
);
router.patch(
	"/:id",
	AuthHandler.requirePermissions({ 2: 3 }),
	DepartmentController.updateDepartment
);
router.delete(
	"/:id",
	AuthHandler.requirePermissions({ 2: 3 }),
	DepartmentController.deleteDepartment
);

export default router;

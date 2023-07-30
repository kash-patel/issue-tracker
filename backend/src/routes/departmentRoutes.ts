import express from "express";
import { DepartmentController } from "../controllers/departmentController";
import { AuthHandler } from "../middleware/authHandler";

const router = express.Router();

router.get(
	"/",
	AuthHandler.requireResourcePermission({ 2: 2 }),
	DepartmentController.getAllDepartments
);
router.get(
	"/:id",
	AuthHandler.requireResourcePermission({ 2: 2 }),
	DepartmentController.getDepartmentById
);
router.post(
	"/",
	AuthHandler.requireResourcePermission({ 2: 3 }),
	DepartmentController.createDepartment
);
router.patch(
	"/:id",
	AuthHandler.requireResourcePermission({ 2: 3 }),
	DepartmentController.updateDepartment
);
router.delete(
	"/:id",
	AuthHandler.requireResourcePermission({ 2: 3 }),
	DepartmentController.deleteDepartment
);

export default router;

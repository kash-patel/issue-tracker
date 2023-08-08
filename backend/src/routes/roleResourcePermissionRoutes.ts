import express from "express";
import { RoleResourcePermissionController } from "../controllers/roleResourcePermissionController";
import { AuthHandler } from "../middleware/authHandler";

const router = express.Router();

router.get(
	"/",
	AuthHandler.requirePermissions({ 6: 2 }),
	RoleResourcePermissionController.getAllRoleResourcePermissions
);
router.get(
	"/:id",
	AuthHandler.requirePermissions({ 6: 2 }),
	RoleResourcePermissionController.getRoleResourcePermissionById
);
router.post(
	"/",
	AuthHandler.requirePermissions({ 6: 3 }),
	RoleResourcePermissionController.createRoleResourcePermission
);
router.patch(
	"/:id",
	AuthHandler.requirePermissions({ 6: 3 }),
	RoleResourcePermissionController.updateRoleResourcePermission
);
router.delete(
	"/:id",
	AuthHandler.requirePermissions({ 6: 3 }),
	RoleResourcePermissionController.deleteRoleResourcePermission
);

export default router;

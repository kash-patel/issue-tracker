import express from "express";
import { RoleController } from "../controllers/roleController";
import { AuthHandler } from "../middleware/authHandler";

const router = express.Router();

router.get(
	"/",
	AuthHandler.requireResourcePermission({ 6: 2 }),
	RoleController.getAllRoles
);
router.get(
	"/:id",
	AuthHandler.requireResourcePermission({ 6: 2 }),
	RoleController.getRoleById
);
router.post(
	"/",
	AuthHandler.requireResourcePermission({ 6: 3 }),
	RoleController.createRole
);
router.patch(
	"/:id",
	AuthHandler.requireResourcePermission({ 6: 3 }),
	RoleController.updateRole
);
router.delete(
	"/:id",
	AuthHandler.requireResourcePermission({ 6: 3 }),
	RoleController.deleteRole
);

export default router;

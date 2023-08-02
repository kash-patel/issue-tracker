import express from "express";
import { SystemController } from "../controllers/systemController";
import { AuthHandler } from "../middleware/authHandler";

const router = express.Router();

router.get(
	"/",
	AuthHandler.requirePermissions({ 8: 2 }),
	SystemController.getAllSystems
);
router.get(
	"/:id",
	AuthHandler.requirePermissions({ 8: 2 }),
	SystemController.getSystemById
);
router.post(
	"/",
	AuthHandler.requirePermissions({ 8: 3 }),
	SystemController.createSystem
);
router.patch(
	"/:id",
	AuthHandler.requirePermissions({ 8: 3 }),
	SystemController.updateSystem
);
router.delete(
	"/:id",
	AuthHandler.requirePermissions({ 8: 3 }),
	SystemController.deleteSystem
);

export default router;

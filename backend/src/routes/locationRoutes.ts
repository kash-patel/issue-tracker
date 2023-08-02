import express from "express";
import { LocationController } from "../controllers/locationController";
import { AuthHandler } from "../middleware/authHandler";

const router = express.Router();

router.get(
	"/",
	AuthHandler.requirePermissions({ 4: 2 }),
	LocationController.getAllLocations
);
router.get(
	"/:id",
	AuthHandler.requirePermissions({ 4: 2 }),
	LocationController.getLocationById
);
router.post(
	"/",
	AuthHandler.requirePermissions({ 4: 3 }),
	LocationController.createLocation
);
router.patch(
	"/:id",
	AuthHandler.requirePermissions({ 4: 3 }),
	LocationController.updateLocation
);
router.delete(
	"/:id",
	AuthHandler.requirePermissions({ 4: 3 }),
	LocationController.deleteLocation
);

export default router;

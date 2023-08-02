import express from "express";
import { VehicleController } from "../controllers/vehicleController";
import { AuthHandler } from "../middleware/authHandler";

const router = express.Router();

router.get(
	"/",
	AuthHandler.requirePermissions({ 10: 2 }),
	VehicleController.getAllVehicles
);
router.get(
	"/:id",
	AuthHandler.requirePermissions({ 10: 2 }),
	VehicleController.getVehicleById
);
router.post(
	"/",
	AuthHandler.requirePermissions({ 10: 3 }),
	VehicleController.createVehicle
);
router.delete(
	"/:id",
	AuthHandler.requirePermissions({ 10: 3 }),
	VehicleController.deleteVehicle
);

export default router;

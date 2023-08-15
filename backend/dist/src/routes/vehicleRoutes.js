"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const vehicleController_1 = require("../controllers/vehicleController");
const authHandler_1 = require("../middleware/authHandler");
const router = express_1.default.Router();
router.get("/", authHandler_1.AuthHandler.requirePermissions({ 10: 2 }), vehicleController_1.VehicleController.getAllVehicles);
router.get("/:id", authHandler_1.AuthHandler.requirePermissions({ 10: 2 }), vehicleController_1.VehicleController.getVehicleById);
router.post("/", authHandler_1.AuthHandler.requirePermissions({ 10: 3 }), vehicleController_1.VehicleController.createVehicle);
router.delete("/:id", authHandler_1.AuthHandler.requirePermissions({ 10: 3 }), vehicleController_1.VehicleController.deleteVehicle);
exports.default = router;

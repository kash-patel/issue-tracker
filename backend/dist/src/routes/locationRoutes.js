"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const locationController_1 = require("../controllers/locationController");
const authHandler_1 = require("../middleware/authHandler");
const router = express_1.default.Router();
router.get("/", authHandler_1.AuthHandler.requirePermissions({ 4: 2 }), locationController_1.LocationController.getAllLocations);
router.get("/:id", authHandler_1.AuthHandler.requirePermissions({ 4: 2 }), locationController_1.LocationController.getLocationById);
router.post("/", authHandler_1.AuthHandler.requirePermissions({ 4: 3 }), locationController_1.LocationController.createLocation);
router.patch("/:id", authHandler_1.AuthHandler.requirePermissions({ 4: 3 }), locationController_1.LocationController.updateLocation);
router.delete("/:id", authHandler_1.AuthHandler.requirePermissions({ 4: 3 }), locationController_1.LocationController.deleteLocation);
exports.default = router;

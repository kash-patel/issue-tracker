"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const systemController_1 = require("../controllers/systemController");
const authHandler_1 = require("../middleware/authHandler");
const router = express_1.default.Router();
router.get("/", authHandler_1.AuthHandler.requirePermissions({ 8: 2 }), systemController_1.SystemController.getAllSystems);
router.get("/:id", authHandler_1.AuthHandler.requirePermissions({ 8: 2 }), systemController_1.SystemController.getSystemById);
router.post("/", authHandler_1.AuthHandler.requirePermissions({ 8: 3 }), systemController_1.SystemController.createSystem);
router.patch("/:id", authHandler_1.AuthHandler.requirePermissions({ 8: 3 }), systemController_1.SystemController.updateSystem);
router.delete("/:id", authHandler_1.AuthHandler.requirePermissions({ 8: 3 }), systemController_1.SystemController.deleteSystem);
exports.default = router;

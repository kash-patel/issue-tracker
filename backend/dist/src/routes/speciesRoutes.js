"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const speciesController_1 = require("../controllers/speciesController");
const authHandler_1 = require("../middleware/authHandler");
const router = express_1.default.Router();
router.get("/", authHandler_1.AuthHandler.requirePermissions({ 7: 2 }), speciesController_1.SpeciesController.getAllSpecies);
router.get("/:id", authHandler_1.AuthHandler.requirePermissions({ 7: 2 }), speciesController_1.SpeciesController.getSpeciesById);
router.get("/:id/individuals", authHandler_1.AuthHandler.requirePermissions({ 7: 2, 1: 2 }), speciesController_1.SpeciesController.getSpeciesIndividuals);
router.post("/", authHandler_1.AuthHandler.requirePermissions({ 7: 3 }), speciesController_1.SpeciesController.createSpecies);
router.delete("/:id", authHandler_1.AuthHandler.requirePermissions({ 7: 3 }), speciesController_1.SpeciesController.deleteSpecies);
exports.default = router;

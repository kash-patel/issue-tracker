"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const animalController_1 = require("../controllers/animalController");
const authHandler_1 = require("../middleware/authHandler");
const router = express_1.default.Router();
router.get("/", authHandler_1.AuthHandler.requirePermissions({ 1: 2 }), animalController_1.AnimalController.getAllAnimals);
router.get("/:id", authHandler_1.AuthHandler.requirePermissions({ 1: 2 }), animalController_1.AnimalController.getAnimalById);
router.post("/", authHandler_1.AuthHandler.requirePermissions({ 1: 3 }), animalController_1.AnimalController.createAnimal);
router.patch("/:id", authHandler_1.AuthHandler.requirePermissions({ 1: 3 }), animalController_1.AnimalController.updateAnimal);
router.delete("/:id", authHandler_1.AuthHandler.requirePermissions({ 1: 3 }), animalController_1.AnimalController.deleteAnimal);
exports.default = router;

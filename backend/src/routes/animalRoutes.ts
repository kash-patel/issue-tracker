import express from "express";
import { AnimalController } from "../controllers/animalController";
import { AuthHandler } from "../middleware/authHandler";

const router = express.Router();

router.get(
	"/",
	AuthHandler.requirePermissions({ 1: 2 }),
	AnimalController.getAllAnimals
);
router.get(
	"/:id",
	AuthHandler.requirePermissions({ 1: 2 }),
	AnimalController.getAnimalById
);
router.post(
	"/",
	AuthHandler.requirePermissions({ 1: 3 }),
	AnimalController.createAnimal
);
router.patch(
	"/:id",
	AuthHandler.requirePermissions({ 1: 3 }),
	AnimalController.updateAnimal
);
router.delete(
	"/:id",
	AuthHandler.requirePermissions({ 1: 3 }),
	AnimalController.deleteAnimal
);

export default router;

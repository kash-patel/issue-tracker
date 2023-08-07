import express from "express";
import { SpeciesController } from "../controllers/speciesController";
import { AuthHandler } from "../middleware/authHandler";

const router = express.Router();

router.get(
	"/",
	AuthHandler.requirePermissions({ 7: 2 }),
	SpeciesController.getAllSpecies
);
router.get(
	"/:id",
	AuthHandler.requirePermissions({ 7: 2 }),
	SpeciesController.getSpeciesById
);
router.get(
	"/:id/individuals",
	AuthHandler.requirePermissions({ 7: 2, 1: 2 }),
	SpeciesController.getSpeciesIndividuals
);
router.post(
	"/",
	AuthHandler.requirePermissions({ 7: 3 }),
	SpeciesController.createSpecies
);
router.delete(
	"/:id",
	AuthHandler.requirePermissions({ 7: 3 }),
	SpeciesController.deleteSpecies
);

export default router;

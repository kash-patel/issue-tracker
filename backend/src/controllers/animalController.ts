import asyncHandler from "express-async-handler";
import { AnimalService } from "../services/animalService";

// Read all
const getAllAnimals = asyncHandler(async (req, res) => {
	const result = await AnimalService.getAllAnimals(req.body.speciesId);
	res.json(result);
});

// Read specifc
const getAnimalById = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the animal to GET.");
	const result = await AnimalService.getAnimalById(parseInt(req.params.id));
	res.json(result);
});

// Create
const createAnimal = asyncHandler(async (req, res) => {
	if (!req.body.name)
		throw new Error(
			"Please specify the name of the animal you wish to create."
		);

	if (!req.body.speciesId) throw new Error("Animals must have a species ID.");

	const result = await AnimalService.createAnimal(
		req.body.name,
		req.body.speciesId
	);

	res.status(201).json(result);
});

// Update
const updateAnimal = asyncHandler(async (req, res) => {
	if (!req.body.name)
		throw new Error(`Please specify the new name of animal ${req.params.id}.`);
	const result = await AnimalService.updateAnimal(
		parseInt(req.params.id),
		req.body.name
	);
	res.json(result);
});

// Delete
const deleteAnimal = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the animal to DELETE.");
	const result = await AnimalService.deleteAnimal(parseInt(req.params.id));
	res.json(result);
});

export const AnimalController = {
	createAnimal,
	getAllAnimals,
	getAnimalById,
	updateAnimal,
	deleteAnimal,
};

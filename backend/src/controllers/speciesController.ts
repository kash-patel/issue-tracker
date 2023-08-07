import asyncHandler from "express-async-handler";
import { SpeciesService } from "../services/speciesService";
import { AnimalService } from "../services/animalService";

// Read all
const getAllSpecies = asyncHandler(async (req, res) => {
	const result = await SpeciesService.getAllSpecies();
	res.json(result);
});

// Read specifc
const getSpeciesById = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the species to GET.");
	const result = await SpeciesService.getSpeciesById(req.params.id);
	res.json(result);
});

const getSpeciesIndividuals = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the species to list members of.");
	const result = await AnimalService.getAllAnimals(req.body.speciesId);
	res.json(result);
});

// Create
const createSpecies = asyncHandler(async (req, res) => {
	if (!req.body.genus || !req.body.species)
		throw new Error(
			"Please specify the genus and species names of the species you wish to create."
		);
	const result = await SpeciesService.createSpecies(
		req.body.genus,
		req.body.species
	);
	res.status(201).json(result);
});

// Delete
const deleteSpecies = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the species to DELETE.");
	const result = await SpeciesService.deleteSpecies(req.params.id);
	res.json(result);
});

export const SpeciesController = {
	createSpecies,
	getAllSpecies,
	getSpeciesIndividuals,
	getSpeciesById,
	deleteSpecies,
};

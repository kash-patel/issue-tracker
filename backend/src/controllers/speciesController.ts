import asyncHandler from "express-async-handler";
import { SpeciesService } from "../services/speciesService";

// Read all
const getAllSpecies = asyncHandler(async (req, res) => {
	const result = await SpeciesService.getAllSpecies();
	res.send(result);
});

// Read specifc
const getSpeciesById = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the species to GET.");
	const result = await SpeciesService.getSpeciesById(req.params.id);
	res.send(result);
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
	res.status(201).send(result);
});

// Delete
const deleteSpecies = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the species to DELETE.");
	const result = await SpeciesService.deleteSpecies(req.params.id);
	res.send(result);
});

export const SpeciesController = {
	createSpecies,
	getAllSpecies,
	getSpeciesById,
	deleteSpecies,
};

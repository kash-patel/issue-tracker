import asyncHandler from "express-async-handler";
import { SystemService } from "../services/systemService";

// Read all
const getAllSystems = asyncHandler(async (req, res) => {
	const result = await SystemService.getAllSystems(req.body.locationId);
	res.send(result);
});

// Read specifc
const getSystemById = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the system to GET.");
	const result = await SystemService.getSystemById(req.params.id);
	res.send(result);
});

// Create
const createSystem = asyncHandler(async (req, res) => {
	if (!req.body.name)
		throw new Error(
			"Please specify the name of the system you wish to create."
		);

	if (!req.body.locationId) throw new Error("Systems must have a location ID.");

	const result = await SystemService.createSystem(
		req.body.name,
		req.body.locationId
	);

	res.status(201).send(result);
});

// Update
const updateSystem = asyncHandler(async (req, res) => {
	if (!req.body.name)
		throw new Error(`Please specify the new name of system ${req.params.id}.`);
	const result = await SystemService.updateSystem(req.params.id, req.body.name);
	res.send(result);
});

// Delete
const deleteSystem = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the system to DELETE.");
	const result = await SystemService.deleteSystem(req.params.id);
	res.send(result);
});

export const SystemController = {
	createSystem,
	getAllSystems,
	getSystemById,
	updateSystem,
	deleteSystem,
};

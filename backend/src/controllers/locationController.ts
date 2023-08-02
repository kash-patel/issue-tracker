import asyncHandler from "express-async-handler";
import { LocationService } from "../services/locationService";

// Read all
const getAllLocations = asyncHandler(async (req, res) => {
	const result = await LocationService.getAllLocations();
	res.send(result);
});

// Read specifc
const getLocationById = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the location to GET.");
	const result = await LocationService.getLocationById(req.params.id);
	res.send(result);
});

// Create
const createLocation = asyncHandler(async (req, res) => {
	if (!req.body.name)
		throw new Error(
			"Please specify the name of the location you wish to create."
		);
	const result = await LocationService.createLocation(req.body.name);
	res.status(201).send(result);
});

// Update
const updateLocation = asyncHandler(async (req, res) => {
	if (!req.body.name)
		throw new Error(
			`Please specify the new name of location ${req.params.id}.`
		);
	const result = await LocationService.updateLocation(
		req.params.id,
		req.body.name
	);
	res.send(result);
});

// Delete
const deleteLocation = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the location to DELETE.");
	const result = await LocationService.deleteLocation(req.params.id);
	res.send(result);
});

export const LocationController = {
	createLocation,
	getAllLocations,
	getLocationById,
	updateLocation,
	deleteLocation,
};

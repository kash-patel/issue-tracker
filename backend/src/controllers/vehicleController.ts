import asyncHandler from "express-async-handler";
import { VehicleService } from "../services/vehicleService";

// Read all
const getAllVehicles = asyncHandler(async (req, res) => {
	const { make, model, licensePlate } = req.body;
	const result = await VehicleService.getAllVehicles({
		make: make,
		model: model,
		licensePlate: licensePlate,
	});
	res.send(result);
});

// Read specifc
const getVehicleById = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the vehicle to GET.");
	const result = await VehicleService.getVehicleById(req.params.id);
	res.send(result);
});

// Create
const createVehicle = asyncHandler(async (req, res) => {
	if (!req.body.make || !req.body.model || !req.body.licensePlate)
		throw new Error(
			"Please specify the make, model, and license plate of the vehicle you would like to add."
		);
	const result = await VehicleService.createVehicle(
		req.body.make,
		req.body.model,
		req.body.licensePlate
	);
	res.status(201).send(result);
});

// Delete
const deleteVehicle = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the vehicle to DELETE.");
	const result = await VehicleService.deleteVehicle(req.params.id);
	res.send(result);
});

export const VehicleController = {
	createVehicle,
	getAllVehicles,
	getVehicleById,
	deleteVehicle,
};

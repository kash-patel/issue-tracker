import asyncHandler from "express-async-handler";
import { DepartmentService } from "../services/departmentService";

// Read all
const getAllDepartments = asyncHandler(async (req, res) => {
	const result = await DepartmentService.getAllDepartments();
	res.send(result);
});

// Read specifc
const getDepartmentById = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the department to GET.");
	const result = await DepartmentService.getDepartmentById(req.params.id);
	res.send(result);
});

// Create
const createDepartment = asyncHandler(async (req, res) => {
	if (!req.body.name)
		throw new Error(
			"Please specify the name of the department you wish to create."
		);
	const result = await DepartmentService.createDepartment(req.body.name);
	res.status(201).send(result);
});

// Update
const updateDepartment = asyncHandler(async (req, res) => {
	if (!req.body.name)
		throw new Error(
			`Please specify the new name of department ${req.params.id}.`
		);
	const result = await DepartmentService.updateDepartment(
		req.params.id,
		req.body.name
	);
	res.send(result);
});

// Delete
const deleteDepartment = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the department to DELETE.");
	const result = await DepartmentService.deleteDepartment(req.params.id);
	res.send(result);
});

export const DepartmentController = {
	createDepartment,
	getAllDepartments,
	getDepartmentById,
	updateDepartment,
	deleteDepartment,
};

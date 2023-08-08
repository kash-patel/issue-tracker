import asyncHandler from "express-async-handler";
import { DepartmentService } from "../services/departmentService";
import { RoleService } from "../services/roleService";

// Read all
const getAllDepartments = asyncHandler(async (req, res) => {
	const result = await DepartmentService.getAllDepartments();
	res.json(result);
});

const getDepartmentRoles = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error(
			"Please specify the ID of the department to fetch roles of."
		);
	const result = await RoleService.getAllRoles(req.params.id);
	res.json(result);
});

// Read specifc
const getDepartmentById = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the department to GET.");
	const result = await DepartmentService.getDepartmentById(req.params.id);
	res.json(result);
});

// Create
const createDepartment = asyncHandler(async (req, res) => {
	if (!req.body.name)
		throw new Error(
			"Please specify the name of the department you wish to create."
		);
	const result = await DepartmentService.createDepartment(req.body.name);
	res.status(201).json(result);
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
	res.json(result);
});

// Delete
const deleteDepartment = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the department to DELETE.");
	const result = await DepartmentService.deleteDepartment(req.params.id);
	res.json(result);
});

export const DepartmentController = {
	createDepartment,
	getAllDepartments,
	getDepartmentRoles,
	getDepartmentById,
	updateDepartment,
	deleteDepartment,
};

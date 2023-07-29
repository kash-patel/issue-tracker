import asyncHandler from "express-async-handler";
import { RoleService } from "../services/roleService";

// Read all
const getAllRoles = asyncHandler(async (req, res) => {
	const result = await RoleService.getAllRoles(req.body.departmentId);
	res.send(result);
});

// Read specifc
const getRoleById = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the role to GET.");
	const result = await RoleService.getRoleById(req.params.id);
	res.send(result);
});

// Create
const createRole = asyncHandler(async (req, res) => {
	if (!req.body.name)
		throw new Error("Please specify the name of the role you wish to create.");
	if (!req.body.departmentId)
		throw new Error("Roles must have a department ID.");

	const result = await RoleService.createRole(
		req.body.name,
		req.body.departmentId,
		req.body.resourcePermissions
	);

	res.status(201).send(result);
});

// Update
const updateRole = asyncHandler(async (req, res) => {
	if (!req.body.name && !req.body.resourcePermissions)
		throw new Error(
			`Please specify the new name or resource permissions of role ${req.params.id}.`
		);
	const result = await RoleService.updateRole(
		req.params.id,
		req.body.name,
		req.body.resourcePermissions
	);
	res.send(result);
});

// Delete
const deleteRole = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please specify the ID of the role to DELETE.");
	const result = await RoleService.deleteRole(req.params.id);
	res.send(result);
});

export const RoleController = {
	createRole,
	getAllRoles,
	getRoleById,
	updateRole,
	deleteRole,
};

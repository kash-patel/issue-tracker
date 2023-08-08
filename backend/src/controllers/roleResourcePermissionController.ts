import asyncHandler from "express-async-handler";
import { RoleResourcePermissionService } from "../services/roleResourcePermissionService";

// Read all
const getAllRoleResourcePermissions = asyncHandler(async (req, res) => {
	const result =
		await RoleResourcePermissionService.getAllRoleResourcePermissions();
	res.json(result);
});

// Read specifc
const getRoleResourcePermissionById = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error(
			"Please specify the ID of the roleResourcePermission to GET."
		);
	const result =
		await RoleResourcePermissionService.getRoleResourcePermissionById(
			parseInt(req.params.id)
		);
	res.json(result);
});

// Create
const createRoleResourcePermission = asyncHandler(async (req, res) => {
	if (!req.body.roleId || !req.body.resourceId || !req.body.permissionId)
		throw new Error(
			"Please specify the role ID, resource ID, and permission ID of the role resource permission you wish to create."
		);
	const result =
		await RoleResourcePermissionService.createRoleResourcePermission(
			req.body.roleId,
			req.body.resourceId,
			req.body.permissionId
		);
	res.status(201).json(result);
});

// Update
const updateRoleResourcePermission = asyncHandler(async (req, res) => {
	if (!req.params.id || !req.body.newPermissionId)
		throw new Error(
			`Please specify the ID and new permission ID of role resource permission ${req.params.id}.`
		);
	const result =
		await RoleResourcePermissionService.updateRoleResourcePermission(
			parseInt(req.params.id),
			parseInt(req.body.newPermissionId)
		);
	res.json(result);
});

// Delete
const deleteRoleResourcePermission = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error(
			"Please specify the ID of the roleResourcePermission to DELETE."
		);
	const result =
		await RoleResourcePermissionService.deleteRoleResourcePermission(
			parseInt(req.params.id)
		);
	res.json(result);
});

export const RoleResourcePermissionController = {
	createRoleResourcePermission,
	getAllRoleResourcePermissions,
	getRoleResourcePermissionById,
	updateRoleResourcePermission,
	deleteRoleResourcePermission,
};

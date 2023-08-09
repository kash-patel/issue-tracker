import { db } from "../config/db";

const getAllRoleResourcePermissions = async () => {
	try {
		const result = await db.query("SELECT * FROM role_resource_permissions;");
		return transformRows(result.rows);
	} catch (error) {
		throw error;
	}
};

const getRoleResourcePermissionsByRoleId = async (roleId: number) => {
	try {
		const result = await db.query(
			"SELECT * FROM role_resource_permissions WHERE role_id = $1;",
			[roleId]
		);
		return transformRows(result.rows);
	} catch (error) {
		throw error;
	}
};

const getRoleResourcePermissionById = async (id: number) => {
	try {
		const result = await db.query(
			"SELECT * FROM role_resource_permissions WHERE id = $1;",
			[id]
		);
		return transformRows(result.rows);
	} catch (error) {
		throw error;
	}
};

const createRoleResourcePermission = async (
	roleId: number,
	resourceId: number,
	permissionId: number
) => {
	try {
		await db.query(
			"INSERT INTO role_resource_permissions VALUES (DEFAULT, $1, $2, $3);",
			[roleId, resourceId, permissionId]
		);
		const newRoleResourcePermissionQueryResult = await db.query(
			"SELECT * FROM role_resource_permissions WHERE role_id = $1 AND resource_id = $2 AND permission_id = $3;",
			[roleId, resourceId, permissionId]
		);
		return transformRows(newRoleResourcePermissionQueryResult.rows);
	} catch (error) {
		throw error;
	}
};

const updateRoleResourcePermission = async (
	id: number,
	newPermissionId: number
) => {
	try {
		await db.query(
			"UPDATE role_resource_permissions SET permission_id = $1 WHERE id = $2;",
			[newPermissionId, id]
		);
		const updatedRoleResourcePermissionQueryResult = await db.query(
			"SELECT * FROM role_resource_permissions WHERE id = $1;",
			[id]
		);
		return transformRows(updatedRoleResourcePermissionQueryResult.rows);
	} catch (error) {
		throw error;
	}
};

const deleteRoleResourcePermission = async (id: number) => {
	try {
		await db.query("DELETE FROM role_resource_permissions WHERE id = $1;", [
			id,
		]);
		return `Delete role resource permission ${id}.`;
	} catch (error) {
		throw error;
	}
};

function transformRows(rows: Array<any>): {
	[roleResourcePermissionId: number]: {
		roleId: number;
		resourceId: number;
		permissionId: number;
	};
} {
	const roleResourcePermissions: {
		[roleResourcePermissionId: number]: {
			roleId: number;
			resourceId: number;
			permissionId: number;
		};
	} = {};

	rows.forEach((row) => {
		roleResourcePermissions[row.id] = {
			roleId: row.role_id,
			resourceId: row.resource_id,
			permissionId: row.permission_id,
		};
	});

	return roleResourcePermissions;
}

export const RoleResourcePermissionService = {
	getAllRoleResourcePermissions,
	getRoleResourcePermissionById,
	getRoleResourcePermissionsByRoleId,
	createRoleResourcePermission,
	updateRoleResourcePermission,
	deleteRoleResourcePermission,
};

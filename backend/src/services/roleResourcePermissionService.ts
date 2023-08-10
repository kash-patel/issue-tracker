import { db } from "../config/db";

const getAllRoleResourcePermissions = async () => {
	try {
		const result = await db.query(getAllRoleResourcePermissionsQuery);
		return transformRows(result.rows);
	} catch (error) {
		throw error;
	}
};

const getRoleResourcePermissionsByRoleId = async (roleId: number) => {
	try {
		const result = await db.query(getRoleResourcePermissionsByRoleIdQuery, [
			roleId,
		]);
		return transformRows(result.rows);
	} catch (error) {
		throw error;
	}
};

const getRoleResourcePermissionById = async (id: number) => {
	try {
		const result = await db.query(getRoleResourcePermissionByIdQuery, [id]);
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
			getRoleResourcePermissionByRoleIdAndResourceIdQuery,
			[roleId, resourceId]
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
			getRoleResourcePermissionByIdQuery,
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
	[roleId: number]: {
		[resourceId: number]: {
			resourceName: string;
			permissionId: number;
		};
	};
} {
	const roleResourcePermissions: {
		[roleId: number]: {
			[resourceId: number]: {
				resourceName: string;
				permissionId: number;
			};
		};
	} = {};

	rows.forEach((row) => {
		if (row.role_id != null) {
			if (!roleResourcePermissions[row.role_id])
				roleResourcePermissions[row.role_id] = {};

			if (!roleResourcePermissions[row.role_id][row.resource_id])
				roleResourcePermissions[row.role_id][row.resource_id] = {
					resourceName: row.resource_name,
					permissionId: row.permission_id,
				};
		}
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

const getAllRoleResourcePermissionsQuery = `
SELECT
role_resource_permissions.role_id role_id,
resources.id resource_id,
resources.name resource_name,
permissions.id permission_id
FROM
role_resource_permissions
LEFT JOIN resources ON role_resource_permissions.resource_id = resources.id
LEFT JOIN permissions ON role_resource_permissions.permission_id = permissions.id
;`;

const getRoleResourcePermissionsByRoleIdQuery = `
SELECT
role_resource_permissions.role_id role_id,
resources.id resource_id,
resources.name resource_name,
permissions.id permission_id
FROM
role_resource_permissions
LEFT JOIN resources ON role_resource_permissions.resource_id = resources.id
LEFT JOIN permissions ON role_resource_permissions.permission_id = permissions.id
WHERE
role_resource_permissions.role_id = $1
;`;

const getRoleResourcePermissionByIdQuery = `
SELECT
role_resource_permissions.role_id role_id,
resources.id resource_id,
resources.name resource_name,
permissions.id permission_id
FROM
role_resource_permissions
LEFT JOIN resources ON role_resource_permissions.resource_id = resources.id
LEFT JOIN permissions ON role_resource_permissions.permission_id = permissions.id
WHERE
role_resource_permissions.id = $1
;`;

const getRoleResourcePermissionByRoleIdAndResourceIdQuery = `
SELECT
role_resource_permissions.role_id role_id,
resources.id resource_id,
resources.name resource_name,
permissions.id permission_id
FROM
role_resource_permissions
LEFT JOIN resources ON role_resource_permissions.resource_id = resources.id
LEFT JOIN permissions ON role_resource_permissions.permission_id = permissions.id
WHERE
role_resource_permissions.role_id = $1
AND
role_resource_permissions.resource_id = $2
;`;

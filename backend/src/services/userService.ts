import { db } from "../config/db";
import bcrypt from "bcryptjs";
import { UserDetails } from "../types";

const getAllUsers = async () => {
	try {
		const users = await db.query("SELECT * FROM users;");
		return users;
	} catch (error) {
		throw error;
	}
};

const getUserDetailsByID = async (id: number) => {
	try {
		if (await userExists(id, undefined)) {
			const result = await db.query(userDetailsQueryById, [id]);
			const user: UserDetails = extractUserDetails(result.rows);
			return user;
		} else throw new Error("No such user.");
	} catch (error) {
		throw error;
	}
};

const authenticateUser = async (username: string, password: string) => {
	try {
		const result = await db.query("SELECT * FROM users WHERE username = $1", [
			username,
		]);

		if (
			result.rowCount > 0 &&
			(await bcrypt.compare(password, result.rows[0].password_hashed))
		) {
			const result = await db.query(userDetailsQueryByUsername, [username]);
			return extractUserDetails(result.rows);
		} else throw new Error("Invalid credentials.");
	} catch (error) {
		throw error;
	}
};

const getUserRoles = async (id: number) => {
	try {
		const doesUserExist: boolean = await userExists(id);
		if (!doesUserExist) return {};
		const result = await db.query(userRolesQueryById, [id]);
		return extractUserRoles(result.rows);
	} catch (error) {
		throw error;
	}
};

const updateUserRoles = async (id: number, newUserRoles: Array<number>) => {
	try {
		const existingRolesResult = await db.query(
			"SELECT role_id FROM user_roles WHERE user_id = $1;",
			[id]
		);
		const existingRoles: Array<number> = existingRolesResult.rows.map(
			(row) => row.role_id
		);

		newUserRoles.forEach(async (newRoleId) => {
			if (!existingRoles.includes(newRoleId))
				await db.query("INSERT INTO user_roles VALUES (DEFAULT, $1, $2);", [
					id,
					newRoleId,
				]);
		});
		existingRoles.forEach(async (existingRoleId) => {
			if (!newUserRoles.includes(existingRoleId))
				await db.query(
					"DELETE FROM user_roles WHERE user_id = $1 AND role_id = $2;",
					[id, existingRoleId]
				);
		});

		const updatedUserRoles: {
			[departmentId: number]: {
				departmentName: string;
				[roleId: number]: string;
			};
		} = await getUserRoles(id);

		return updatedUserRoles;
	} catch (error) {
		throw error;
	}
};

const getUserDepartments = async (id: number) => {
	try {
		const doesUserExist: boolean = await userExists(id);
		if (!doesUserExist) return {};
		const result = await db.query(userDepartmentsQueryById, [id]);
		return extractUserDepartments(result.rows);
	} catch (error) {
		throw error;
	}
};

const getUserResources = async (id: number) => {
	try {
		const doesUserExist: boolean = await userExists(id);
		if (!doesUserExist) return {};
		const result = await db.query(userResourcesQueryById, [id]);
		return extractUniqueUserResources(result.rows);
	} catch (error) {
		throw error;
	}
};

const getUserResourcePermissions = async (id: number) => {
	try {
		const doesUserExist: boolean = await userExists(id);
		if (!doesUserExist) return {};
		const result = await db.query(userResourcePermissionsQueryById, [id]);
		return extractHighestResourcePermissions(result.rows);
	} catch (error) {
		throw error;
	}
};

const createUser = async (
	username: string,
	password: string,
	firstName: string,
	lastName: string,
	roleIds: Array<number>
) => {
	try {
		if (await userExists(undefined, username))
			throw new Error("Username unavailable.");

		const salt = await bcrypt.genSalt(10);
		const password_hashed = await bcrypt.hash(password, salt);

		await db.query("INSERT INTO users VALUES (DEFAULT, $1, $2, $3, $4);", [
			username,
			password_hashed,
			firstName,
			lastName,
		]);

		const result = await db.query(userDetailsQueryByUsername, [username]);
		const userDetails: UserDetails = extractUserDetails(result.rows);

		// Post user roles if they exist
		if (roleIds.length <= 0) return userDetails;

		roleIds.forEach(async (roleId) => {
			await db.query("INSERT INTO user_roles VALUES (DEFAULT, $1, $2);", [
				userDetails.userId,
				roleId,
			]);
		});

		return userDetails;
	} catch (error) {
		throw error;
	}
};

const deleteUser = async (id: number) => {
	try {
		const result = await db.query("DELETE FROM users WHERE id = $1;", [id]);
		return `Deleted user ${id}.`;
	} catch (error) {
		throw error;
	}
};

const userExists = async (id?: number, username?: string) => {
	try {
		const query = `SELECT * FROM users WHERE ${id ? "id" : "username"} = $1;`;
		const result = await db.query(query, [id ? id : username]);
		return result.rowCount > 0;
	} catch (error) {
		throw error;
	}
};

function extractUserDetails(rows: Array<any>): UserDetails {
	try {
		const userDetails: UserDetails = {
			userId: 0,
			username: "",
			firstName: "",
			lastName: "",
		};

		if (rows.length <= 0) return userDetails;

		userDetails.userId = rows[0].uid;
		userDetails.username = rows[0].uname;
		userDetails.firstName = rows[0].fname;
		userDetails.lastName = rows[0].lname;

		return userDetails;
	} catch (error) {
		throw error;
	}
}

function extractUserRoles(rows: Array<any>): {
	[departmentId: number]: {
		departmentName: string;
		[roleId: number]: string;
	};
} {
	try {
		if (rows.length <= 0) return {};

		const userRoles: {
			[departmentId: number]: {
				departmentName: string;
				[roleId: number]: string;
			};
		} = {};

		rows.forEach((row) => {
			if (row.rid) {
				if (!userRoles[row.did])
					userRoles[row.did] = { departmentName: row.dname };
				userRoles[row.did][row.rid] = row.rname;
			}
		});

		return userRoles;
	} catch (error) {
		throw error;
	}
}

function extractUserDepartments(rows: Array<any>): {
	[departmentId: number]: string;
} {
	try {
		if (rows.length <= 0) return {};

		const userDepartments: {
			[departmentId: number]: string;
		} = {};

		rows.forEach((row) => {
			if (row.did) userDepartments[row.did] = row.dname;
		});

		return userDepartments;
	} catch (error) {
		throw error;
	}
}

function extractUniqueUserResources(rows: Array<any>): {
	[resourceId: number]: {
		resourceName: string;
		permissionId: number;
		permissionName: string;
	};
} {
	try {
		if (rows.length <= 0) return {};

		const uniqueUserResources: {
			[resourceId: number]: {
				resourceName: string;
				permissionId: number;
				permissionName: string;
			};
		} = {};

		const highestResourcePermissions: {
			[resourceId: number]: number;
		} = extractHighestResourcePermissions(rows);

		rows.forEach((row) => {
			if (row.resid && !uniqueUserResources.hasOwnProperty(row.resid)) {
				uniqueUserResources[row.resid] = {
					resourceName: row.resname,
					permissionId: highestResourcePermissions[row.resid],
					permissionName:
						highestResourcePermissions[row.resid] === 1
							? "None"
							: highestResourcePermissions[row.resid] === 2
							? "Read"
							: highestResourcePermissions[row.resid] === 3
							? "Write"
							: "Unknown",
				};
			}
		});

		return uniqueUserResources;
	} catch (error) {
		throw error;
	}
}

function extractHighestResourcePermissions(rows: Array<any>): {
	[resourceId: number]: number;
} {
	try {
		if (rows.length <= 0) return {};

		const resourcePermissions: {
			[resourceId: number]: number;
		} = {};

		rows.forEach((row) => {
			if (resourcePermissions.hasOwnProperty(row.resid)) {
				resourcePermissions[row.resid] = Math.max(
					row.pid,
					resourcePermissions[row.resid]
				);
			} else if (row.resid) {
				resourcePermissions[row.resid] = row.pid;
			}
		});

		return resourcePermissions;
	} catch (error) {
		throw error;
	}
}

export const UserService = {
	getAllUsers,
	authenticateUser,
	getUserDetailsByID,
	getUserRoles,
	updateUserRoles,
	getUserDepartments,
	getUserResources,
	getUserResourcePermissions,
	userExists,
	createUser,
	deleteUser,
};

const userDetailsQueryById = `
SELECT
users.id uid,
users.username uname,
users.first_name fname,
users.last_name lname
FROM
users
WHERE
users.id = $1;
`;

const userDetailsQueryByUsername = `
SELECT
users.id uid,
users.username uname,
users.first_name fname,
users.last_name lname
FROM
users
WHERE
users.username = $1;
`;

const userRolesQueryById = `
SELECT
departments.id did,
departments.name dname,
roles.id rid,
roles.name rname
FROM
users
LEFT JOIN user_roles ON users.id = user_roles.user_id
LEFT JOIN roles ON user_roles.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
WHERE
users.id = $1;
`;

const userDepartmentsQueryById = `
SELECT
departments.id did,
departments.name dname
FROM
users
LEFT JOIN user_roles ON users.id = user_roles.user_id
LEFT JOIN roles ON user_roles.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
WHERE
users.id = $1;
`;

const userResourcesQueryById = `
SELECT
resources.id resid,
resources.name resname,
permissions.id pid,
permissions.name pname
FROM
users
LEFT JOIN user_roles ON users.id = user_roles.user_id
LEFT JOIN role_resource_permissions ON user_roles.role_id = role_resource_permissions.role_id
LEFT JOIN resources ON role_resource_permissions.resource_id = resources.id
LEFT JOIN permissions ON role_resource_permissions.permission_id = permissions.id
WHERE
users.id = $1;
`;

const userResourcePermissionsQueryById = `
SELECT
role_resource_permissions.resource_id resid,
role_resource_permissions.permission_id pid
FROM
users
LEFT JOIN user_roles ON users.id = user_roles.user_id
LEFT JOIN role_resource_permissions ON user_roles.role_id = role_resource_permissions.role_id
WHERE
users.id = $1;
`;

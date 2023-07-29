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

const createUser = async (
	username: string,
	password: string,
	firstName: string,
	lastName: string
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

		return extractUserDetails(result.rows);
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

const updateUser = async (id: string) => {
	console.log(`Update user ${id}.`);
};

const deleteUser = async (id: string) => {
	console.log(`Delete user ${id}.`);
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
			roles: {},
		};

		userDetails.userId = rows[0].uid;
		userDetails.username = rows[0].uname;
		userDetails.firstName = rows[0].fname;
		userDetails.lastName = rows[0].lname;

		rows.forEach((row) => {
			if (row.rid && !userDetails.roles[row.rid]) {
				userDetails.roles[parseInt(row.rid)] = {
					roleName: row.rname,
					departmentId: row.did,
					departmentName: row.dname,
					resourcePermissions: {},
				};
			}
			if (row.resid)
				userDetails.roles[parseInt(row.rid)].resourcePermissions[
					parseInt(row.resid)
				] = {
					resourceName: row.resname,
					permissionId: row.pid,
					permissionName: row.pname,
				};
		});

		return userDetails;
	} catch (error) {
		throw error;
	}
}

export const UserService = {
	getAllUsers,
	authenticateUser,
	getUserDetailsByID,
	userExists,
	createUser,
	updateUser,
	deleteUser,
};

const userDetailsQueryById = `
SELECT
users.id uid,
users.username uname,
users.first_name fname,
users.last_name lname,
roles.id rid,
roles.name rname,
departments.id did,
departments.name dname,
resources.id resid,
resources.name resname,
permissions.id pid,
permissions.name pname
FROM
users
LEFT JOIN user_roles ON users.id = user_roles.user_id
LEFT JOIN roles ON user_roles.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN role_resource_permissions ON roles.id = role_resource_permissions.role_id
LEFT JOIN resources ON role_resource_permissions.resource_id = resources.id
LEFT JOIN permissions ON role_resource_permissions.permission_id = permissions.id
WHERE
users.id = $1;
`;

const userDetailsQueryByUsername = `
SELECT
users.id uid,
users.username uname,
users.first_name fname,
users.last_name lname,
roles.id rid,
roles.name rname,
departments.id did,
departments.name dname,
resources.id resid,
resources.name resname,
permissions.id pid,
permissions.name pname
FROM
users
LEFT JOIN user_roles ON users.id = user_roles.user_id
LEFT JOIN roles ON user_roles.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
LEFT JOIN role_resource_permissions ON roles.id = role_resource_permissions.role_id
LEFT JOIN resources ON role_resource_permissions.resource_id = resources.id
LEFT JOIN permissions ON role_resource_permissions.permission_id = permissions.id
WHERE
users.username = $1;
`;

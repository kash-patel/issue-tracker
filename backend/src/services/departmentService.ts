import { db } from "../config/db";

// Read all
const getAllDepartments = async () => {
	try {
		const result = await db.query("SELECT * FROM departments;");
		return transformRows(result.rows);
	} catch (error) {
		throw error;
	}
};

// Read specifc
const getDepartmentById = async (id: string) => {
	try {
		const result = await db.query("SELECT * FROM departments WHERE id = $1;", [
			id,
		]);
		if (result.rowCount > 0) return transformRows(result.rows);

		throw new Error("No such department.");
	} catch (error) {
		throw error;
	}
};

// Create
const createDepartment = async (name: string) => {
	try {
		await db.query("INSERT INTO departments VALUES (DEFAULT, $1);", [name]);
		const newDepartmentQueryResult = await db.query(
			"SELECT * FROM departments WHERE name = $1;",
			[name]
		);
		return transformRows(newDepartmentQueryResult.rows);
	} catch (error) {
		throw error;
	}
};

// Update
const updateDepartment = async (id: string, name: string) => {
	try {
		await db.query("UPDATE departments SET name = $1 WHERE id = $2;", [
			name,
			id,
		]);
		const updatedDepartmentQueryResult = await db.query(
			"SELECT * FROM departments WHERE id = $1;",
			[id]
		);
		return transformRows(updatedDepartmentQueryResult.rows);
	} catch (error) {
		throw error;
	}
};

// Delete
const deleteDepartment = async (id: string) => {
	try {
		await db.query("DELETE FROM departments WHERE id = $1;", [id]);
		return `Delete department ${id}.`;
	} catch (error) {
		throw error;
	}
};

function transformRows(rows: Array<any>): {
	[departmentId: number]: string;
} {
	const departments: {
		[departmentId: number]: string;
	} = {};

	rows.forEach((row) => {
		departments[row.id] = row.name;
	});

	return departments;
}

export const DepartmentService = {
	createDepartment,
	getAllDepartments,
	getDepartmentById,
	updateDepartment,
	deleteDepartment,
};

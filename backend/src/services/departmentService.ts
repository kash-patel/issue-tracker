import { db } from "../config/db";

// Read all
const getAllDepartments = async () => {
	try {
		const result = await db.query("SELECT * FROM departments;");
		return result.rows;
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
		return result.rows;
	} catch (error) {
		throw error;
	}
};

// Create
const createDepartment = async (name: string) => {
	try {
		await db.query("INSERT INTO departments VALUES (DEFAULT, $1);", [name]);
		return `Created department ${name}.`;
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
		return `Renamed department ${id} to ${name}.`;
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

export const DepartmentService = {
	createDepartment,
	getAllDepartments,
	getDepartmentById,
	updateDepartment,
	deleteDepartment,
};

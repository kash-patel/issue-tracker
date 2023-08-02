import { db } from "../config/db";

// Read all
const getAllLocations = async () => {
	try {
		const result = await db.query("SELECT * FROM locations;");
		return result.rows;
	} catch (error) {
		throw error;
	}
};

// Read specifc
const getLocationById = async (id: string) => {
	try {
		const result = await db.query("SELECT * FROM locations WHERE id = $1;", [
			id,
		]);
		if (result.rowCount > 0) return result.rows;

		throw new Error("No such location.");
	} catch (error) {
		throw error;
	}
};

// Create
const createLocation = async (name: string) => {
	try {
		await db.query("INSERT INTO locations VALUES (DEFAULT, $1);", [name]);
		return `Created location ${name}.`;
	} catch (error) {
		throw error;
	}
};

// Update
const updateLocation = async (id: string, name: string) => {
	try {
		await db.query("UPDATE locations SET name = $1 WHERE id = $2;", [name, id]);
		return `Renamed location ${id} to ${name}.`;
	} catch (error) {
		throw error;
	}
};

// Delete
const deleteLocation = async (id: string) => {
	try {
		await db.query("DELETE FROM locations WHERE id = $1;", [id]);
		return `Delete location ${id}.`;
	} catch (error) {
		throw error;
	}
};

export const LocationService = {
	createLocation,
	getAllLocations,
	getLocationById,
	updateLocation,
	deleteLocation,
};

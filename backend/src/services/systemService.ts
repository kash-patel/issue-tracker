import { db } from "../config/db";

// Read all or by location
const getAllSystems = async (locationId?: string) => {
	try {
		const queryString: string =
			"SELECT * FROM systems" + (locationId ? " WHERE location_id = $1;" : ";");

		const result = await (locationId
			? db.query(queryString, [locationId])
			: db.query(queryString));

		return result.rows;
	} catch (error) {
		throw error;
	}
};

// Read specifc
const getSystemById = async (id: string) => {
	try {
		const result = await db.query("SELECT * FROM systems WHERE id = $1;", [id]);
		if (result.rowCount > 0) return result.rows;

		throw new Error("No such system.");
	} catch (error) {
		throw error;
	}
};

// Create
const createSystem = async (name: string, locationId: number) => {
	try {
		await db.query("INSERT INTO systems VALUES (DEFAULT, $1, $2);", [
			locationId,
			name,
		]);

		const systemIdResult = await db.query("SELECT max(id) FROM systems;");
		const systemId: number = systemIdResult.rows[0].max
			? systemIdResult.rows[0].max
			: 1;

		return `Created system ${name} with ID ${systemId} in location ${locationId}.`;
	} catch (error) {
		throw error;
	}
};

// Update
const updateSystem = async (id: string, name?: string) => {
	try {
		if (name)
			await db.query("UPDATE systems SET name = $1 WHERE id = $2;", [name, id]);

		let responseString: string = "";

		if (name) responseString += `Updated the name of system ${id} to ${name}. `;

		return responseString;
	} catch (error) {
		throw error;
	}
};

// Delete
const deleteSystem = async (id: string) => {
	try {
		await db.query("DELETE FROM systems WHERE id = $1;", [id]);
		return `Deleted system ${id}.`;
	} catch (error) {
		throw error;
	}
};

export const SystemService = {
	createSystem,
	getAllSystems,
	getSystemById,
	updateSystem,
	deleteSystem,
};

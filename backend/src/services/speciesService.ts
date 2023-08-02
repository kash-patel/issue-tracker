import { db } from "../config/db";

// Read all
const getAllSpecies = async () => {
	try {
		const result = await db.query("SELECT * FROM species;");
		return result.rows;
	} catch (error) {
		throw error;
	}
};

// Read specifc
const getSpeciesById = async (id: string) => {
	try {
		const result = await db.query("SELECT * FROM species WHERE id = $1;", [id]);
		if (result.rowCount > 0) return result.rows;
		throw new Error("No such species.");
	} catch (error) {
		throw error;
	}
};

// Create
const createSpecies = async (genus: string, species: string) => {
	try {
		await db.query("INSERT INTO species VALUES (DEFAULT, $1, $2);", [
			genus,
			species,
		]);
		return `Created species ${genus} ${species}.`;
	} catch (error) {
		throw error;
	}
};

// Delete
const deleteSpecies = async (id: string) => {
	try {
		await db.query("DELETE FROM species WHERE id = $1;", [id]);
		return `Delete species ${id}.`;
	} catch (error) {
		throw error;
	}
};

export const SpeciesService = {
	createSpecies,
	getAllSpecies,
	getSpeciesById,
	deleteSpecies,
};

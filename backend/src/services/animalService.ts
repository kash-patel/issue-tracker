import { db } from "../config/db";

// Read all or by species
const getAllAnimals = async (speciesId?: number) => {
	try {
		const queryString: string =
			"SELECT * FROM animals" + (speciesId ? " WHERE species_id = $1;" : ";");

		const result = await (speciesId
			? db.query(queryString, [speciesId])
			: db.query(queryString));

		return result.rows;
	} catch (error) {
		throw error;
	}
};

// Read specifc
const getAnimalById = async (id: number) => {
	try {
		const result = await db.query("SELECT * FROM animals WHERE id = $1;", [id]);
		if (result.rowCount > 0) return result.rows;

		throw new Error("No such animal.");
	} catch (error) {
		throw error;
	}
};

// Create
const createAnimal = async (name: string, speciesId: number) => {
	try {
		await db.query("INSERT INTO animals VALUES (DEFAULT, $1, $2);", [
			speciesId,
			name,
		]);

		const animalIdResult = await db.query("SELECT max(id) FROM animals;");
		const animalId: number = animalIdResult.rows[0].max
			? animalIdResult.rows[0].max
			: 1;

		return `Created animal ${name} with ID ${animalId} of species ${speciesId}.`;
	} catch (error) {
		throw error;
	}
};

// Update
const updateAnimal = async (id: number, name: string) => {
	try {
		await db.query("UPDATE animals SET name = $1 WHERE id = $2;", [name, id]);
		return `Updated the name of animal ${id} to ${name}. `;
	} catch (error) {
		throw error;
	}
};

// Delete
const deleteAnimal = async (id: number) => {
	try {
		await db.query("DELETE FROM animals WHERE id = $1;", [id]);
		return `Deleted animal ${id}.`;
	} catch (error) {
		throw error;
	}
};

export const AnimalService = {
	createAnimal,
	getAllAnimals,
	getAnimalById,
	updateAnimal,
	deleteAnimal,
};

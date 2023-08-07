import { db } from "../config/db";

// Read all or by species
const getAllAnimals = async (speciesId?: number) => {
	try {
		const queryString: string =
			"SELECT * FROM animals" + (speciesId ? " WHERE species_id = $1;" : ";");

		const result = await (speciesId
			? db.query(queryString, [speciesId])
			: db.query(queryString));

		return transformRows(result.rows);
	} catch (error) {
		throw error;
	}
};

// Read specifc
const getAnimalById = async (id: number) => {
	try {
		const result = await db.query("SELECT * FROM animals WHERE id = $1;", [id]);
		if (result.rowCount > 0) return transformRows(result.rows);

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

		const newAnimalQueryResult = await db.query(
			"SELECT * FROM animals WHERE name = $1 AND species_id = $2;",
			[name, speciesId]
		);

		return transformRows(newAnimalQueryResult.rows);
	} catch (error) {
		throw error;
	}
};

// Update
const updateAnimal = async (id: number, name: string) => {
	try {
		await db.query("UPDATE animals SET name = $1 WHERE id = $2;", [name, id]);
		const updatednimalQueryResult = await db.query(
			"SELECT * FROM animals WHERE id = $1;",
			[id]
		);
		return transformRows(updatednimalQueryResult.rows);
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

function transformRows(rows: Array<any>): {
	[animalId: number]: {
		speciesId: number;
		name: string;
	};
} {
	try {
		const transformedRows: {
			[animalId: number]: {
				speciesId: number;
				name: string;
			};
		} = {};

		rows.forEach((row) => {
			transformedRows[row.id] = {
				speciesId: row.species_id,
				name: row.name,
			};
		});

		return transformedRows;
	} catch (error) {
		throw error;
	}
}

export const AnimalService = {
	createAnimal,
	getAllAnimals,
	getAnimalById,
	updateAnimal,
	deleteAnimal,
};

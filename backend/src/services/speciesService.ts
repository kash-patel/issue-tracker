import { db } from "../config/db";

// Read all
const getAllSpecies = async () => {
	try {
		const result = await db.query("SELECT * FROM species;");
		return transformRows(result.rows);
	} catch (error) {
		throw error;
	}
};

// Read specifc
const getSpeciesById = async (id: string) => {
	try {
		const result = await db.query("SELECT * FROM species WHERE id = $1;", [id]);
		if (result.rowCount > 0) return transformRows(result.rows);
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
		const newSpeciesQueryResult = await db.query(
			"SELECT * FROM species WHERE genus_name = $1 AND species_name = $2;",
			[genus, species]
		);
		return transformRows(newSpeciesQueryResult.rows);
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

function transformRows(rows: Array<any>): {
	[speciesId: number]: {
		genusName: string;
		speciesName: string;
	};
} {
	try {
		const transformedRows: {
			[speciesId: number]: {
				genusName: string;
				speciesName: string;
			};
		} = {};

		rows.forEach((row) => {
			transformedRows[row.id] = {
				genusName: row.genus_name,
				speciesName: row.species_name,
			};
		});

		return transformedRows;
	} catch (error) {
		throw error;
	}
}

export const SpeciesService = {
	createSpecies,
	getAllSpecies,
	getSpeciesById,
	deleteSpecies,
};

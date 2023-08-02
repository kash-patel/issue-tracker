import { db } from "../config/db";

// Read all
const getAllVehicles = async (vehicleParams: {
	make?: string;
	model?: string;
	licensePlate?: string;
}) => {
	try {
		let queryString: any = "";
		let result: any = null;

		if (vehicleParams.licensePlate) {
			queryString = "SELECT * FROM vehicles WHERE license_plate = $1;";
			result = await db.query(queryString, [vehicleParams.licensePlate]);
		} else if (vehicleParams.make && vehicleParams.model) {
			queryString = "SELECT * FROM vehicles WHERE make = $1 AND model = $2;";
			result = await db.query(queryString, [
				vehicleParams.make,
				vehicleParams.model,
			]);
		} else if (vehicleParams.make) {
			queryString = "SELECT * FROM vehicles WHERE make = $1;";
			result = await db.query(queryString, [vehicleParams.make]);
		} else if (vehicleParams.model) {
			queryString = "SELECT * FROM vehicles WHERE model = $1;";
			result = await db.query(queryString, [vehicleParams.model]);
		} else {
			queryString = "SELECT * FROM vehicles;";
			result = await db.query(queryString);
		}

		return result.rows;
	} catch (error) {
		throw error;
	}
};

// Read specifc
const getVehicleById = async (id: string) => {
	try {
		const result = await db.query("SELECT * FROM vehicles WHERE id = $1;", [
			id,
		]);
		if (result.rowCount > 0) return result.rows;

		throw new Error("No such vehicle.");
	} catch (error) {
		throw error;
	}
};

// Create
const createVehicle = async (
	make: string,
	model: string,
	licensePlate: string
) => {
	if (!make || !model || !licensePlate)
		throw new Error("Please provide a make, model, and license plate.");

	try {
		await db.query("INSERT INTO vehicles VALUES (DEFAULT, $1, $2, $3);", [
			make,
			model,
			licensePlate,
		]);
		return `Created vehicle ${make} ${model}, license plate ${licensePlate}.`;
	} catch (error) {
		throw error;
	}
};

// Delete
const deleteVehicle = async (id: string) => {
	try {
		await db.query("DELETE FROM vehicles WHERE id = $1;", [id]);
		return `Delete vehicle ${id}.`;
	} catch (error) {
		throw error;
	}
};

export const VehicleService = {
	createVehicle,
	getAllVehicles,
	getVehicleById,
	deleteVehicle,
};

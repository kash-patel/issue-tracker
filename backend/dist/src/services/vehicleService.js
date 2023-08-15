"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.VehicleService = void 0;
const db_1 = require("../config/db");
// Read all
const getAllVehicles = (vehicleParams) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        let queryString = "";
        let result = null;
        if (vehicleParams.licensePlate) {
            queryString = "SELECT * FROM vehicles WHERE license_plate = $1;";
            result = yield db_1.db.query(queryString, [vehicleParams.licensePlate]);
        }
        else if (vehicleParams.make && vehicleParams.model) {
            queryString = "SELECT * FROM vehicles WHERE make = $1 AND model = $2;";
            result = yield db_1.db.query(queryString, [
                vehicleParams.make,
                vehicleParams.model,
            ]);
        }
        else if (vehicleParams.make) {
            queryString = "SELECT * FROM vehicles WHERE make = $1;";
            result = yield db_1.db.query(queryString, [vehicleParams.make]);
        }
        else if (vehicleParams.model) {
            queryString = "SELECT * FROM vehicles WHERE model = $1;";
            result = yield db_1.db.query(queryString, [vehicleParams.model]);
        }
        else {
            queryString = "SELECT * FROM vehicles;";
            result = yield db_1.db.query(queryString);
        }
        return result.rows;
    }
    catch (error) {
        throw error;
    }
});
// Read specifc
const getVehicleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.query("SELECT * FROM vehicles WHERE id = $1;", [
            id,
        ]);
        if (result.rowCount > 0)
            return result.rows;
        throw new Error("No such vehicle.");
    }
    catch (error) {
        throw error;
    }
});
// Create
const createVehicle = (make, model, licensePlate) => __awaiter(void 0, void 0, void 0, function* () {
    if (!make || !model || !licensePlate)
        throw new Error("Please provide a make, model, and license plate.");
    try {
        yield db_1.db.query("INSERT INTO vehicles VALUES (DEFAULT, $1, $2, $3);", [
            make,
            model,
            licensePlate,
        ]);
        return `Created vehicle ${make} ${model}, license plate ${licensePlate}.`;
    }
    catch (error) {
        throw error;
    }
});
// Delete
const deleteVehicle = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("DELETE FROM vehicles WHERE id = $1;", [id]);
        return `Delete vehicle ${id}.`;
    }
    catch (error) {
        throw error;
    }
});
exports.VehicleService = {
    createVehicle,
    getAllVehicles,
    getVehicleById,
    deleteVehicle,
};

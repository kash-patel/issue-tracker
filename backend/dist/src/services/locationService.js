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
exports.LocationService = void 0;
const db_1 = require("../config/db");
// Read all
const getAllLocations = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.query("SELECT * FROM locations;");
        return result.rows;
    }
    catch (error) {
        throw error;
    }
});
// Read specifc
const getLocationById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.query("SELECT * FROM locations WHERE id = $1;", [
            id,
        ]);
        if (result.rowCount > 0)
            return result.rows;
        throw new Error("No such location.");
    }
    catch (error) {
        throw error;
    }
});
// Create
const createLocation = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("INSERT INTO locations VALUES (DEFAULT, $1);", [name]);
        return `Created location ${name}.`;
    }
    catch (error) {
        throw error;
    }
});
// Update
const updateLocation = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("UPDATE locations SET name = $1 WHERE id = $2;", [name, id]);
        return `Renamed location ${id} to ${name}.`;
    }
    catch (error) {
        throw error;
    }
});
// Delete
const deleteLocation = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("DELETE FROM locations WHERE id = $1;", [id]);
        return `Delete location ${id}.`;
    }
    catch (error) {
        throw error;
    }
});
exports.LocationService = {
    createLocation,
    getAllLocations,
    getLocationById,
    updateLocation,
    deleteLocation,
};

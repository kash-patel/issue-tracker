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
exports.SystemService = void 0;
const db_1 = require("../config/db");
// Read all or by location
const getAllSystems = (locationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryString = "SELECT * FROM systems" + (locationId ? " WHERE location_id = $1;" : ";");
        const result = yield (locationId
            ? db_1.db.query(queryString, [locationId])
            : db_1.db.query(queryString));
        return result.rows;
    }
    catch (error) {
        throw error;
    }
});
// Read specifc
const getSystemById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.query("SELECT * FROM systems WHERE id = $1;", [id]);
        if (result.rowCount > 0)
            return result.rows;
        throw new Error("No such system.");
    }
    catch (error) {
        throw error;
    }
});
// Create
const createSystem = (name, locationId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("INSERT INTO systems VALUES (DEFAULT, $1, $2);", [
            locationId,
            name,
        ]);
        const systemIdResult = yield db_1.db.query("SELECT max(id) FROM systems;");
        const systemId = systemIdResult.rows[0].max
            ? systemIdResult.rows[0].max
            : 1;
        return `Created system ${name} with ID ${systemId} in location ${locationId}.`;
    }
    catch (error) {
        throw error;
    }
});
// Update
const updateSystem = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (name)
            yield db_1.db.query("UPDATE systems SET name = $1 WHERE id = $2;", [name, id]);
        let responseString = "";
        if (name)
            responseString += `Updated the name of system ${id} to ${name}. `;
        return responseString;
    }
    catch (error) {
        throw error;
    }
});
// Delete
const deleteSystem = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("DELETE FROM systems WHERE id = $1;", [id]);
        return `Deleted system ${id}.`;
    }
    catch (error) {
        throw error;
    }
});
exports.SystemService = {
    createSystem,
    getAllSystems,
    getSystemById,
    updateSystem,
    deleteSystem,
};

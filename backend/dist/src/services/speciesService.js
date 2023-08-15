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
exports.SpeciesService = void 0;
const db_1 = require("../config/db");
// Read all
const getAllSpecies = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.query("SELECT * FROM species;");
        return transformRows(result.rows);
    }
    catch (error) {
        throw error;
    }
});
// Read specifc
const getSpeciesById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.query("SELECT * FROM species WHERE id = $1;", [id]);
        if (result.rowCount > 0)
            return transformRows(result.rows);
        throw new Error("No such species.");
    }
    catch (error) {
        throw error;
    }
});
// Create
const createSpecies = (genus, species) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("INSERT INTO species VALUES (DEFAULT, $1, $2);", [
            genus,
            species,
        ]);
        const newSpeciesQueryResult = yield db_1.db.query("SELECT * FROM species WHERE genus_name = $1 AND species_name = $2;", [genus, species]);
        return transformRows(newSpeciesQueryResult.rows);
    }
    catch (error) {
        throw error;
    }
});
// Delete
const deleteSpecies = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("DELETE FROM species WHERE id = $1;", [id]);
        return `Delete species ${id}.`;
    }
    catch (error) {
        throw error;
    }
});
function transformRows(rows) {
    try {
        const transformedRows = {};
        rows.forEach((row) => {
            transformedRows[row.id] = {
                genusName: row.genus_name,
                speciesName: row.species_name,
            };
        });
        return transformedRows;
    }
    catch (error) {
        throw error;
    }
}
exports.SpeciesService = {
    createSpecies,
    getAllSpecies,
    getSpeciesById,
    deleteSpecies,
};

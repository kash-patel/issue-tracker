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
exports.AnimalService = void 0;
const db_1 = require("../config/db");
// Read all or by species
const getAllAnimals = (speciesId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryString = "SELECT * FROM animals" + (speciesId ? " WHERE species_id = $1;" : ";");
        const result = yield (speciesId
            ? db_1.db.query(queryString, [speciesId])
            : db_1.db.query(queryString));
        return transformRows(result.rows);
    }
    catch (error) {
        throw error;
    }
});
// Read specifc
const getAnimalById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.query("SELECT * FROM animals WHERE id = $1;", [id]);
        if (result.rowCount > 0)
            return transformRows(result.rows);
        throw new Error("No such animal.");
    }
    catch (error) {
        throw error;
    }
});
// Create
const createAnimal = (name, speciesId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("INSERT INTO animals VALUES (DEFAULT, $1, $2);", [
            speciesId,
            name,
        ]);
        const newAnimalQueryResult = yield db_1.db.query("SELECT * FROM animals WHERE name = $1 AND species_id = $2;", [name, speciesId]);
        return transformRows(newAnimalQueryResult.rows);
    }
    catch (error) {
        throw error;
    }
});
// Update
const updateAnimal = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("UPDATE animals SET name = $1 WHERE id = $2;", [name, id]);
        const updatednimalQueryResult = yield db_1.db.query("SELECT * FROM animals WHERE id = $1;", [id]);
        return transformRows(updatednimalQueryResult.rows);
    }
    catch (error) {
        throw error;
    }
});
// Delete
const deleteAnimal = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("DELETE FROM animals WHERE id = $1;", [id]);
        return `Deleted animal ${id}.`;
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
                speciesId: row.species_id,
                name: row.name,
            };
        });
        return transformedRows;
    }
    catch (error) {
        throw error;
    }
}
exports.AnimalService = {
    createAnimal,
    getAllAnimals,
    getAnimalById,
    updateAnimal,
    deleteAnimal,
};

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
exports.DepartmentService = void 0;
const db_1 = require("../config/db");
// Read all
const getAllDepartments = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.query("SELECT * FROM departments;");
        return transformRows(result.rows);
    }
    catch (error) {
        throw error;
    }
});
// Read specifc
const getDepartmentById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.query("SELECT * FROM departments WHERE id = $1;", [
            id,
        ]);
        if (result.rowCount > 0)
            return transformRows(result.rows);
        throw new Error("No such department.");
    }
    catch (error) {
        throw error;
    }
});
// Create
const createDepartment = (name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("INSERT INTO departments VALUES (DEFAULT, $1);", [name]);
        const newDepartmentQueryResult = yield db_1.db.query("SELECT * FROM departments WHERE name = $1;", [name]);
        return transformRows(newDepartmentQueryResult.rows);
    }
    catch (error) {
        throw error;
    }
});
// Update
const updateDepartment = (id, name) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("UPDATE departments SET name = $1 WHERE id = $2;", [
            name,
            id,
        ]);
        const updatedDepartmentQueryResult = yield db_1.db.query("SELECT * FROM departments WHERE id = $1;", [id]);
        return transformRows(updatedDepartmentQueryResult.rows);
    }
    catch (error) {
        throw error;
    }
});
// Delete
const deleteDepartment = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("DELETE FROM departments WHERE id = $1;", [id]);
        return `Delete department ${id}.`;
    }
    catch (error) {
        throw error;
    }
});
function transformRows(rows) {
    const departments = {};
    rows.forEach((row) => {
        departments[row.id] = row.name;
    });
    return departments;
}
exports.DepartmentService = {
    createDepartment,
    getAllDepartments,
    getDepartmentById,
    updateDepartment,
    deleteDepartment,
};

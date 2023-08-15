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
exports.RoleService = void 0;
const db_1 = require("../config/db");
// Read all or by department
const getAllRoles = (departmentId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const queryString = "SELECT * FROM roles" +
            (departmentId ? " WHERE department_id = $1;" : ";");
        const result = yield (departmentId
            ? db_1.db.query(queryString, [departmentId])
            : db_1.db.query(queryString));
        return transformRows(result.rows);
    }
    catch (error) {
        throw error;
    }
});
// Read specifc
const getRoleById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.query("SELECT * FROM roles WHERE id = $1;", [id]);
        if (result.rowCount > 0)
            return transformRows(result.rows);
        throw new Error("No such role.");
    }
    catch (error) {
        throw error;
    }
});
// Create
const createRole = (name, departmentId, resourcePermissions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("INSERT INTO roles VALUES (DEFAULT, $1, $2);", [
            name,
            departmentId,
        ]);
        if (!resourcePermissions)
            return `Created role ${name}.`;
        const roleIdResult = yield db_1.db.query("SELECT max(id) FROM roles;");
        const roleId = roleIdResult.rows[0].max
            ? roleIdResult.rows[0].max
            : 1;
        for (const [key, val] of Object.entries(resourcePermissions)) {
            yield db_1.db.query("INSERT INTO role_resource_permissions VALUES (DEFAULT, $1, $2, $3);", [roleId, key, val]);
        }
        const newRoleQueryResult = yield db_1.db.query("SELECT * FROM roles WHERE department_id = $1 AND name = $2;", [departmentId, name]);
        return transformRows(newRoleQueryResult.rows);
    }
    catch (error) {
        throw error;
    }
});
// Update
const updateRole = (id, name, resourcePermissions) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (name)
            yield db_1.db.query("UPDATE roles SET name = $1 WHERE id = $2;", [name, id]);
        if (resourcePermissions) {
            const existingResourcePermissionsResult = yield db_1.db.query("SELECT resource_id, permission_id FROM role_resource_permissions WHERE role_id = $1;", [id]);
            const existingResourcePermissions = {};
            existingResourcePermissionsResult.rows.forEach((row) => {
                existingResourcePermissions[row.resource_id] = row.permission_id;
            });
            // Add to or update DB values
            for (const [key, val] of Object.entries(resourcePermissions)) {
                if (existingResourcePermissions.hasOwnProperty(key)) {
                    yield db_1.db.query("UPDATE role_resource_permissions SET permission_id = $1 WHERE role_id = $2 AND resource_id = $3;", [val, id, key]);
                }
                else {
                    yield db_1.db.query("INSERT INTO role_resource_permissions VALUES (DEFAULT, $1, $2, $3);", [id, key, val]);
                }
            }
            // Delete DB values
            for (const key of Object.keys(existingResourcePermissions)) {
                if (!(key in Object.keys(resourcePermissions)))
                    yield db_1.db.query("DELETE FROM role_resource_permissions WHERE role_id = $1 AND resource_id = $2;", [id, key]);
            }
        }
        const updatedRoleQueryResult = yield db_1.db.query("SELECT * FROM roles WHERE id = $1;", [id]);
        return transformRows(updatedRoleQueryResult.rows);
    }
    catch (error) {
        throw error;
    }
});
// Delete
const deleteRole = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("DELETE FROM role_resource_permissions WHERE role_id = $1;", [id]);
        yield db_1.db.query("DELETE FROM roles WHERE id = $1;", [id]);
        return `Deleted role ${id} and associated resource permissions.`;
    }
    catch (error) {
        throw error;
    }
});
function transformRows(rows) {
    const roles = {};
    rows.forEach((row) => {
        roles[row.id] = {
            departmentId: row.department_id,
            name: row.name,
        };
    });
    return roles;
}
exports.RoleService = {
    createRole,
    getAllRoles,
    getRoleById,
    updateRole,
    deleteRole,
};

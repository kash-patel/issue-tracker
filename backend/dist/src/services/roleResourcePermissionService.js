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
exports.RoleResourcePermissionService = void 0;
const db_1 = require("../config/db");
const getAllRoleResourcePermissions = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.query(getAllRoleResourcePermissionsQuery);
        return transformRows(result.rows);
    }
    catch (error) {
        throw error;
    }
});
const getRoleResourcePermissionsByRoleId = (roleId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.query(getRoleResourcePermissionsByRoleIdQuery, [
            roleId,
        ]);
        return transformRows(result.rows);
    }
    catch (error) {
        throw error;
    }
});
const getRoleResourcePermissionById = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.query(getRoleResourcePermissionByIdQuery, [id]);
        return transformRows(result.rows);
    }
    catch (error) {
        throw error;
    }
});
const createRoleResourcePermission = (roleId, resourceId, permissionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("INSERT INTO role_resource_permissions VALUES (DEFAULT, $1, $2, $3);", [roleId, resourceId, permissionId]);
        const newRoleResourcePermissionQueryResult = yield db_1.db.query(getRoleResourcePermissionByRoleIdAndResourceIdQuery, [roleId, resourceId]);
        return transformRows(newRoleResourcePermissionQueryResult.rows);
    }
    catch (error) {
        throw error;
    }
});
const updateRoleResourcePermission = (id, newPermissionId) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("UPDATE role_resource_permissions SET permission_id = $1 WHERE id = $2;", [newPermissionId, id]);
        const updatedRoleResourcePermissionQueryResult = yield db_1.db.query(getRoleResourcePermissionByIdQuery, [id]);
        return transformRows(updatedRoleResourcePermissionQueryResult.rows);
    }
    catch (error) {
        throw error;
    }
});
const deleteRoleResourcePermission = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("DELETE FROM role_resource_permissions WHERE id = $1;", [
            id,
        ]);
        return `Delete role resource permission ${id}.`;
    }
    catch (error) {
        throw error;
    }
});
function transformRows(rows) {
    const roleResourcePermissions = {};
    rows.forEach((row) => {
        if (row.role_id != null) {
            if (!roleResourcePermissions[row.role_id])
                roleResourcePermissions[row.role_id] = {};
            if (!roleResourcePermissions[row.role_id][row.resource_id])
                roleResourcePermissions[row.role_id][row.resource_id] = {
                    resourceName: row.resource_name,
                    permissionId: row.permission_id,
                };
        }
    });
    return roleResourcePermissions;
}
exports.RoleResourcePermissionService = {
    getAllRoleResourcePermissions,
    getRoleResourcePermissionById,
    getRoleResourcePermissionsByRoleId,
    createRoleResourcePermission,
    updateRoleResourcePermission,
    deleteRoleResourcePermission,
};
const getAllRoleResourcePermissionsQuery = `
SELECT
role_resource_permissions.role_id role_id,
resources.id resource_id,
resources.name resource_name,
permissions.id permission_id
FROM
role_resource_permissions
LEFT JOIN resources ON role_resource_permissions.resource_id = resources.id
LEFT JOIN permissions ON role_resource_permissions.permission_id = permissions.id
;`;
const getRoleResourcePermissionsByRoleIdQuery = `
SELECT
role_resource_permissions.role_id role_id,
resources.id resource_id,
resources.name resource_name,
permissions.id permission_id
FROM
role_resource_permissions
LEFT JOIN resources ON role_resource_permissions.resource_id = resources.id
LEFT JOIN permissions ON role_resource_permissions.permission_id = permissions.id
WHERE
role_resource_permissions.role_id = $1
;`;
const getRoleResourcePermissionByIdQuery = `
SELECT
role_resource_permissions.role_id role_id,
resources.id resource_id,
resources.name resource_name,
permissions.id permission_id
FROM
role_resource_permissions
LEFT JOIN resources ON role_resource_permissions.resource_id = resources.id
LEFT JOIN permissions ON role_resource_permissions.permission_id = permissions.id
WHERE
role_resource_permissions.id = $1
;`;
const getRoleResourcePermissionByRoleIdAndResourceIdQuery = `
SELECT
role_resource_permissions.role_id role_id,
resources.id resource_id,
resources.name resource_name,
permissions.id permission_id
FROM
role_resource_permissions
LEFT JOIN resources ON role_resource_permissions.resource_id = resources.id
LEFT JOIN permissions ON role_resource_permissions.permission_id = permissions.id
WHERE
role_resource_permissions.role_id = $1
AND
role_resource_permissions.resource_id = $2
;`;

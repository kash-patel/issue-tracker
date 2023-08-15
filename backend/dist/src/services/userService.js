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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const db_1 = require("../config/db");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const getAllUsers = () => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const users = yield db_1.db.query("SELECT * FROM users;");
        return users;
    }
    catch (error) {
        throw error;
    }
});
const getUserDetailsByID = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield userExists(id, undefined)) {
            const result = yield db_1.db.query(userDetailsQueryById, [id]);
            const user = extractUserDetails(result.rows);
            return user;
        }
        else
            throw new Error("No such user.");
    }
    catch (error) {
        throw error;
    }
});
const authenticateUser = (username, password) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const result = yield db_1.db.query("SELECT * FROM users WHERE username = $1", [
            username,
        ]);
        if (result.rowCount > 0 &&
            (yield bcryptjs_1.default.compare(password, result.rows[0].password_hashed))) {
            const result = yield db_1.db.query(userDetailsQueryByUsername, [username]);
            return extractUserDetails(result.rows);
        }
        else
            throw new Error("Invalid credentials.");
    }
    catch (error) {
        throw error;
    }
});
const getUserRoles = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doesUserExist = yield userExists(id);
        if (!doesUserExist)
            return {};
        const result = yield db_1.db.query(userRolesQueryById, [id]);
        return extractUserRoles(result.rows);
    }
    catch (error) {
        throw error;
    }
});
const updateUserRoles = (id, newUserRoles) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const existingRolesResult = yield db_1.db.query("SELECT role_id FROM user_roles WHERE user_id = $1;", [id]);
        const existingRoles = existingRolesResult.rows.map((row) => row.role_id);
        newUserRoles.forEach((newRoleId) => __awaiter(void 0, void 0, void 0, function* () {
            if (!existingRoles.includes(newRoleId))
                yield db_1.db.query("INSERT INTO user_roles VALUES (DEFAULT, $1, $2);", [
                    id,
                    newRoleId,
                ]);
        }));
        existingRoles.forEach((existingRoleId) => __awaiter(void 0, void 0, void 0, function* () {
            if (!newUserRoles.includes(existingRoleId))
                yield db_1.db.query("DELETE FROM user_roles WHERE user_id = $1 AND role_id = $2;", [id, existingRoleId]);
        }));
        const updatedUserRoles = yield getUserRoles(id);
        return updatedUserRoles;
    }
    catch (error) {
        throw error;
    }
});
const getUserDepartments = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doesUserExist = yield userExists(id);
        if (!doesUserExist)
            return {};
        const result = yield db_1.db.query(userDepartmentsQueryById, [id]);
        return extractUserDepartments(result.rows);
    }
    catch (error) {
        throw error;
    }
});
const getUserResources = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doesUserExist = yield userExists(id);
        if (!doesUserExist)
            return {};
        const result = yield db_1.db.query(userResourcesQueryById, [id]);
        return extractUniqueUserResources(result.rows);
    }
    catch (error) {
        throw error;
    }
});
const getUserResourcePermissions = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const doesUserExist = yield userExists(id);
        if (!doesUserExist)
            return {};
        const result = yield db_1.db.query(userResourcePermissionsQueryById, [id]);
        return extractHighestResourcePermissions(result.rows);
    }
    catch (error) {
        throw error;
    }
});
const createUser = (username, password, firstName, lastName, roleIds) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        if (yield userExists(undefined, username))
            throw new Error("Username unavailable.");
        const salt = yield bcryptjs_1.default.genSalt(10);
        const password_hashed = yield bcryptjs_1.default.hash(password, salt);
        yield db_1.db.query("INSERT INTO users VALUES (DEFAULT, $1, $2, $3, $4);", [
            username,
            password_hashed,
            firstName,
            lastName,
        ]);
        const result = yield db_1.db.query(userDetailsQueryByUsername, [username]);
        const userDetails = extractUserDetails(result.rows);
        // Post user roles if they exist
        if (!roleIds || roleIds.length <= 0)
            return userDetails;
        roleIds.forEach((roleId) => __awaiter(void 0, void 0, void 0, function* () {
            yield db_1.db.query("INSERT INTO user_roles VALUES (DEFAULT, $1, $2);", [
                userDetails.userId,
                roleId,
            ]);
        }));
        return userDetails;
    }
    catch (error) {
        throw error;
    }
});
const deleteUser = (id) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield db_1.db.query("DELETE FROM users WHERE id = $1;", [id]);
        return `Deleted user ${id}.`;
    }
    catch (error) {
        throw error;
    }
});
const userExists = (id, username) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const query = `SELECT * FROM users WHERE ${id ? "id" : "username"} = $1;`;
        const result = yield db_1.db.query(query, [id ? id : username]);
        return result.rowCount > 0;
    }
    catch (error) {
        throw error;
    }
});
function extractUserDetails(rows) {
    try {
        const userDetails = {
            userId: 0,
            username: "",
            firstName: "",
            lastName: "",
        };
        if (rows.length <= 0)
            return userDetails;
        userDetails.userId = rows[0].uid;
        userDetails.username = rows[0].uname;
        userDetails.firstName = rows[0].fname;
        userDetails.lastName = rows[0].lname;
        return userDetails;
    }
    catch (error) {
        throw error;
    }
}
function extractUserRoles(rows) {
    try {
        if (rows.length <= 0)
            return {};
        const userRoles = {};
        rows.forEach((row) => {
            if (row.rid) {
                if (!userRoles[row.did])
                    userRoles[row.did] = { departmentName: row.dname, roles: {} };
                userRoles[row.did].roles[row.rid] = row.rname;
            }
        });
        return userRoles;
    }
    catch (error) {
        throw error;
    }
}
function extractUserDepartments(rows) {
    try {
        if (rows.length <= 0)
            return {};
        const userDepartments = {};
        rows.forEach((row) => {
            if (row.did)
                userDepartments[row.did] = row.dname;
        });
        return userDepartments;
    }
    catch (error) {
        throw error;
    }
}
function extractUniqueUserResources(rows) {
    try {
        if (rows.length <= 0)
            return {};
        const uniqueUserResources = {};
        const highestResourcePermissions = extractHighestResourcePermissions(rows);
        rows.forEach((row) => {
            if (row.resid && !uniqueUserResources.hasOwnProperty(row.resid)) {
                uniqueUserResources[row.resid] = {
                    resourceName: row.resname,
                    permissionId: highestResourcePermissions[row.resid],
                    permissionName: highestResourcePermissions[row.resid] === 1
                        ? "None"
                        : highestResourcePermissions[row.resid] === 2
                            ? "Read"
                            : highestResourcePermissions[row.resid] === 3
                                ? "Write"
                                : "Unknown",
                };
            }
        });
        return uniqueUserResources;
    }
    catch (error) {
        throw error;
    }
}
function extractHighestResourcePermissions(rows) {
    try {
        if (rows.length <= 0)
            return {};
        const resourcePermissions = {};
        rows.forEach((row) => {
            if (resourcePermissions.hasOwnProperty(row.resid)) {
                resourcePermissions[row.resid] = Math.max(row.pid, resourcePermissions[row.resid]);
            }
            else if (row.resid) {
                resourcePermissions[row.resid] = row.pid;
            }
        });
        return resourcePermissions;
    }
    catch (error) {
        throw error;
    }
}
exports.UserService = {
    getAllUsers,
    authenticateUser,
    getUserDetailsByID,
    getUserRoles,
    updateUserRoles,
    getUserDepartments,
    getUserResources,
    getUserResourcePermissions,
    userExists,
    createUser,
    deleteUser,
};
const userDetailsQueryById = `
SELECT
users.id uid,
users.username uname,
users.first_name fname,
users.last_name lname
FROM
users
WHERE
users.id = $1;
`;
const userDetailsQueryByUsername = `
SELECT
users.id uid,
users.username uname,
users.first_name fname,
users.last_name lname
FROM
users
WHERE
users.username = $1;
`;
const userRolesQueryById = `
SELECT
departments.id did,
departments.name dname,
roles.id rid,
roles.name rname
FROM
users
LEFT JOIN user_roles ON users.id = user_roles.user_id
LEFT JOIN roles ON user_roles.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
WHERE
users.id = $1;
`;
const userDepartmentsQueryById = `
SELECT
departments.id did,
departments.name dname
FROM
users
LEFT JOIN user_roles ON users.id = user_roles.user_id
LEFT JOIN roles ON user_roles.role_id = roles.id
LEFT JOIN departments ON roles.department_id = departments.id
WHERE
users.id = $1;
`;
const userResourcesQueryById = `
SELECT
resources.id resid,
resources.name resname,
permissions.id pid,
permissions.name pname
FROM
users
LEFT JOIN user_roles ON users.id = user_roles.user_id
LEFT JOIN role_resource_permissions ON user_roles.role_id = role_resource_permissions.role_id
LEFT JOIN resources ON role_resource_permissions.resource_id = resources.id
LEFT JOIN permissions ON role_resource_permissions.permission_id = permissions.id
WHERE
users.id = $1;
`;
const userResourcePermissionsQueryById = `
SELECT
role_resource_permissions.resource_id resid,
role_resource_permissions.permission_id pid
FROM
users
LEFT JOIN user_roles ON users.id = user_roles.user_id
LEFT JOIN role_resource_permissions ON user_roles.role_id = role_resource_permissions.role_id
WHERE
users.id = $1;
`;

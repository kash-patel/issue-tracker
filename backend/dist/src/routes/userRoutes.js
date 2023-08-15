"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const userController_1 = require("../controllers/userController");
const authHandler_1 = require("../middleware/authHandler");
const router = express_1.default.Router();
router.get("/", authHandler_1.AuthHandler.requirePermissions({ 9: 2 }), userController_1.UserController.getAllUsers);
router.get("/:id", authHandler_1.AuthHandler.requirePermissions({ 9: 2 }), userController_1.UserController.getUserById);
router.post("/", authHandler_1.AuthHandler.requirePermissions({ 9: 3 }), userController_1.UserController.registerUser);
router.post("/login", userController_1.UserController.authUser);
router.post("/logout", userController_1.UserController.logoutUser);
router.delete("/:id", authHandler_1.AuthHandler.requirePermissions({ 9: 3 }), userController_1.UserController.deleteUser);
// User roles
router.get("/:id/roles", authHandler_1.AuthHandler.requirePermissions({ 9: 2 }, true), userController_1.UserController.getUserRoles);
router.patch("/:id/roles", authHandler_1.AuthHandler.requirePermissions({ 9: 3 }), userController_1.UserController.updateUserRoles);
// Get user departments
router.get("/:id/departments", authHandler_1.AuthHandler.requirePermissions({ 2: 2 }, true), userController_1.UserController.getUserDepartments);
// Get user resources
router.get("/:id/resources", authHandler_1.AuthHandler.requirePermissions({ 5: 2 }, true), userController_1.UserController.getUserResources);
// router
// 	.route("/profile")
// 	.get(AuthHandler.requireSignIn, UserController.getUserProfile)
// 	.put(AuthHandler.requireSignIn, UserController.updateUserProfile);
// router.delete("/:id", UserController.deleteUser);
exports.default = router;

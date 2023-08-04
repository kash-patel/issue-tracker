import express from "express";
import { UserController } from "../controllers/userController";
import { AuthHandler } from "../middleware/authHandler";

const router = express.Router();

router.get(
	"/",
	AuthHandler.requirePermissions({ 9: 2 }),
	UserController.getAllUsers
);
router.get(
	"/:id",
	AuthHandler.requirePermissions({ 9: 2 }),
	UserController.getUserById
);
router.post(
	"/",
	AuthHandler.requirePermissions({ 9: 3 }),
	UserController.registerUser
);
router.post("/login", UserController.authUser);
router.post("/logout", UserController.logoutUser);
router.delete(
	"/:id",
	AuthHandler.requirePermissions({ 9: 3 }),
	UserController.deleteUser
);

// User roles
router.get(
	"/:id/roles",
	AuthHandler.requirePermissions({ 9: 2 }, true),
	UserController.getUserRoles
);
router.patch(
	"/:id/roles",
	AuthHandler.requirePermissions({ 9: 3 }),
	UserController.updateUserRoles
);

// Get user departments
router.get(
	"/:id/departments",
	AuthHandler.requirePermissions({ 2: 2 }, true),
	UserController.getUserDepartments
);
// Get user resources
router.get(
	"/:id/resources",
	AuthHandler.requirePermissions({ 5: 2 }, true),
	UserController.getUserResources
);

// router
// 	.route("/profile")
// 	.get(AuthHandler.requireSignIn, UserController.getUserProfile)
// 	.put(AuthHandler.requireSignIn, UserController.updateUserProfile);
// router.delete("/:id", UserController.deleteUser);

export default router;

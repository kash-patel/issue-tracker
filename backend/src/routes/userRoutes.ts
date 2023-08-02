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
	AuthHandler.requirePermissions({ 9: 2 }),
	UserController.getUserRoles
);
router.patch(
	"/:id/roles",
	AuthHandler.requirePermissions({ 9: 3 }),
	UserController.updateUserRoles
);
// router
// 	.route("/profile")
// 	.get(AuthHandler.requireSignIn, UserController.getUserProfile)
// 	.put(AuthHandler.requireSignIn, UserController.updateUserProfile);
// router.delete("/:id", UserController.deleteUser);

export default router;

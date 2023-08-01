import express from "express";
import { UserController } from "../controllers/userController";
import { AuthHandler } from "../middleware/authHandler";

const router = express.Router();

router.post(
	"/",
	AuthHandler.requireResourcePermission({ 9: 3 }),
	UserController.registerUser
);
router.post("/login", UserController.authUser);
router.post("/logout", UserController.logoutUser);
// router
// 	.route("/profile")
// 	.get(AuthHandler.requireSignIn, UserController.getUserProfile)
// 	.put(AuthHandler.requireSignIn, UserController.updateUserProfile);
// router.delete("/:id", UserController.deleteUser);
router.get(
	"/",
	AuthHandler.requireResourcePermission({ 9: 2 }),
	UserController.getAllUsers
);
router.get(
	"/:id",
	AuthHandler.requireResourcePermission({ 9: 2 }),
	UserController.getUserById
);

export default router;

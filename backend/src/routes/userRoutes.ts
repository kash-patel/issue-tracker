import express from "express";
import { UserController } from "../controllers/userController";
import { AuthHandler } from "../middleware/authHandler";

const router = express.Router();

router.post("/", UserController.registerUser);
router.get("/login", UserController.authUser);
router.post("/logout", UserController.logoutUser);
// router
// 	.route("/profile")
// 	.get(AuthHandler.requireSignIn, UserController.getUserProfile)
// 	.put(AuthHandler.requireSignIn, UserController.updateUserProfile);
// router.delete("/:id", UserController.deleteUser);
router.get("/", UserController.getAllUsers);
router.get("/:id", UserController.getUserById);

export default router;

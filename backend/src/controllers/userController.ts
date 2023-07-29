import asyncHandler from "express-async-handler";
import { UserService } from "../services/userService";
import generateJWT from "../utils/generateJWT";

const getAllUsers = asyncHandler(async (req: any, res: any) => {
	const users = await UserService.getAllUsers();
	res.send(users.rows);
});

const getUserById = asyncHandler(async (req, res) => {
	const user = await UserService.getUserDetailsByID(parseInt(req.params.id));
	if (user) res.send(user);
	else res.status(404).send("No such user.");
});

const registerUser = asyncHandler(async (req, res) => {
	const { username, password, firstName, lastName } = req.body;
	if (!username || !password || !firstName || !lastName)
		throw new Error(
			"Please include a username, password, first name, and last name."
		);
	const newUserDetails = await UserService.createUser(
		username,
		password,
		firstName,
		lastName
	);
	generateJWT(res, newUserDetails);
	res.send(newUserDetails);
});

const authUser = asyncHandler(async (req, res) => {
	const { username, password } = req.body;
	const userDetails = await UserService.authenticateUser(username, password);
	generateJWT(res, userDetails);
	res.status(201).send(userDetails);
});

const logoutUser = asyncHandler(async (req, res) => {
	res.cookie("jwt", null, {
		httpOnly: true,
		expires: new Date(0),
	});
	res.status(200).send("User logged out.");
});

export const UserController = {
	getAllUsers,
	getUserById,
	registerUser,
	authUser,
	logoutUser,
};

import asyncHandler from "express-async-handler";
import { UserService } from "../services/userService";
import generateJWT from "../utils/generateJWT";

const getAllUsers = asyncHandler(async (req: any, res: any) => {
	const users = await UserService.getAllUsers();
	res.send(users.rows);
});

const getUserById = asyncHandler(async (req, res) => {
	if (!req.params.id) throw new Error("Please specify a user ID.");

	const user = await UserService.getUserDetailsByID(parseInt(req.params.id));

	if (user) res.send(user);
	else res.status(404).send("No such user.");
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
	res.status(200).json("User logged out.");
});

const registerUser = asyncHandler(async (req, res) => {
	const { username, password, firstName, lastName, roleIds } = req.body;
	if (!username || !password || !firstName || !lastName)
		throw new Error(
			"Please include a username, password, first name, and last name."
		);
	const newUserDetails = await UserService.createUser(
		username,
		password,
		firstName,
		lastName,
		roleIds
	);
	generateJWT(res, newUserDetails);
	res.send(newUserDetails);
});

const getUserRoles = asyncHandler(async (req, res) => {
	if (!req.params.id) throw new Error("Please supply a user ID.");
	const userRoles = await UserService.getUserRoles(parseInt(req.params.id));
	res.send(userRoles);
});

const updateUserRoles = asyncHandler(async (req, res) => {
	const { newUserRoles }: { newUserRoles: Array<number> } = req.body;
	if (!newUserRoles)
		throw new Error(
			`Please provided an array of updated role IDs for user ${req.params.id}.`
		);

	const updatedRoles = await UserService.updateUserRoles(
		parseInt(req.params.id),
		newUserRoles
	);

	res.send(updatedRoles);
});

const deleteUser = asyncHandler(async (req, res) => {
	if (!req.params.id)
		throw new Error("Please supply the ID of the user to delete.");

	const deleteUserResult = await UserService.deleteUser(
		parseInt(req.params.id)
	);

	res.send(deleteUserResult);
});

export const UserController = {
	getAllUsers,
	getUserById,
	registerUser,
	authUser,
	logoutUser,
	deleteUser,
	getUserRoles,
	updateUserRoles,
};

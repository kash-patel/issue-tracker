import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { Request } from "express";
import { UserService } from "../services/userService";
import { UserDetails } from "../types";

const requireSignIn = asyncHandler(async (req: Request, res, next) => {
	const token = req.cookies.jwt;

	if (token) {
		try {
			const decoded: JwtPayload = jwt.verify(
				token,
				process.env.JWT_SECRET!
			) as JwtPayload;

			const userDetails: UserDetails = await UserService.getUserDetailsByID(
				decoded.userID
			);
			req.user = userDetails;
		} catch (error) {
			res.sendStatus(401);
			throw new Error("Unauthorized.");
		}
	} else {
		res.sendStatus(401);
		throw new Error("Unauthorized.");
	}

	next();
});

export const AuthHandler = {
	requireSignIn,
};

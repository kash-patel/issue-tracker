import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userService";
import { UserDetails } from "../types";

const requireResourcePermission = (
	resourceId: number,
	minimumResourcePermission: number
) => {
	return asyncHandler(
		async (req: Request, res: Response, next: NextFunction) => {
			const token = req.cookies.jwt;

			if (token) {
				try {
					const decoded: UserDetails = jwt.verify(
						token,
						process.env.JWT_SECRET!
					) as UserDetails;

					const userDetails: UserDetails | undefined = decoded;

					if (!userDetails)
						throw new Error(
							"Unauthorized: Please sign in to verify credentials."
						);

					let userHasRequiredResourcePermission: boolean = false;

					Object.values(userDetails.roles).forEach((role) => {
						if (
							resourceId.toString() in Object.keys(role.resourcePermissions) &&
							role.resourcePermissions[resourceId].permissionId >=
								minimumResourcePermission
						)
							userHasRequiredResourcePermission = true;
					});

					if (!userHasRequiredResourcePermission) {
						res.status(401);
						throw new Error("Unauthorized: Insufficient resource permissions.");
					}
				} catch (error) {
					throw error;
				}
			} else {
				res.status(401);
				throw new Error(
					"Unauthorized: Please sign in to verify your credentials."
				);
			}

			next();
		}
	);
};

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
			res.status(401);
			throw new Error("Unauthorized.");
		}
	} else {
		res.status(401);
		throw new Error("Unauthorized: No token.");
	}

	next();
});

export const AuthHandler = {
	requireResourcePermission,
	requireSignIn,
};

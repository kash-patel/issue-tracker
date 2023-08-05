import jwt, { JwtPayload } from "jsonwebtoken";
import asyncHandler from "express-async-handler";
import { NextFunction, Request, Response } from "express";
import { UserService } from "../services/userService";
import { UserDetails } from "../types";

const requirePermissions = (
	requiredPermissions: {
		[resourceId: number]: number;
	},
	canSendToOwn: boolean = false
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

					const userId: number | undefined = decoded.userId;

					if (!userId)
						throw new Error(
							"Unauthorized: Please sign in to verify credentials."
						);

					const userResourcePermissions: { [resourceId: number]: number } =
						await UserService.getUserResourcePermissions(userId);

					let userHasRequiredResourcePermissions: boolean = true;

					for (const resourceId of Object.keys(requiredPermissions)) {
						if (
							!userResourcePermissions.hasOwnProperty(resourceId) ||
							userResourcePermissions[parseInt(resourceId)] <
								requiredPermissions[parseInt(resourceId)]
						)
							userHasRequiredResourcePermissions = false;
					}

					const sendingToOwn: boolean =
						canSendToOwn && userId == parseInt(req.params.id);

					if (!userHasRequiredResourcePermissions && !sendingToOwn) {
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
	requirePermissions,
	requireSignIn,
};

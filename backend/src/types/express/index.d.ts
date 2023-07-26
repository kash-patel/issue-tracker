import { Request } from "express";
import { UserDetails } from "..";

export {};

declare global {
	namespace Express {
		export interface Request {
			user?: UserDetails;
		}
	}
}

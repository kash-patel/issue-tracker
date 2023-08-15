import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "../constants";

const baseQuery = fetchBaseQuery({
	baseUrl: Constants.BASE_URL,
	credentials: "include",
	// prepareHeaders: (headers) => {
	// 	const token = localStorage.getItem("userDetails");
	// 	if (token) {
	// 		headers.set("Authorization", `Bearer ${token}`);
	// 		headers.set("Content-type", "application/json");
	// 	}

	// 	return headers;
	// },
});

export const apiSlice = createApi({
	baseQuery,
	tagTypes: [
		"Department",
		"Role",
		"User",
		"Location",
		"System",
		"Species",
		"Animal",
		"Vehicle",
		"Issue",
	],
	endpoints: () => ({}),
});

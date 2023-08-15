import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Constants from "../constants";

const baseQuery = fetchBaseQuery({
	baseUrl: Constants.BASE_URL,
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

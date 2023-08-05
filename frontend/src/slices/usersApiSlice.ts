import { apiSlice } from "./apiSlice";
import Constants from "../constants";

export const usersApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		login: builder.mutation({
			query: (data) => ({
				url: `${Constants.USERS_URL}/login`,
				method: "POST",
				body: data,
			}),
		}),
		logout: builder.mutation({
			query: () => ({
				url: `${Constants.USERS_URL}/logout`,
				method: "POST",
			}),
		}),
		getAccessibleResources: builder.query({
			query: (id) => ({
				url: `${Constants.USERS_URL}/${id}/resources`,
				method: "GET",
			}),
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useGetAccessibleResourcesQuery,
} = usersApiSlice;

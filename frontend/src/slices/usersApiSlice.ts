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
	}),
});

export const { useLoginMutation, useLogoutMutation } = usersApiSlice;

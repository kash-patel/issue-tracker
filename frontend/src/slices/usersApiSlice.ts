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
		list: builder.query({
			query: () => ({
				url: Constants.USERS_URL,
				method: "GET",
			}),
		}),
	}),
});

export const { useLoginMutation, useLogoutMutation, useListQuery } =
	usersApiSlice;

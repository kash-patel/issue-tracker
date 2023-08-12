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
		getUsers: builder.query({
			query: () => ({
				url: Constants.USERS_URL,
				method: "GET",
			}),
			providesTags: ["User"],
		}),
		getUserById: builder.query({
			query: (id) => ({
				url: `${Constants.USERS_URL}/${id}`,
				method: "GET",
			}),
			providesTags: ["User"],
		}),
		getUserRoles: builder.query({
			query: (id) => ({
				url: `${Constants.USERS_URL}/${id}/roles`,
				method: "GET",
			}),
			providesTags: ["User"],
		}),
		getAccessibleResources: builder.query({
			query: (id) => ({
				url: `${Constants.USERS_URL}/${id}/resources`,
				method: "GET",
			}),
		}),
		createUser: builder.mutation({
			query: ({ username, password, firstName, lastName, roleIds }) => ({
				url: `${Constants.USERS_URL}`,
				method: "POST",
				body: { username, password, firstName, lastName, roleIds },
			}),
			invalidatesTags: ["User"],
		}),
		updateUserRoles: builder.mutation({
			query: ({ id, newUserRoles }) => ({
				url: `${Constants.USERS_URL}/${id}/roles`,
				method: "PATCH",
				body: { newUserRoles },
			}),
			invalidatesTags: ["User"],
		}),
		deleteUser: builder.mutation({
			query: (id) => ({
				url: `${Constants.USERS_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["User"],
		}),
	}),
});

export const {
	useLoginMutation,
	useLogoutMutation,
	useGetUsersQuery,
	useGetUserByIdQuery,
	useGetUserRolesQuery,
	useGetAccessibleResourcesQuery,
	useCreateUserMutation,
	useUpdateUserRolesMutation,
	useDeleteUserMutation,
} = usersApiSlice;

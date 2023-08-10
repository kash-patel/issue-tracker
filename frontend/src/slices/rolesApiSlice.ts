import { apiSlice } from "./apiSlice";
import Constants from "../constants";

export const rolesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRoles: builder.query({
			query: () => ({
				url: `${Constants.ROLES_URL}`,
				method: "GET",
			}),
			providesTags: ["Role"],
		}),
		getRoleById: builder.query({
			query: (id) => ({
				url: `${Constants.ROLES_URL}/${id}`,
				method: "GET",
			}),
			providesTags: ["Role"],
		}),
		getRoleResourcePermissions: builder.query({
			query: (id) => ({
				url: `${Constants.ROLES_URL}/${id}/permissions`,
				method: "GET",
			}),
			providesTags: ["Role"],
		}),
		updateRole: builder.mutation({
			query: ({ id, newName, newResourcePermissions }) => ({
				url: `${Constants.ROLES_URL}/${id}`,
				method: "PATCH",
				body: { name: newName, resourcePermissions: newResourcePermissions },
			}),
			invalidatesTags: ["Role"],
		}),
		createRole: builder.mutation({
			query: ({ name, departmentId, resourcePermissions }) => ({
				url: `${Constants.ROLES_URL}`,
				method: "POST",
				body: {
					name: name,
					departmentId: departmentId,
					resourcePermissions: resourcePermissions,
				},
			}),
			invalidatesTags: ["Role"],
		}),
		deleteRole: builder.mutation({
			query: (id) => ({
				url: `${Constants.ROLES_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Role"],
		}),
	}),
});

export const {
	useGetRolesQuery,
	useGetRoleByIdQuery,
	useGetRoleResourcePermissionsQuery,
	useUpdateRoleMutation,
	useCreateRoleMutation,
	useDeleteRoleMutation,
} = rolesApiSlice;

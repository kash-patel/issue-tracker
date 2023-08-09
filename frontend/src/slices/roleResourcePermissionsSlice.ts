import { apiSlice } from "./apiSlice";
import Constants from "../constants";

export const roleResourcePermissionsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getRoleResourcePermissions: builder.query({
			query: () => ({
				url: `${Constants.ROLE_RESOURCE_PERMISSIONS_URL}`,
				method: "GET",
			}),
			providesTags: ["Role"],
		}),
		getRoleResourcePermissionById: builder.query({
			query: (id) => ({
				url: `${Constants.ROLE_RESOURCE_PERMISSIONS_URL}/${id}`,
				method: "GET",
			}),
			providesTags: ["Role"],
		}),
		updateRoleResourcePermission: builder.mutation({
			query: (id) => ({
				url: `${Constants.ROLE_RESOURCE_PERMISSIONS_URL}/${id}`,
				method: "PATCH",
			}),
			invalidatesTags: ["Role"],
		}),
		createRoleResourcePermission: builder.mutation({
			query: (body) => ({
				url: `${Constants.ROLE_RESOURCE_PERMISSIONS_URL}`,
				method: "POST",
				body: body,
			}),
			invalidatesTags: ["Role"],
		}),
		deleteRoleResourcePermission: builder.mutation({
			query: (id) => ({
				url: `${Constants.ROLE_RESOURCE_PERMISSIONS_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Role"],
		}),
	}),
});

export const {
	useGetRoleResourcePermissionsQuery,
	useGetRoleResourcePermissionByIdQuery,
	useCreateRoleResourcePermissionMutation,
	useUpdateRoleResourcePermissionMutation,
	useDeleteRoleResourcePermissionMutation,
} = roleResourcePermissionsApiSlice;

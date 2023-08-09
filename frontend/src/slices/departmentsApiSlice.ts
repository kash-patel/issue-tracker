import { apiSlice } from "./apiSlice";
import Constants from "../constants";

export const departmentsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getDepartments: builder.query({
			query: () => ({
				url: `${Constants.DEPARTMENTS_URL}`,
				method: "GET",
			}),
			providesTags: ["Department"],
		}),
		getDepartmentById: builder.query({
			query: (id) => ({
				url: `${Constants.DEPARTMENTS_URL}/${id}`,
				method: "GET",
			}),
			providesTags: ["Department"],
		}),
		getDepartmentRoles: builder.query({
			query: (departmentsId) => ({
				url: `${Constants.DEPARTMENTS_URL}/${departmentsId}/roles`,
				method: "GET",
			}),
			providesTags: ["Role"],
		}),
		createDepartment: builder.mutation({
			query: (body) => ({
				url: `${Constants.DEPARTMENTS_URL}`,
				method: "POST",
				body: body,
			}),
			invalidatesTags: ["Department"],
		}),
		deleteDepartment: builder.mutation({
			query: (id) => ({
				url: `${Constants.DEPARTMENTS_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Department"],
		}),
	}),
});

export const {
	useGetDepartmentsQuery,
	useGetDepartmentByIdQuery,
	useGetDepartmentRolesQuery,
	useCreateDepartmentMutation,
	useDeleteDepartmentMutation,
} = departmentsApiSlice;

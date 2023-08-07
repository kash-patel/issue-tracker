import { apiSlice } from "./apiSlice";
import Constants from "../constants";

export const vehiclesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getVehicles: builder.query({
			query: () => ({
				url: `${Constants.VEHICLES_URL}`,
				method: "GET",
			}),
			providesTags: ["Vehicle"],
		}),
		createVehicle: builder.mutation({
			query: (body) => ({
				url: `${Constants.VEHICLES_URL}`,
				method: "POST",
				body: body,
			}),
			invalidatesTags: ["Vehicle"],
		}),
		deleteVehicle: builder.mutation({
			query: (id: number) => ({
				url: `${Constants.VEHICLES_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Vehicle"],
		}),
	}),
});

export const {
	useGetVehiclesQuery,
	useCreateVehicleMutation,
	useDeleteVehicleMutation,
} = vehiclesApiSlice;

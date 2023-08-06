import { apiSlice } from "./apiSlice";
import Constants from "../constants";

export const vehiclesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getVehicles: builder.query({
			query: () => ({
				url: `${Constants.VEHICLES_URL}`,
				method: "GET",
			}),
		}),
		addVehicle: builder.mutation({
			query: (vehicleData) => ({
				url: `${Constants.VEHICLES_URL}`,
				method: "POST",
				body: vehicleData,
			}),
		}),
		deleteVehicle: builder.mutation({
			query: (id) => ({
				url: `${Constants.VEHICLES_URL}/${id}`,
				method: "DELETE",
			}),
		}),
	}),
});

export const {
	useGetVehiclesQuery,
	useAddVehicleMutation,
	useDeleteVehicleMutation,
} = vehiclesApiSlice;

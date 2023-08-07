import { apiSlice } from "./apiSlice";
import Constants from "../constants";

export const speciesApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getSpecies: builder.query({
			query: () => ({
				url: `${Constants.SPECIES_URL}`,
				method: "GET",
			}),
			providesTags: ["Species"],
		}),
		createSpecies: builder.mutation({
			query: (body) => ({
				url: `${Constants.SPECIES_URL}`,
				method: "POST",
				body: body,
			}),
			invalidatesTags: ["Species"],
		}),
		deleteSpecies: builder.mutation({
			query: (id: number) => ({
				url: `${Constants.SPECIES_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Species"],
		}),
	}),
});

export const {
	useGetSpeciesQuery,
	useCreateSpeciesMutation,
	useDeleteSpeciesMutation,
} = speciesApiSlice;

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
		getSpeciesById: builder.query({
			query: (id) => ({
				url: `${Constants.SPECIES_URL}/${id}`,
				method: "GET",
			}),
			providesTags: ["Species"],
		}),
		getSpeciesIndividuals: builder.query({
			query: (speciesId) => ({
				url: `${Constants.SPECIES_URL}/${speciesId}/individuals`,
				method: "GET",
			}),
			providesTags: ["Animal"],
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
			query: (id) => ({
				url: `${Constants.SPECIES_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Species"],
		}),
	}),
});

export const {
	useGetSpeciesQuery,
	useGetSpeciesByIdQuery,
	useGetSpeciesIndividualsQuery,
	useCreateSpeciesMutation,
	useDeleteSpeciesMutation,
} = speciesApiSlice;

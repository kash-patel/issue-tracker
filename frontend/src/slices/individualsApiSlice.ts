import { apiSlice } from "./apiSlice";
import Constants from "../constants";

export const individualsApiSlice = apiSlice.injectEndpoints({
	endpoints: (builder) => ({
		getIndividuals: builder.query({
			query: () => ({
				url: `${Constants.ANIMALS_URL}`,
				method: "GET",
			}),
			providesTags: ["Animal"],
		}),
		createIndividual: builder.mutation({
			query: (body) => ({
				url: `${Constants.ANIMALS_URL}`,
				method: "POST",
				body: body,
			}),
			invalidatesTags: ["Animal"],
		}),
		deleteIndividual: builder.mutation({
			query: (id: number) => ({
				url: `${Constants.ANIMALS_URL}/${id}`,
				method: "DELETE",
			}),
			invalidatesTags: ["Animal"],
		}),
	}),
});

export const {
	useGetIndividualsQuery,
	useCreateIndividualMutation,
	useDeleteIndividualMutation,
} = individualsApiSlice;

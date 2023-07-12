import { api } from "./api";

const TAG = "";
const route = "utils";

export const utilsApi = api.injectEndpoints({
	endpoints: (build) => ({
		getCounts: build.query({
			query: () => `/${route}/counts`,
			providesTags: ["Product", "User", "Sale", "Category"],
		}),
		createSalesByRange: build.mutation({
			query: (data) => ({
				url: `/${route}/sales-by-range`,
				method: "POST",
				body: data,
			}),
		}),
	}),
});

export const { useGetCountsQuery, useCreateSalesByRangeMutation } =
	utilsApi;

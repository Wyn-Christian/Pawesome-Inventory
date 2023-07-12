import { api } from "./api";

const TAG = "Sale";
const route = "sale";

export const saleApi = api.injectEndpoints({
	endpoints: (build) => ({
		getSales: build.query({
			query: () => `/sales`,
			providesTags: (result = [], error, arg) => [
				TAG,
				...result.map(({ id }) => ({ type: TAG, id })),
			],
		}),
		getSale: build.query({
			query: (id) => `/${route}/${id}`,
			providesTags: (result, error, arg) => [{ type: TAG, id: arg }],
		}),
		createSale: build.mutation({
			query: (data) => ({
				url: `/${route}/create`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: [TAG],
		}),
		updateSale: build.mutation({
			query: ({ id, product }) => ({
				url: `/${route}/${id}/update`,
				method: "PATCH",
				body: product,
			}),
			invalidatesTags: (result, error, arg) => [{ type: TAG, id: arg.id }],
		}),
		deleteSale: build.mutation({
			query: (id) => ({
				url: `/${route}/${id}/delete`,
				method: "DELETE",
			}),
			invalidatesTags: [TAG],
		}),
	}),
});

export const {
	useGetSalesQuery,
	useGetSaleQuery,
	useCreateSaleMutation,
	useUpdateSaleMutation,
	useDeleteSaleMutation,
} = saleApi;

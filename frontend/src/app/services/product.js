import { api } from "./api";

const TAG = "Product";
const route = "product";

export const productApi = api.injectEndpoints({
	endpoints: (build) => ({
		getProducts: build.query({
			query: () => `/products`,
			providesTags: (result = [], error, arg) => [
				TAG,
				...result.map(({ id }) => ({ type: TAG, id })),
			],
		}),
		getProduct: build.query({
			query: (id) => `/${route}/${id}`,
			providesTags: (result, error, arg) => [{ type: TAG, id: arg }],
		}),
		createProduct: build.mutation({
			query: (data) => ({
				url: `/${route}/create`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: [TAG],
		}),
		updateProduct: build.mutation({
			query: ({ id, product }) => ({
				url: `/${route}/${id}/update`,
				method: "PATCH",
				body: product,
			}),
			invalidatesTags: (result, error, arg) => [{ type: TAG, id: arg.id }],
		}),
		deleteProduct: build.mutation({
			query: (id) => ({
				url: `/${route}/${id}/delete`,
				method: "DELETE",
			}),
			invalidatesTags: [TAG],
		}),
	}),
});

export const {
	useGetProductsQuery,
	useGetProductQuery,
	useCreateProductMutation,
	useUpdateProductMutation,
	useDeleteProductMutation,
} = productApi;

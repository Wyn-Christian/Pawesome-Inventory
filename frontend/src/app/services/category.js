import { api } from "./api";

const TAG = "Category";
const route = "category";

export const categoryApi = api.injectEndpoints({
	endpoints: (build) => ({
		getCategories: build.query({
			query: () => `/categories`,
			providesTags: (result = [], error, arg) => [
				TAG,
				...result.map(({ id }) => ({ type: TAG, id })),
			],
		}),
		getCategory: build.query({
			query: (id) => `/${route}/${id}`,
			providesTags: (result, error, arg) => [{ type: TAG, id: arg }],
		}),
		createCategory: build.mutation({
			query: (data) => ({
				url: `/${route}/create`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: [TAG],
		}),
		updateCategory: build.mutation({
			query: ({ id, name }) => ({
				url: `/${route}/${id}/update`,
				method: "PATCH",
				body: { name: name },
			}),
			invalidatesTags: (result, error, arg) => [{ type: TAG, id: arg.id }],
		}),
		deleteCategory: build.mutation({
			query: (id) => ({
				url: `/${route}/${id}/delete`,
				method: "DELETE",
			}),
			invalidatesTags: [TAG],
		}),
	}),
});

export const {
	useGetCategoriesQuery,
	useGetCategoryQuery,
	useCreateCategoryMutation,
	useUpdateCategoryMutation,
	useDeleteCategoryMutation,
} = categoryApi;

import { api } from "./api";

const TAG = "Media";
const route = "media";

export const mediaApi = api.injectEndpoints({
	endpoints: (build) => ({
		getMedias: build.query({
			query: () => `/medias`,
			providesTags: (result = [], error, arg) => [
				TAG,
				...result.map(({ id }) => ({ type: TAG, id })),
			],
		}),
		getMedia: build.query({
			query: (id) => `/${route}/${id}`,
			providesTags: (result, error, arg) => [{ type: TAG, id: arg }],
		}),
		createMedia: build.mutation({
			query: (data) => ({
				url: `/${route}/create`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: [TAG],
		}),
		deleteMedia: build.mutation({
			query: (id) => ({
				url: `/${route}/${id}/delete`,
				method: "DELETE",
			}),
			invalidatesTags: [TAG],
		}),
	}),
});

export const {
	useGetMediasQuery,
	useGetMediaQuery,
	useCreateMediaMutation,
	useDeleteMediaMutation,
} = mediaApi;

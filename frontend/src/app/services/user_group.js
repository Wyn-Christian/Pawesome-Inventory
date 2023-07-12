import { api } from "./api";

const TAG = "User Group";
const route = "user-group";

export const userGroupApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUserGroups: build.query({
			query: () => `/user-groups`,
			providesTags: (result = [], error, arg) => [
				TAG,
				...result.map(({ id }) => ({ type: TAG, id })),
			],
		}),
		getUserGroup: build.query({
			query: (id) => `/${route}/${id}`,
			providesTags: (result, error, arg) => [{ type: TAG, id: arg }],
		}),
		createUserGroup: build.mutation({
			query: (data) => ({
				url: `/${route}/create`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: [TAG],
		}),
		updateUserGroup: build.mutation({
			query: ({ id, product }) => ({
				url: `/${route}/${id}/update`,
				method: "PATCH",
				body: product,
			}),
			invalidatesTags: (result, error, arg) => [{ type: TAG, id: arg.id }],
		}),
		deleteUserGroup: build.mutation({
			query: (id) => ({
				url: `/${route}/${id}/delete`,
				method: "DELETE",
			}),
			invalidatesTags: [TAG],
		}),
	}),
});

export const {
	useGetUserGroupsQuery,
	useGetUserGroupQuery,
	useCreateUserGroupMutation,
	useUpdateUserGroupMutation,
	useDeleteUserGroupMutation,
} = userGroupApi;

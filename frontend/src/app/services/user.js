import { api } from "./api";

const TAG = "User";
const route = "user";

export const userApi = api.injectEndpoints({
	endpoints: (build) => ({
		getUsers: build.query({
			query: () => `/users`,
			providesTags: (result = [], error, arg) => [
				TAG,
				...result.map(({ id }) => ({ type: TAG, id })),
			],
		}),
		getUser: build.query({
			query: (id) => `/user/${id}`,
			providesTags: (result, error, arg) => [{ type: TAG, id: arg }],
		}),
		loginUser: build.mutation({
			query: (input) => ({
				url: `/${route}/login`,
				method: "POST",
				body: input,
			}),
			invalidatesTags: [TAG],
		}),
		signUpUser: build.mutation({
			query: (data) => ({
				url: `/${route}/create`,
				method: "POST",
				body: data,
			}),
			invalidatesTags: [TAG],
		}),
		updateUser: build.mutation({
			query: ({ id, user }) => ({
				url: `/${route}/${id}/update`,
				method: "POST",
				body: user,
			}),
			invalidatesTags: (result, error, arg) => [{ type: TAG, id: arg.id }],
		}),
		deleteUser: build.mutation({
			query: (id) => ({
				url: `/${route}/${id}/delete`,
				method: "DELETE",
			}),
			invalidatesTags: [TAG],
		}),
	}),
});

export const {
	useGetUsersQuery,
	useGetUserQuery,
	useLoginUserMutation,
	useSignUpUserMutation,
	useUpdateUserMutation,
	useDeleteUserMutation,
} = userApi;

import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./features/userSlice";
import { api } from "./services/api";

export default configureStore({
	reducer: {
		[api.reducerPath]: api.reducer,
		user: userReducer,
	},
	middleware: (getDefaultMiddleware) =>
		getDefaultMiddleware().concat(api.middleware),
});

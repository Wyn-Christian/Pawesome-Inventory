import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
	name: "user",
	initialState: {
		id: "",
		username: "",
	},
	reducers: {
		setUser(state, action) {
			state = { ...action.payload };
			return state;
		},
		removeUser(state) {
			return {};
		},
	},
});

export default userSlice.reducer;

export const { setUser, removeUser } = userSlice.actions;

export const userSelector = (state) => state.user;

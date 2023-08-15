import { createSlice } from "@reduxjs/toolkit";

const initialState = {
	userDetails: localStorage.getItem("userDetails")
		? JSON.parse(localStorage.getItem("userDetails")!)
		: null,
};

const authSlice = createSlice({
	name: "auth",
	initialState: initialState,
	reducers: {
		setCredentials: (state, action) => {
			state.userDetails = action.payload;
			localStorage.setItem("userDetails", JSON.stringify(action.payload));
		},
		clearCredentials: (state) => {
			state.userDetails = null;
			localStorage.removeItem("userDetails");
		},
	},
});

export const { setCredentials, clearCredentials } = authSlice.actions;
export default authSlice.reducer;

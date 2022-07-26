import { createSlice } from "@reduxjs/toolkit";

export interface loginStatusState {
	state?: true | false;
	admin?: true | false;
}

const initialState: loginStatusState = {};

export const loginStatusSlice = createSlice({
	name: "loginStatus",
	initialState,
	reducers: {
		changeLoginStatus: (state, action) => ({
			...state,
			...action.payload,
		}),
	},
});

// Action creators are generated for each case reducer function
export const { changeLoginStatus } = loginStatusSlice.actions;

export const selectCurrentLoginStatus = (state) => state.loginStatus;

export default loginStatusSlice.reducer;

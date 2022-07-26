import { createSlice } from "@reduxjs/toolkit";

export interface toggleStatusState {
	toggle?: true | false;
}

const initialState: toggleStatusState = {
	toggle: true,
};

export const toggleStatusSlice = createSlice({
	name: "toggleStatus",
	initialState,
	reducers: {
		changeToggleStatus: (state, action) => ({
			...state,
			...action.payload,
		}),
	},
});

// Action creators are generated for each case reducer function
export const { changeToggleStatus } = toggleStatusSlice.actions;

export const selectCurrentToggleStatus = (state) => state.toggleStatus;

export default toggleStatusSlice.reducer;

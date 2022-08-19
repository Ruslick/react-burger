import { createSlice } from "@reduxjs/toolkit";

export const currentIngridientSlice = createSlice({
	name: "currentIngridient",
	initialState: {
		currentIngridient: null,
	},
	reducers: {
		setCurrentIngridient: {
			reducer: (state, { payload }) => {
				state.currentIngridient = payload;
			},
		},
		removeCurrentIngridient: {
			reducer: (state) => {
				state.currentIngridient = null;
			},
		},
	},
});

export const { setCurrentIngridient, removeCurrentIngridient } =
	currentIngridientSlice.actions;

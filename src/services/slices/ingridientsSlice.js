import { createSlice } from "@reduxjs/toolkit";
import { getIngridientsFetch } from "../requests";

export const ingridientsSlice = createSlice({
	name: "ingridients",
	initialState: {
		status: "idle",
		error: null,
		ingridients: [],
	},
	reducers: {},
	extraReducers: {
		[getIngridientsFetch.pending]: (state) => {
			state.status = "loading";
		},
		[getIngridientsFetch.fulfilled]: (state, { payload }) => {
			state.status = "received";
			state.ingridients = payload;
		},
		[getIngridientsFetch.rejected]: (state, { payload }) => {
			state.status = "failed";
			state.error = payload;
		},
	},
});
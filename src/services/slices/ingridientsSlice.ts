import { createSlice } from "@reduxjs/toolkit";
import { IIngridient } from "../../utils/types";
import { getIngridientsFetch } from "../requests";

interface IState {
	status: string;
	error?: string;
	ingridients: IIngridient[];
}

const initialState: IState = {
	status: "idle",
	error: undefined,
	ingridients: [],
};

export const ingridientsSlice = createSlice({
	name: "ingridients",
	initialState,
	reducers: {},
	extraReducers(builder) {
		builder
			.addCase(getIngridientsFetch.pending, (state) => {
				state.status = "loading";
			})
			.addCase(getIngridientsFetch.fulfilled, (state, { payload }) => {
				state.status = "received";
				state.ingridients = payload as IIngridient[];
			})
			.addCase(getIngridientsFetch.rejected, (state, { payload }) => {
				state.status = "failed";
				state.error = payload as string;
			});
	},
});

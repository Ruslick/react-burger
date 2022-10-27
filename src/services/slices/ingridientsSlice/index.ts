import { Action, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IIngridient } from "../../../utils/types";
import { getIngridientsFetch } from "../../requests";

interface IState {
	status: "idle" | "loading" | "received" | "failed";
	error: string;
	ingridients: IIngridient[];
}

const initialState: IState = {
	status: "idle",
	error: '',
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
				state.ingridients = [];
				state.error = ''
				
			})
			.addCase(getIngridientsFetch.fulfilled, (state, { payload }: PayloadAction<IIngridient[]>) => {
				state.status = "received";
				state.ingridients = payload;
				state.error = ''

			})
			.addCase(getIngridientsFetch.rejected, (state, {error}) => {
				error.message
				? (state.error = error.message)
				: (state.error = "fetch error");
				state.status = "failed";
				state.ingridients = []

			});
	},
});

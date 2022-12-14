import { createSlice } from "@reduxjs/toolkit";
import { v1 as getRandomId } from "uuid";
import { calcTotalPrice } from "../../../utils";
import { IIngridient, IOrder } from "../../../utils/types";
import { postOrderFetch } from "../../requests";

interface IState {
	status: string;
	error?: string;
	order?: IOrder;
	currentBun?: IIngridient;
	orderIngridients: IIngridient[];
	reserveOrderIngridients: IIngridient[];
	totalPrice: number;
	currentOrder?: number;
}

const initialState: IState = {
	status: "idle",
	error: undefined,
	order: undefined,
	currentBun: undefined,

	orderIngridients: [],
	reserveOrderIngridients: [],

	totalPrice: 0,
	currentOrder: undefined,
};

export const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		addOrderIngridient(state, { payload }) {
			state.orderIngridients.push({ ...payload, _number: getRandomId() });
			state.totalPrice = calcTotalPrice(state.orderIngridients);
		},
		removeOrderIngridient(state, { payload }) {
			state.orderIngridients = state.orderIngridients.filter(
				(ingridient) => ingridient._number !== payload._number
			);

			state.totalPrice = calcTotalPrice(state.orderIngridients);
		},
		switchBun(state, { payload }) {
			state.currentBun = payload;
			state.orderIngridients = state.orderIngridients
				.filter((el) => el.type !== "bun")
				.concat([{ ...payload }, { ...payload }]);
			state.totalPrice = calcTotalPrice(state.orderIngridients);
		},
		updateOrderIngridients(state, { payload }) {
			state.orderIngridients = payload.newOrderIngridients;
		},
		backupOrderIngridients(state) {
			state.orderIngridients = state.reserveOrderIngridients;
		},
		makeReserveOrderIngridients(state) {
			state.reserveOrderIngridients = state.orderIngridients;
		},
		clearReserveOrderIngridients(state) {
			state.reserveOrderIngridients = [];
		},
		resetOrder() {
			return { ...initialState };
		},
		setCurrentOrder(state, { payload }) {
			state.currentOrder = payload;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(postOrderFetch.pending, (state) => {
				state.status = "loading";
			})
			.addCase(postOrderFetch.fulfilled, (state, { payload }) => {
				state.status = "received";
				state.error = undefined;
				state.order = payload.order;
				state.orderIngridients = [];
				state.currentBun = undefined;
			})
			.addCase(postOrderFetch.rejected, (state, { error }: any) => {
				return {
					...initialState,
					status: "failed",
					error: error.message ? error.message : "fetch error",
				};
			});
	},
});

export const {
	switchBun,
	removeOrderIngridient,
	addOrderIngridient,
	updateOrderIngridients,
	backupOrderIngridients,
	makeReserveOrderIngridients,
	clearReserveOrderIngridients,
	resetOrder,
	setCurrentOrder,
} = orderSlice.actions;

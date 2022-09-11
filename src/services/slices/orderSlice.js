import { createSlice } from "@reduxjs/toolkit";
import { v1 as getRandomId } from "uuid";
import { postOrderFetch } from "../requests";

const calcTotalPrice = (ingridients) =>
	ingridients.reduce((prev, cur) => (prev += cur.price), 0);

const initialState = {
	status: "notSended",
	error: null,
	order: {},

	currentBun: null,

	orderIngridients: [],
	reserveOrderIngridients: [],

	totalPrice: 0,
	isOpenedModal: false,
};

export const orderSlice = createSlice({
	name: "order",
	initialState,
	reducers: {
		addOrderIngridient: {
			reducer: (state, { payload }) => {
				state.orderIngridients.push({ ...payload, _number: getRandomId() });
				state.totalPrice = calcTotalPrice(state.orderIngridients);
			},
		},
		removeOrderIngridient: {
			reducer: (state, { payload }) => {
				state.orderIngridients = state.orderIngridients.filter(
					(ingridient) => ingridient._number !== payload._number
				);

				state.totalPrice = calcTotalPrice(state.orderIngridients);
			},
		},
		switchBun: {
			reducer: (state, { payload }) => {
				state.currentBun = payload;
				state.orderIngridients = state.orderIngridients
					.filter((el) => el.type !== "bun")
					.concat([{ ...payload }, { ...payload }]);
				state.totalPrice = calcTotalPrice(state.orderIngridients);
			},
		},

		updateOrderIngridients: {
			reducer: (state, { payload }) => {
				state.orderIngridients = payload.newOrderIngridients;
			},
		},
		backupOrderIngridients: {
			reducer: (state) => {
				state.orderIngridients = state.reserveOrderIngridients;
			},
		},
		makeReserveOrderIngridients: {
			reducer: (state) => {
				state.reserveOrderIngridients = state.orderIngridients;
			},
		},
		clearReserveOrderIngridients: {
			reducer: (state) => {
				state.reserveOrderIngridients = [];
			},
		},
		resetOrder: {
			reducer: () => {
				return { ...initialState };
			},
		},
	},
	extraReducers: {
		[postOrderFetch.pending]: (state) => {
			state.status = "loading";
		},
		[postOrderFetch.fulfilled]: (state, { payload }) => {
			state.status = "sended";
			state.order = payload.order;
			state.orderIngridients = [];
			state.currentBun = null;
		},
		[postOrderFetch.rejected]: (state, { payload }) => {
			state.status = "failed";
			state.error = payload;
			state.orderIngridients = [];
			state.currentBun = null;
		},
	},
});

export const {
	closeModal,
	openModal,
	switchBun,
	removeOrderIngridient,
	addOrderIngridient,
	updateOrderIngridients,
	backupOrderIngridients,
	makeReserveOrderIngridients,
	clearReserveOrderIngridients,
	resetOrder,
} = orderSlice.actions;

import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v1 as getRandomId } from "uuid";
import { IIngridient, IOrder} from "../../utils/types";
import { postOrderFetch } from "../requests";

const calcTotalPrice = (ingridients: IIngridient[]) =>
	ingridients.reduce((prev, cur) => (prev += cur.price), 0);



interface IState {
	status: string;
	error?: string;
	order?: IOrder;
	currentBun?: IIngridient;
	orderIngridients: IIngridient[];
	reserveOrderIngridients: IIngridient[];
	totalPrice: number;
	isOpenedModal: boolean;
}

const initialState: IState = {
	status: "idle",
	error: undefined,
	order: undefined,
	currentBun: undefined,

	orderIngridients: [],
	reserveOrderIngridients: [],

	totalPrice: 0,
	isOpenedModal: false,
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
	},
	extraReducers(builder) {
		builder
		.addCase(postOrderFetch.pending, (state) => {
			state.status = "loading";
		})
		.addCase(postOrderFetch.fulfilled, (state, { payload }) => {
			state.status = "received";
			state.order = payload.order;
			state.orderIngridients = [];
			state.currentBun = undefined;
		})
		.addCase(postOrderFetch.rejected, (state, { payload }: PayloadAction<any>) => {
			state.status = "failed";
			state.error = payload;
			state.orderIngridients = [];
			state.currentBun = undefined;
		})
	}
})
	
		

export const {
	switchBun,
	removeOrderIngridient,
	addOrderIngridient,
	updateOrderIngridients,
	backupOrderIngridients,
	makeReserveOrderIngridients,
	clearReserveOrderIngridients,
	resetOrder,
} = orderSlice.actions;

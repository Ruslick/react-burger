import { setupStore } from "../..";
import { postOrderFetch } from "../../requests";

describe("post order fetch", () => {
	test("check empty store", async () => {
		// 	const store = setupStore();
		// 	expect(store.getState().ingridientsSlice.ingridients).toEqual([]);
	});

	test("pending", async () => {
		const store = setupStore();

		await store.dispatch({
			type: postOrderFetch.pending.type,
		});
		expect(store.getState().orderSlice).toEqual({
			status: "loading",
			error: undefined,
			order: undefined,
			currentBun: undefined,

			orderIngridients: [],
			reserveOrderIngridients: [],

			totalPrice: 0,
			currentOrder: undefined,
		});
	});

	test("success", async () => {
		const store = setupStore();
    
		await store.dispatch({
			type: postOrderFetch.fulfilled.type,
      payload: {order: 'test'}
		});
		expect(store.getState().orderSlice).toEqual({
			status: "received",
			error: undefined,
			order: 'test',
			currentBun: undefined,
			orderIngridients: [],
			reserveOrderIngridients: [],
			totalPrice: 0,
			currentOrder: undefined,
		});
	});
  test("failed", async () => {
		const store = setupStore();
    
		await store.dispatch({
			type: postOrderFetch.rejected.type,
      error: {message: 'message error'}
		});
		expect(store.getState().orderSlice).toEqual({
			status: "failed",
			error: 'message error',
			order: undefined,
			currentBun: undefined,  
			orderIngridients: [],
			reserveOrderIngridients: [],
			totalPrice: 0,
			currentOrder: undefined,
		});
	});
});

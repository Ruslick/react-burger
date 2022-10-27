import { setupStore } from "../..";
import { getIngridientsFetch } from "../../requests";

describe("ingridientsSlice", () => {
	test("check empty store", async () => {
		const store = setupStore();
		expect(store.getState().ingridientsSlice).toEqual({
			ingridients: [],
			error: "",
			status: "idle",
		});
	});

	test("check success", async () => {
		const store = setupStore();

		await store.dispatch({
			type: getIngridientsFetch.fulfilled.type,
			payload: ["i1", "i2"],
		});

		expect(store.getState().ingridientsSlice).toEqual({
			ingridients: ["i1", "i2"],
			error: "",
			status: "received",
		});
	});

	test("check falied", async () => {
		const store = setupStore();
		await store.dispatch({
			type: getIngridientsFetch.rejected.type,
			error: {message: "error message"},
		});

		expect(store.getState().ingridientsSlice).toEqual({
			ingridients: [],
			error: "error message",
			status: "failed",
		});
	});

	test("check pending", async () => {
		const store = setupStore();
		await store.dispatch({
			type: getIngridientsFetch.pending.type,
		});

		expect(store.getState().ingridientsSlice).toEqual({
			ingridients: [],
			error: "",
			status: "loading",
		});
	});
});

import { closeWs, errorWs, messageWs, openWs } from ".";
import { setupStore } from "../..";
import { getIngridientsFetch } from "../../requests";

describe("sockerSlice", () => {
	test("check empty store", async () => {
		const store = setupStore();
		expect(store.getState().socketSlice).toEqual({
      isConnected: false,
      socketData: null,
      error: false,
    });
	});



	test("messageWs", async () => {
		const store = setupStore();

		await store.dispatch({
			type: messageWs.type,
			payload: {success: true, data: 'test'},
		});

		expect(store.getState().socketSlice).toEqual({
      isConnected: true,
      socketData: {success: true, data: 'test'},
      error: false,
    });
	});

  test("closeWs and openWs", async () => {
		const store = setupStore();

		await store.dispatch({
			type: openWs.type,
		});

		expect(store.getState().socketSlice).toEqual({
      isConnected: true,
      socketData: null,
      error: false,
    });

		await store.dispatch({
			type: closeWs.type,
		});

		expect(store.getState().socketSlice).toEqual({
      isConnected: false,
      socketData: null,
      error: false,
    });
	});

  test("errorWs", async () => {
		const store = setupStore();

		await store.dispatch({
			type: errorWs.type,
		});

		expect(store.getState().socketSlice).toEqual({
      isConnected: false,
      socketData: null,
      error: true,
    });
	});

});

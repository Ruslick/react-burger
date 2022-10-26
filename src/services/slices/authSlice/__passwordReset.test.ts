import { setupStore } from "../..";
import { postPasswordForgotFetch, postPasswordResetFetch } from "../../requests";

describe("resetPassword", () => {
	const store = setupStore();


	test("forgot test success", async () => {
		await store.dispatch({
			type: postPasswordForgotFetch.fulfilled.type,
		});

		const expected = {
			resetPasswordStatus: "sended",
			isLoaded: false,
			errorMessage: null,
			user: null,
		};
		expect(store.getState().authSlice).toEqual(expected);
	});

	test("forgot test failed", async () => {
		const expected = {
      resetPasswordStatus: "failed",
			isLoaded: false,
			errorMessage: 'error message',
			user: null
		};

		await store.dispatch({
			type: postPasswordForgotFetch.rejected.type,
      error: {message: 'error message'}
    }
		);
		expect(store.getState().authSlice).toEqual(expected);

	});

	test("reset test success", async () => {
		await store.dispatch({
			type: postPasswordResetFetch.fulfilled.type,
		});

		const expected = {
			resetPasswordStatus: "reseted",
			isLoaded: false,
			errorMessage: null,
			user: null,
		};
		expect(store.getState().authSlice).toEqual(expected);
	});

	test("reset test failed", async () => {
		const expected = {
      resetPasswordStatus: "failed",
			isLoaded: false,
			errorMessage: 'error message',
			user: null
		};

		await store.dispatch({
			type: postPasswordResetFetch.rejected.type,
      error: {message: 'error message'}
    }
		);
		expect(store.getState().authSlice).toEqual(expected);

	});
});

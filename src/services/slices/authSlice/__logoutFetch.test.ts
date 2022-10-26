import { setupStore } from "../..";
import { postLoginFetch, postLogoutFetch } from "../../requests";

describe("logoutFetch", () => {
	test("check success", async () => {
		const store = setupStore();
		await store.dispatch({
			type: postLoginFetch.fulfilled.type,
			payload: {
				success: true,
				accessToken: "test token",
				refreshToken: "test token",
				user: {
					email: "testMail",
					name: "testName",
				},
			},
		});

		await store.dispatch({
			type: postLogoutFetch.fulfilled.type,
		});

		const expected = {
			resetPasswordStatus: "idle",
			isLoaded: true,
			errorMessage: null,
			user: null,
		};
		expect(store.getState().authSlice).toEqual(expected);
	});

	test("check falied", async () => {
		const store = setupStore();
		await store.dispatch({
			type: postLoginFetch.fulfilled.type,
			payload: {
				success: true,
				accessToken: "test token",
				refreshToken: "test token",
				user: {
					email: "testMail",
					name: "testName",
				},
			},
		});

		const expected = {
			resetPasswordStatus: "idle",
			isLoaded: true,
			errorMessage: "error message",
			user: {
				email: "testMail",
				name: "testName",
			},
		};

		await store.dispatch({
			type: postLogoutFetch.rejected.type,
			error: { message: "error message" },
		});
		expect(store.getState().authSlice).toEqual(expected);
	});
});

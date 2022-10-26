import { setupStore } from "../..";
import { postRegisterFetch } from "../../requests";

describe("postRegisterFetch", () => {
	test("check empty store", async () => {
		const store = setupStore();
		const expected = {
			resetPasswordStatus: "idle",
			isLoaded: false,
			errorMessage: null,
			user: null,
		};
		expect(store.getState().authSlice).toEqual(expected);
	});

	test("check success", async () => {
		const store = setupStore();
		await store.dispatch({
			type: postRegisterFetch.fulfilled.type,
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
			errorMessage: null,
			user: {
				email: "testMail",
				name: "testName",
			},
		};
		expect(store.getState().authSlice).toEqual(expected);
	});

	test("check falied", async () => {
		const store = setupStore();
		const expected = {
      resetPasswordStatus: "idle",
			isLoaded: true,
			errorMessage: 'error message',
			user: null
		};

		await store.dispatch({
			type: postRegisterFetch.rejected.type,
      error: {message: 'error message'}
    }

		);
		expect(store.getState().authSlice).toEqual(expected);

	});

  // turn on if you want to check requests to server

	// test('request test exist account', async () => {
	// 	const store = setupStore();
	//   const expected = {
	//     resetPasswordStatus: 'idle',
	//     isLoaded: true,
	//     errorMessage: 'Email, password and name are required fields',
	//     user: null
	//   }
	// 	await store.dispatch(postRegisterFetch({email: 'motsukov@gmail.com', password: '123123123'}));
	// 	expect(store.getState().authSlice).toEqual(expected);
	// })
});

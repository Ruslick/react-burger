import { setupStore } from "../..";
import { postLoginFetch } from "../../requests";

describe("postLoginFetch", () => {
	test("empty store", async () => {
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
			type: postLoginFetch.rejected.type,
      error: {message: 'error message'}
    }

		);
		expect(store.getState().authSlice).toEqual(expected);

	});

  // turn on if you want to check requests to server

	// test('request test fullfiled', async () => {
	// 	const store = setupStore();
	//   const expected = {
	//     resetPasswordStatus: 'idle',
	//     isLoaded: true,
	//     errorMessage: '',
	//     user: { email: 'motsukov@gmail.com', name: 'ruslicksal' }
	//   }
	// 	await store.dispatch(postLoginFetch({email: 'motsukov@gmail.com', password: '123123123'}));
	// 	expect(store.getState().authSlice).toEqual(expected);
	// })
	// test("request test incorrect", async () => {
	// 	const store = setupStore();
	// 	const expected = {
  //     resetPasswordStatus: 'idle',
  //     isLoaded: true,
  //     errorMessage: 'email or password are incorrect',
  //     user: null
  //   };
	// 	await store.dispatch(
	// 		postLoginFetch({ email: "motsukov@gmail.co", password: "123123123" })
	// 	);
	// 	expect(store.getState().authSlice).toEqual(expected);
	// });
});

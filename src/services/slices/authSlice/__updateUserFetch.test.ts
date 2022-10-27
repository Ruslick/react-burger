import { setupStore } from "../..";
import { updateUserData } from "../../requests";

describe("updateUser", () => {

	test("success", async () => {
		const store = setupStore();
		await store.dispatch({
			type: updateUserData.fulfilled.type,
			payload: {
				success: true,
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

	// test("check falied", async () => {
	// 	const store = setupStore();
	// 	const expected = {
  //     resetPasswordStatus: "idle",
	// 		isLoaded: true,
	// 		errorMessage: 'error message',
	// 		user: null
	// 	};

	// 	await store.dispatch(	// 		type: .rejected.type,
  //     error: {message: 'error message'}
  //   }

	// 	);
	// 	expect(store.getState().authSlice).toEqual(expected);

	// });
});

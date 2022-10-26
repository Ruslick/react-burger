import { backupOrderIngridients, clearReserveOrderIngridients, makeReserveOrderIngridients, resetOrder, setCurrentOrder, switchBun, updateOrderIngridients } from ".";
import { setupStore } from "../..";

describe("orderSlice", () => {
	const store = setupStore();

  const testIngridientBun = {
    _id: "60d3b41abdacab0026a733c6",
    name: "Краторная булка N-200i",
    type: "bun",
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    __v: 0,
  }

  const testIngridientMain = {
    "_id": "60d3b41abdacab0026a733c8",
    "name": "Филе Люминесцентного тетраодонтимформа",
    "type": "main",
    "proteins": 44,
    "fat": 26,
    "carbohydrates": 85,
    "calories": 643,
    "price": 988,
    "image": "https://code.s3.yandex.net/react/code/meat-03.png",
    "image_mobile": "https://code.s3.yandex.net/react/code/meat-03-mobile.png",
    "image_large": "https://code.s3.yandex.net/react/code/meat-03-large.png",
    "__v": 0
    }

	test("check empty store", async () => {
		expect(store.getState().orderSlice).toEqual({
			status: "idle",
			error: undefined,
			order: undefined,
			currentBun: undefined,

			orderIngridients: [],
			reserveOrderIngridients: [],

			totalPrice: 0,
			currentOrder: undefined,
		});
	});

	// test("addOrderIngridient", async () => {
	// 	await store.dispatch({
	// 		type: addOrderIngridient.type,
	// 		payload: {
	//       "_id": "60d3b41abdacab0026a733c6",
	//       "name": "Краторная булка N-200i",
	//       "type": "bun",
	//       "proteins": 80,
	//       "fat": 24,
	//       "carbohydrates": 53,
	//       "calories": 420,
	//       "price": 1255,
	//       "image": "https://code.s3.yandex.net/react/code/bun-02.png",
	//       "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
	//       "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
	//       "__v": 0
	//       },
	// 	});

	// 	const expectedSlice = {
	//     status: "idle",
	//     error: undefined,
	//     order: undefined,
	//     currentBun: undefined,

	//     orderIngridients: [
	//       {
	//         "_id": "60d3b41abdacab0026a733c6",
	//         "name": "Краторная булка N-200i",
	//         "type": "bun",
	//         "proteins": 80,
	//         "fat": 24,
	//         "carbohydrates": 53,
	//         "calories": 420,
	//         "price": 1255,
	//         "image": "https://code.s3.yandex.net/react/code/bun-02.png",
	//         "image_mobile": "https://code.s3.yandex.net/react/code/bun-02-mobile.png",
	//         "image_large": "https://code.s3.yandex.net/react/code/bun-02-large.png",
	//         "__v": 0,
	//       }
	//     ],
	//     reserveOrderIngridients: [],

	//     totalPrice: 1255,
	//     isOpenedModal: false,
	//     currentOrder: undefined,
	//   }

	// 	expect(store.getState().orderSlice).toEqual(expectedSlice);
	// });
	test("switchBun", async () => {
		const store = setupStore();
    await store.dispatch({
			type: switchBun.type,
			payload: testIngridientBun,
		});

		expect(store.getState().orderSlice).toEqual({
			status: "idle",
			error: undefined,
			order: undefined,
			currentBun: testIngridientBun,

			orderIngridients: [testIngridientBun, testIngridientBun],
			reserveOrderIngridients: [],

			totalPrice: testIngridientBun.price * 2,// 1255 * 2
			currentOrder: undefined,
		});

	});
	test("update and backup ingridients", async () => {
    const store = setupStore()
    await store.dispatch({
			type: updateOrderIngridients.type,
			payload: {newOrderIngridients: [testIngridientBun, testIngridientMain]},
		});

		expect(store.getState().orderSlice).toEqual({
			status: "idle",
			error: undefined,
			order: undefined,
			currentBun: undefined,
			orderIngridients: [testIngridientBun, testIngridientMain],
			reserveOrderIngridients: [],

			totalPrice: 0,
			currentOrder: undefined,
		});
    
    await store.dispatch({
			type: makeReserveOrderIngridients.type,
		});
		expect(store.getState().orderSlice).toEqual({
			status: "idle",
			error: undefined,
			order: undefined,
			currentBun: undefined,
			orderIngridients: [testIngridientBun, testIngridientMain],
			reserveOrderIngridients: [testIngridientBun, testIngridientMain],

			totalPrice: 0,
			currentOrder: undefined,
		});

    await store.dispatch({
			type: updateOrderIngridients.type,
			payload: {newOrderIngridients: [testIngridientBun, testIngridientMain, testIngridientBun]},
		});
    
    await store.dispatch({
			type: backupOrderIngridients.type,
		});
		expect(store.getState().orderSlice).toEqual({
			status: "idle",
			error: undefined,
			order: undefined,
			currentBun: undefined,
			orderIngridients: [testIngridientBun, testIngridientMain],
			reserveOrderIngridients: [testIngridientBun, testIngridientMain],

			totalPrice: 0,
			currentOrder: undefined,
		});

    await store.dispatch({
			type: clearReserveOrderIngridients.type,
		});
		expect(store.getState().orderSlice).toEqual({
			status: "idle",
			error: undefined,
			order: undefined,
			currentBun: undefined,
			orderIngridients: [testIngridientBun, testIngridientMain],
			reserveOrderIngridients: [],
			totalPrice: 0,
			currentOrder: undefined,
		});

    await store.dispatch({
			type: resetOrder.type,
		});
		expect(store.getState().orderSlice).toEqual({
			status: "idle",
			error: undefined,
			order: undefined,
			currentBun: undefined,
			orderIngridients: [],
			reserveOrderIngridients: [],
			totalPrice: 0,
			currentOrder: undefined,
		});
	});

  test('setCurrentOrder', async () => {
    const store = setupStore()
    await store.dispatch({
			type: setCurrentOrder.type,
      payload: 'test'
		});
		expect(store.getState().orderSlice).toEqual({
			status: "idle",
			error: undefined,
			order: undefined,
			currentBun: undefined,
			orderIngridients: [],
			reserveOrderIngridients: [],
			totalPrice: 0,
			currentOrder: 'test',
		});
  })


});

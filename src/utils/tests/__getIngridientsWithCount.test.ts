import { getIngridientsWithCount } from "..";

test("getIngridientsWithCount test", () => {
	const initArray = [
		{
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
		},
		{
			_id: "60d3b41abdacab0026a733c7",
			name: "Флюоресцентная булка R2-D3",
			type: "bun",
			proteins: 44,
			fat: 26,
			carbohydrates: 85,
			calories: 643,
			price: 988,
			image: "https://code.s3.yandex.net/react/code/bun-01.png",
			image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
			image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
			__v: 0,
		},
		{
			_id: "60d3b41abdacab0026a733c7",
			name: "Флюоресцентная булка R2-D3",
			type: "bun",
			proteins: 44,
			fat: 26,
			carbohydrates: 85,
			calories: 643,
			price: 988,
			image: "https://code.s3.yandex.net/react/code/bun-01.png",
			image_mobile: "https://code.s3.yandex.net/react/code/bun-01-mobile.png",
			image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
			__v: 0,
		},
	];
	const resultObj = {
		ingridientsWithCount: [
			{
				ingridient: {
					_id: "60d3b41abdacab0026a733c6",
					name: "Краторная булка N-200i",
					type: "bun",
					proteins: 80,
					fat: 24,
					carbohydrates: 53,
					calories: 420,
					price: 1255,
					image: "https://code.s3.yandex.net/react/code/bun-02.png",
					image_mobile:
						"https://code.s3.yandex.net/react/code/bun-02-mobile.png",
					image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
					__v: 0,
				},
				count: 1,
			},
			{
				ingridient: {
					_id: "60d3b41abdacab0026a733c7",
					name: "Флюоресцентная булка R2-D3",
					type: "bun",
					proteins: 44,
					fat: 26,
					carbohydrates: 85,
					calories: 643,
					price: 988,
					image: "https://code.s3.yandex.net/react/code/bun-01.png",
					image_mobile:
						"https://code.s3.yandex.net/react/code/bun-01-mobile.png",
					image_large: "https://code.s3.yandex.net/react/code/bun-01-large.png",
					__v: 0,
				},
				count: 2,
			},
		],
		totalPrice: 3231,
	};
	expect(getIngridientsWithCount(initArray)).toEqual(resultObj);
});

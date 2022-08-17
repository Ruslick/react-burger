import { ORDERS_URL } from "./constants";

const error = new Error("Fetch error");

export const postOrder = (orderIngridients) => {
	if (!orderIngridients) return Promise.reject(error);
	const getOptions = () => {
		const ingridientsId = orderIngridients.map((ingridient) => {
			return ingridient._id;
		});

		const bodyToJSON = JSON.stringify({
			ingredients: ingridientsId,
		});

		return {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: bodyToJSON,
		};
	};

	return fetch(ORDERS_URL, getOptions())
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw error;
		})
		.then((responseData) => {
			if (responseData.success) {
				return responseData;
			}
			throw error;
		});
};

import { INGRIDIENTS_URL } from "./constants";
import { ORDERS_URL } from "./constants";

const error = new Error("Fetch error");

const requestToUrl = (url, options) => {
	return fetch(url, options)
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

const postOrder = (orderIngridients) => {
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

	return requestToUrl(ORDERS_URL, getOptions());
};

const getIngridients = () => {
	return requestToUrl(INGRIDIENTS_URL).then((requestData) => requestData.data);
};

export { getIngridients, postOrder };

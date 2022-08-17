import { INGRIDIENTS_URL } from "./constants";

const error = new Error("Fetch error");

export const getIngridients = () => {
	return fetch(INGRIDIENTS_URL)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw error;
		})
		.then((responseData) => {
			if (responseData.success) {
				return responseData.data;
			}
			throw error;
		});
};

import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	INGRIDIENTS_URL,
	LOGIN_URL,
	ORDERS_URL,
	PASSWORD_FORGOT_URL,
	PASSWORD_RESET_URL,
	REGISTER_URL,
} from "./constants";

const error = new Error("Fetch error");

// корневой запрос от которого нужно наследоваться
export default function requestToUrl(url, options) {
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
}

const authOptions = (formData) => {
	const jsonBody = JSON.stringify(formData);
	return {
		method: "POST",
		headers: {
			"Content-Type": "application/json;charset=utf-8",
		},
		body: jsonBody,
	};
};

// запрос всех ингридиентов с сервера
export const getIngridientsFetch = createAsyncThunk(
	"ingridients/getIngridientsFetch",
	async () => {
		return await requestToUrl(INGRIDIENTS_URL).then(
			(requestData) => requestData.data
		);
	}
);

// пост запрос заказа и получение номера заказа
export const postOrderFetch = createAsyncThunk(
	"ingridients/postOrderFetch",
	async (_, { getState }) => {
		const orderIds = JSON.stringify({
			ingredients: getState().orderSlice.orderIngridients.map(
				(ingridient) => ingridient._id
			),
		});

		const options = {
			method: "POST",
			headers: {
				"Content-Type": "application/json;charset=utf-8",
			},
			body: orderIds,
		};

		return await requestToUrl(ORDERS_URL, options);
	}
);

export const postPasswordForgotFetch = createAsyncThunk(
	"auth/forgotPasswordFetch",
	async (formData) => {
		return await requestToUrl(PASSWORD_FORGOT_URL, authOptions(formData));
	}
);

export const postPasswordResetFetch = createAsyncThunk(
	"auth/resetPasswordFetch",
	async (formData) => {
		return await requestToUrl(PASSWORD_FORGOT_URL, authOptions(formData));
	}
);

export const postRegisterFetch = createAsyncThunk(
	"auth/registerFetch",
	async (formData) => {
		return await requestToUrl(REGISTER_URL, authOptions(formData));
	}
);

export const postLoginFetch = createAsyncThunk(
	"auth/loginFetch",
	async (formData) => {
		return await requestToUrl(LOGIN_URL, authOptions(formData));
	}
);

export const changeUserData = createAsyncThunk(
	"auth/changeUserData",
	async (formData) => {
		// return await requestToUrl(LOGIN_URL, authOptions(formData));
	}
);


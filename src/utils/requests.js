import { createAsyncThunk } from "@reduxjs/toolkit";
import {
	USER_DATA_URL,
	INGRIDIENTS_URL,
	LOGIN_URL,
	ORDERS_URL,
	PASSWORD_FORGOT_URL,
	PASSWORD_RESET_URL,
	REGISTER_URL,
	UPDATE_TOKEN_URL,
	LOGUOT_URL,
} from "./constants";
import { getCookie, saveTokens } from "./cookiesTransform";
import {
	getOption,
	getOptionWithAuthToken,
	patchOptionWithAuthToken,
	postOption,
	postOptionWithAuthToken,
} from "./fetchOptions";

const getTokens = () => {
	const token = getCookie("refreshToken");
	if (!token) throw new Error(`Update token error : ${token}`);
	return requestToUrl(UPDATE_TOKEN_URL, postOption({ token }));
};
// корневой запрос от которого нужно наследоваться
function requestToUrl(url, options) {
	try {
		return fetch(url, options())
			.then(async (res) => {
				if (!res.ok || res.status === 403) {
					const responseData = await res.json();
					if (responseData.message === "jwt expired") {
						await getTokens();
						return await fetch(url, options());
					} else {
						throw new Error(responseData?.message);
					}
				}
				return res;
			})
			.then((res) => res.json())
			.then((responseData) => {
				if (responseData.success) {
					saveTokens(responseData);
					return responseData;
				}
				return Promise.reject(responseData);
			});
	} catch (e) {
		console.warn(e);
	}
}

// запрос всех ингридиентов с сервера
export const getIngridientsFetch = createAsyncThunk(
	"ingridients/getIngridientsFetch",
	async () => {
		return await requestToUrl(INGRIDIENTS_URL, getOption()).then(
			(requestData) => requestData.data
		);
	}
);

// пост запрос заказа и получение номера заказа
export const postOrderFetch = createAsyncThunk(
	"ingridients/postOrderFetch",
	async (_, { getState }) => {
		const data = {
			ingredients: getState().orderSlice.orderIngridients.map(
				(ingridient) => ingridient._id
			),
		};
		return await requestToUrl(ORDERS_URL, postOptionWithAuthToken(data));
	}
);

export const postPasswordForgotFetch = createAsyncThunk(
	"auth/postPasswordForgotFetch",
	async (formData) => {
		return await requestToUrl(PASSWORD_FORGOT_URL, postOption(formData));
	}
);

export const postPasswordResetFetch = createAsyncThunk(
	"auth/postPasswordResetFetch",
	async (formData) => {
		return await requestToUrl(PASSWORD_RESET_URL, postOption(formData));
	}
);

export const postRegisterFetch = createAsyncThunk(
	"auth/postRegisterFetch",
	async (formData) => {
		return await requestToUrl(REGISTER_URL, postOption(formData));
	}
);

export const postLoginFetch = createAsyncThunk(
	"auth/postLoginFetch",
	async (formData) => {
		return await requestToUrl(LOGIN_URL, postOption(formData));
	}
);
export const postLogoutFetch = createAsyncThunk(
	"auth/postLogoutFetch",
	async () => {
		const token = getCookie("refreshToken");
		if (!token) throw new Error(`Update token error : ${token}`);
		return requestToUrl(LOGUOT_URL, postOption({ token }));
	}
);

export const getUsersFetch = createAsyncThunk(
	"auth/getUsersFetch",
	async () => {
		return requestToUrl(USER_DATA_URL, getOptionWithAuthToken());
	}
);

export const updateUserData = createAsyncThunk(
	"auth/updateUserData",
	async (formData) => {
		return await requestToUrl(
			USER_DATA_URL,
			patchOptionWithAuthToken(formData)
		);
	}
);

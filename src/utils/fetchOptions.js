import { getCookie } from "./cookiesTransform";

const optionsTemplate = ({ method, data, headersData = {}, auth = false }) => {
	return () => {
		const body = data && JSON.stringify(data);
		let headers = {
			...headersData,
			"Content-Type": "application/json;charset=utf-8",
		};
	
		if (auth) {
			const token = getCookie("token");
			const Authorization = `Bearer ${token}`;
			headers = { ...headers, Authorization };
		}
		const request = {
			method,
			headers,
		};
	
		return method === "GET" ? request : { ...request, body }
	}
};

export const getOption = (headersData) => {
	return optionsTemplate({ method: "GET", headersData });
};
export const postOption = (data, headersData) => {
	return optionsTemplate({ method: "POST", data, headersData });
};
export const getOptionWithAuthToken = (headersData) => {
	return optionsTemplate({ method: "GET", headersData, auth: true });
};
export const postOptionWithAuthToken = (data, headersData) => {
	return optionsTemplate({ method: "POST", data, headersData, auth: true });
};

export const patchOptionWithAuthToken = (data) => {
	return optionsTemplate({ method: "PATCH", data, auth: true });
};

import { OutgoingHttpHeaders } from "http";
import { getCookie } from "./cookiesTransform";
import { IAuthTemplateParams, IOptions } from "./types/index";

const optionsTemplate = ({ method, data, headersData = {}, auth = false }: IAuthTemplateParams): ReturnType<any> => {
	return (): IOptions => {
		const body = data && JSON.stringify(data);
		let headers: OutgoingHttpHeaders = {
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

export const getOption = (headersData?: OutgoingHttpHeaders) => {
	return optionsTemplate({ method: "GET", headersData });
};
export const postOption = (data: any, headersData?: OutgoingHttpHeaders) => {
	return optionsTemplate({ method: "POST", data, headersData });
};
export const getOptionWithAuthToken = (headersData?: OutgoingHttpHeaders) => {
	return optionsTemplate({ method: "GET", headersData, auth: true });
};
export const postOptionWithAuthToken = (data?: any, headersData?: OutgoingHttpHeaders) => {
	return optionsTemplate({ method: "POST", data, headersData, auth: true });
};

export const patchOptionWithAuthToken = (data?: any) => {
	return optionsTemplate({ method: "PATCH", data, auth: true });
};

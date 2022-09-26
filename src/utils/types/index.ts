import { OutgoingHttpHeaders } from "http";
import { TCategorias } from "./store";

export interface IAuthTemplateParams {
	method: TRequestsMethods;
	data?: Array<any>;
	headersData?: OutgoingHttpHeaders;
	auth?: boolean;
}

export interface ILocation {
	from: string | undefined;
}

export interface IIngridient {
	_id: string;
	name: string;
	type: TCategorias;
	proteins: number;
	fat: number;
	carbohydrates: number;
	calories: number;
	price: number;
	image: string;
	image_mobile: string;
	image_large: string;
	__v: number;
	index?: number;
	_number?: number;
}

export interface IResponseData {
	success: boolean;
	accessToken?: string;
	refreshToken?: string;
	user?: {
		email: string;
		name: string;
	};
	data?: Array<IIngridient>;
}
export type TRequestsMethods = "GET" | "POST" | "PATCH";

export interface IOptions {
	method: TRequestsMethods;
	headers: OutgoingHttpHeaders;
	body?: {};
}

export * from "./store";
export * from "./propsTypes";

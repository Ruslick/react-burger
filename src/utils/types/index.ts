import { ActionCreatorWithoutPayload, ActionCreatorWithPayload } from "@reduxjs/toolkit";
import { OutgoingHttpHeaders } from "http";

export interface IWSOrder {
	_id: string;
	ingredients: string[];
	status: string;
	name: string;
	createdAt: string;
	updatedAt: string;
	number: number;
}

export interface IWSData {
	orders: IWSOrder[];
	success: boolean;
	total: number;
	totalToday: number;
}

export interface IOrder {
	_id: string;
	createdAt: string; //"2022-10-05T20:02:19.934Z"
	ingredients: IIngridient[];
	name: string;
	number: number;
	owner: {
		name: string;
		email: string;
		createdAt: string;
		updatedAt: string;
	};
	price: number;
	status: string;
	updatedAt: string;
}
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
	type: string;
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
	name: string;
	order: IOrder;
}
export type TRequestsMethods = "GET" | "POST" | "PATCH";

export interface IOptions {
	method: TRequestsMethods;
	headers: OutgoingHttpHeaders;
	body?: {};
}

export interface ICategorias {
	type: string;
	name: string;
}

export interface ICategoriaSlice {
	activeCategoria: string;
	ingridientsCategorias: ICategorias[];
}

export type TWsActions = {
	openWs: ActionCreatorWithoutPayload<string>
	errorWs: ActionCreatorWithoutPayload<string>
	messageWs: ActionCreatorWithPayload<any, string>
	closeWs: ActionCreatorWithoutPayload<string>
	disconnectWs: ActionCreatorWithoutPayload<string>
	connectWs: ActionCreatorWithPayload<any, string>
};

export * from "./propsTypes";

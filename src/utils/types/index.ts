import { OutgoingHttpHeaders } from "http";
import { TCategorias } from "./store";
import { ReactNode } from "react";

export interface IAdditionalAction {
	description: string;
	linkText: string;
	to: string;
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

export interface IAuthTemplateParams {
	method: TRequestsMethods;
	data?: Array<any>;
	headersData?: OutgoingHttpHeaders;
	auth?: boolean;
}

export interface IOptions {
	method: TRequestsMethods;
	headers: OutgoingHttpHeaders;
	body?: {};
}

export interface IOrderIngridient {
	ingridient: IIngridient;
	isLocked?: boolean;
	position?: "top" | "bottom";
	moveCard: any;
	index?: number;
}

export interface IIngridientsCategoriaProps {
	type: TCategorias;
	children: ReactNode;
	scrollPosition: number;
}

export * from "./store";

import { IIngridient, IOrder } from ".";

export interface IResponseData {
	success: boolean;
	accessToken?: string;
	refreshToken?: string;
	user?: {
		email: string;
		name: string;
	};
	data?: IIngridient[];
	name: string;
	order: IOrder;
}
export interface IResponseIngridients {
	success: boolean;
	data: IIngridient[];
}
import { IIngridient } from "./index";

export type TStore = any;

export type TCategorias = "bun" | "sauce" | "main";
type TCategoriasNames = "Булки" | "Cоусы" | "Начинки";

export interface ICategorias {
	type: TCategorias;
	name: TCategoriasNames;
}

export interface ICategoriaSlice {
	activeCategoria: TCategorias;
	ingridientsCategorias: ICategorias[];
}

export interface IOrderSlice {
	status: "idle" | "loading" | "received" | "failed";
	error: null | string;
	order: { number?: number };

	currentBun: null | IIngridient;

	orderIngridients: Array<IIngridient> | [];
	reserveOrderIngridients: Array<IIngridient> | [];

	totalPrice: number;
	isOpenedModal: boolean;
}

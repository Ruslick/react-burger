import { TCategorias } from "./store";
import { ReactNode } from "react";
import { IIngridient } from ".";

export interface IIngridientsCategoriaProps {
	type: TCategorias;
	children: ReactNode;
	scrollPosition: number;
}

export interface IAuthTemplateProps {
	id?: string;
	title: string;
	inputs: ReactNode[];
	button: ReactNode;
	additionActions: ReactNode[];
	onSubmit: VoidFunction;
}

export interface IOrderIngridientProps {
	ingridient: IIngridient;
	isLocked?: boolean;
	position?: "top" | "bottom";
	moveCard: any;
	index?: number;
}

export interface IAdditionalActionProps {
	description: string;
	linkText: string;
	to: string;
}

export interface IModalProps {
	title?: string;
	onClose: VoidFunction;
}

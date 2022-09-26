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
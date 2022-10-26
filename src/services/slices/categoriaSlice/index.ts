import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../..";



const ingridientsCategorias = [
	{ type: "bun", name: "Булки" },
	{ type: "sauce", name: "Cоусы" },
	{ type: "main", name: "Начинки" },
]

export const categoriaSlice = createSlice({
	name: "categoria",
	initialState: {
		activeCategoria: "bun",
		ingridientsCategorias
	},
	reducers: {
		selectTab(state, { payload }) {
			state.activeCategoria = payload;
		},
	},
});

export const { selectTab } = categoriaSlice.actions;

export const getActivecategoria = (state: RootState) => state.categoriaSlice.activeCategoria
export const getIngridientsCategorias = (state: RootState) => state.categoriaSlice.ingridientsCategorias


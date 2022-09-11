import { createSlice } from "@reduxjs/toolkit";

export const categoriaSlice = createSlice({
	name: "categoria",
	initialState: {
		activeCategoria: "bun",
		ingridientsCategorias: [
			{ type: "bun", name: "Булки" },
			{ type: "sauce", name: "Cоусы" },
			{ type: "main", name: "Начинки" },
		],
	},
	reducers: {
		selectTab: {
			reducer: (state, { payload }) => {
				state.activeCategoria = payload;
			},
		},
	},
});

export const { selectTab } = categoriaSlice.actions;

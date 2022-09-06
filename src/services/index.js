import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { categoriaSlice } from "./slices/categoriaSlice";
import { currentIngridientSlice } from "./slices/currentIngridientSlice";
import { ingridientsSlice } from "./slices/ingridientsSlice";
import { orderSlice } from "./slices/orderSlice";

export const store = configureStore({
	reducer: {
		ingridientsSlice: ingridientsSlice.reducer,
		orderSlice: orderSlice.reducer,
		currentIngridientSlice: currentIngridientSlice.reducer,
		categoriaSlice: categoriaSlice.reducer,
		authSlice: authSlice.reducer
	},
});

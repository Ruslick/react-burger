import { configureStore } from "@reduxjs/toolkit";
import { authSlice } from "./slices/authSlice";
import { categoriaSlice } from "./slices/categoriaSlice";
import { ingridientsSlice } from "./slices/ingridientsSlice";
import { orderSlice } from "./slices/orderSlice";

export const store = configureStore({
	reducer: {
		ingridientsSlice: ingridientsSlice.reducer,
		orderSlice: orderSlice.reducer,
		categoriaSlice: categoriaSlice.reducer,
		authSlice: authSlice.reducer,
	},
});

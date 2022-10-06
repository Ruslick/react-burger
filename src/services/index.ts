import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
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

export type RootState = ReturnType<typeof store.getState>



export type AppDispatch = typeof store.dispatch
export const useAppDispatch: () => AppDispatch = useDispatch 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
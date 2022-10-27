import { configureStore } from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { webSocketMiddleware } from "./websockets";
import { authSlice } from "./slices/authSlice";
import { categoriaSlice } from "./slices/categoriaSlice";
import { ingridientsSlice } from "./slices/ingridientsSlice";
import { orderSlice } from "./slices/orderSlice";
import { socketSlice } from "./slices/sockerSlice";

const rootReducer = {
	ingridientsSlice: ingridientsSlice.reducer,
	orderSlice: orderSlice.reducer,
	categoriaSlice: categoriaSlice.reducer,
	authSlice: authSlice.reducer,
	socketSlice: socketSlice.reducer,
};

export const setupStore = () =>
	configureStore({
		reducer: rootReducer,
		middleware: (getDefaultMiddleware) =>
			getDefaultMiddleware().concat(webSocketMiddleware(socketSlice.actions)),
	});

export const store = setupStore();

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

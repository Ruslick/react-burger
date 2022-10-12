import { configureStore} from "@reduxjs/toolkit";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { webSocketMiddleware } from "./websockets";
import { authSlice } from "./slices/authSlice";
import { categoriaSlice } from "./slices/categoriaSlice";
import { ingridientsSlice } from "./slices/ingridientsSlice";
import { orderSlice } from "./slices/orderSlice";
import { socketSlice } from "./slices/socketsSlice";

const  rootReducer =  {
	ingridientsSlice: ingridientsSlice.reducer,
	orderSlice: orderSlice.reducer,
	categoriaSlice: categoriaSlice.reducer,
	authSlice: authSlice.reducer,
	socketSlice: socketSlice.reducer
}

export const store = configureStore({
	reducer: rootReducer,
	middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(webSocketMiddleware(socketSlice.actions))
});


export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch: () => AppDispatch = useDispatch 
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector
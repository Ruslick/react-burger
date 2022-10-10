import { createSlice } from "@reduxjs/toolkit";
import { IWSData } from "../../utils/types";

interface IState {
	isConnected: boolean;
	socketData: IWSData | null;
	error: boolean;
}
const initialState: IState = {
	isConnected: false,
	socketData: null,
	error: false,
};

export const socketSlice = createSlice({
	name: "socketSlice",
	initialState,
	reducers: {
		messageWs(state, { payload }) {
			if (!payload.success) return;
			state.socketData = payload;
			state.isConnected = true;
		},

		disconnectWs(state) {
			state.isConnected = false;
			state.socketData = null;
		},
		errorWs(state) {
			state.isConnected = false;
			state.socketData = null;
			state.error = true;
		},
		openWs(state) {
			state.isConnected = true;
		},
	},
});

export const { openWs, errorWs, messageWs, disconnectWs } = socketSlice.actions;

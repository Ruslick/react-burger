import { createSlice } from "@reduxjs/toolkit";
import { removeTokens } from "../../utils/cookiesTransform";
import {
	getUsersFetch,
	postLoginFetch,
	postLogoutFetch,
	postPasswordForgotFetch,
	postPasswordResetFetch,
	postRegisterFetch,
	updateUserData,
} from "../../services/requests";

const initialState = {
	resetPasswordStatus: "idle",
	isLoaded: false,
	errorMessage: null,
	user: null,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {},
	extraReducers: {
		[postLoginFetch.fulfilled]: (state, { payload }) => {
			if (payload?.success) {
				state.user = payload.user;
			} else {
				console.warn(payload);
			}
		},
		[postLoginFetch.rejected]: (state, { error }) => {
			state.errorMessage = error;
			console.warn(error);
		},

		[postRegisterFetch.fulfilled]: (state, { payload }) => {
			if (payload?.success) {
				state.user = payload.user;
			} else {
				console.warn(payload);
			}
		},
		[postRegisterFetch.rejected]: (state, { error }) => {
			state.errorMessage = error;
			console.warn(error);
		},
		[postPasswordForgotFetch.fulfilled]: (state, { payload }) => {
			if (payload?.success) {
				state.resetPasswordStatus = "sended";
			} else {
				console.warn(payload);
			}
		},
		[postPasswordForgotFetch.rejected]: (state, { error }) => {
			state.resetPasswordStatus = "failed";
			console.warn(error);
		},
		[postPasswordResetFetch.fulfilled]: (state, { payload }) => {
			if (payload?.success) {
				state.resetPasswordStatus = "reseted";
			} else {
				console.warn(payload);
			}
		},
		[postLogoutFetch.fulfilled]: (state, { payload }) => {
			if (payload?.success) {
				removeTokens();
				state.user = null;
				state.isLoaded = true;
			} else {
				console.warn(payload);
			}
		},
		[postPasswordResetFetch.rejected]: (state, { error }) => {
			state.resetPasswordStatus = "failed";
			console.warn(error);
		},
		[getUsersFetch.pending]: (state) => {
			state.isLoaded = false;
		},
		[getUsersFetch.fulfilled]: (state, { payload }) => {
			if (payload?.success) {
				state.user = payload.user;
				state.isLoaded = true;
			} else {
				console.warn(payload);
			}
		},
		[getUsersFetch.rejected]: (state) => {
			state.user = null;
			state.isLoaded = true;
		},
		[updateUserData.fulfilled]: (state, { payload }) => {
			if (payload?.success) {
				state.user = payload.user;
			} else {
				console.warn(payload);
			}
		},
	},
});

export const { logout } = authSlice.actions;

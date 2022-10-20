import { createSlice, SerializedError } from "@reduxjs/toolkit";
import { removeTokens } from "../../utils/cookiesTransform";
import {
	getUsersFetch,
	postLoginFetch,
	postLogoutFetch,
	postPasswordForgotFetch,
	postPasswordResetFetch,
	postRegisterFetch,
	updateUserData,
} from "../requests";

interface IState {
	resetPasswordStatus: string;
	isLoaded: boolean;
	user?: {
		name: string;
		email: string;
	};
	errorMessage?: SerializedError;
}

const initialState: IState = {
	resetPasswordStatus: "idle",
	isLoaded: false,
	errorMessage: undefined,
	user: undefined,
};

export const authSlice = createSlice({
	name: "auth",
	initialState,
	reducers: {
		resetLoaded(state) {
			state.isLoaded = false;
		},
	},
	extraReducers(builder) {
		builder
			.addCase(postLoginFetch.fulfilled, (state, { payload }) => {
				if (payload?.success) {
					state.user = payload.user;
				} else {
					console.warn(payload);
				}
			})
			.addCase(postLoginFetch.rejected, (state, { error }) => {
				state.errorMessage = error;
				console.warn(error);
			})
			.addCase(postRegisterFetch.fulfilled, (state, { payload }) => {
				if (payload?.success) {
					state.user = payload.user;
				} else {
					console.warn(payload);
				}
			})
			.addCase(postRegisterFetch.rejected, (state, { error }) => {
				state.errorMessage = error;
				console.warn(error);
			})
			.addCase(postPasswordForgotFetch.fulfilled, (state, { payload }) => {
				if (payload?.success) {
					state.resetPasswordStatus = "sended";
				} else {
					console.warn(payload);
				}
			})
			.addCase(postPasswordForgotFetch.rejected, (state, { error }) => {
				state.resetPasswordStatus = "failed";
				console.warn(error);
			})
			.addCase(postPasswordResetFetch.fulfilled, (state, { payload }) => {
				if (payload?.success) {
					state.resetPasswordStatus = "reseted";
				} else {
					console.warn(payload);
				}
			})
			.addCase(postLogoutFetch.fulfilled, (state, { payload }) => {
				if (payload?.success) {
					removeTokens();
					state.user = undefined;
					state.isLoaded = true;
				} else {
					console.warn(payload);
				}
			})
			.addCase(postPasswordResetFetch.rejected, (state, { error }) => {
				state.resetPasswordStatus = "failed";
				console.warn(error);
			})
			.addCase(getUsersFetch.pending, (state) => {
				state.isLoaded = false;
			})
			.addCase(getUsersFetch.fulfilled, (state, { payload }) => {
				if (payload?.success) {
					state.user = payload.user;
					state.isLoaded = true;
				} else {
					console.warn(payload);
				}
			})
			.addCase(getUsersFetch.rejected, (state) => {
				state.user = undefined;
				state.isLoaded = true;
			})
			.addCase(updateUserData.fulfilled, (state, { payload }) => {
				if (payload?.success) {
					state.user = payload.user;
				} else {
					console.warn(payload);
				}
			});
	},
});

export const { resetLoaded } = authSlice.actions;

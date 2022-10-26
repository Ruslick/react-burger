import { createSlice } from "@reduxjs/toolkit";
import { removeTokens } from "../../../utils/cookiesTransform";
import {
	getUsersFetch,
	postLoginFetch,
	postLogoutFetch,
	postPasswordForgotFetch,
	postPasswordResetFetch,
	postRegisterFetch,
	updateUserData,
} from "../../requests";

interface IState {
	resetPasswordStatus: string;
	isLoaded: boolean;
	user: {
		name: string;
		email: string;
	} | null;
	errorMessage: string | null;
}

const initialState: IState = {
	resetPasswordStatus: "idle",
	isLoaded: false,
	errorMessage: null,
	user: null,
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
				state.errorMessage = null;
				state.user = payload.user;
				state.isLoaded = true;
			})
			.addCase(postLoginFetch.rejected, (state, { error }) => {
				error.message
					? (state.errorMessage = error.message)
					: (state.errorMessage = "fetch error");
				state.isLoaded = true;
			});

		builder
			.addCase(postRegisterFetch.fulfilled, (state, { payload }) => {
				state.user = payload.user;
				state.isLoaded = true;
				state.errorMessage = null;
			})
			.addCase(postRegisterFetch.rejected, (state, { error }) => {
				error.message
					? (state.errorMessage = error.message)
					: (state.errorMessage = "fetch error");
				state.isLoaded = true;
				state.user = null;
			});
		builder
			.addCase(postPasswordForgotFetch.fulfilled, (state) => {
				state.resetPasswordStatus = "sended";
				state.errorMessage = null;
			})
			.addCase(postPasswordForgotFetch.rejected, (state, { error }) => {
				error.message
					? (state.errorMessage = error.message)
					: (state.errorMessage = "fetch error");
				state.resetPasswordStatus = "failed";
			});
		builder
			.addCase(postPasswordResetFetch.fulfilled, (state, { payload }) => {
				state.errorMessage = null;
				state.resetPasswordStatus = "reseted";
			})
			.addCase(postPasswordResetFetch.rejected, (state, { error }) => {
				error.message
					? (state.errorMessage = error.message)
					: (state.errorMessage = "fetch error");
				state.resetPasswordStatus = "failed";
			});
		builder
		.addCase(postLogoutFetch.fulfilled, (state, { payload }) => {
			removeTokens();
			state.user = null;
			state.isLoaded = true;
		})
		.addCase(postLogoutFetch.rejected, (state, { error }) => {
			error.message
				? (state.errorMessage = error.message)
				: (state.errorMessage = "fetch error");
			state.isLoaded = true;
		});
		builder
			.addCase(getUsersFetch.pending, (state) => {
				state.isLoaded = false;
			})
			.addCase(getUsersFetch.fulfilled, (state, { payload }) => {
				state.user = payload.user;
				state.isLoaded = true;
			})
			.addCase(getUsersFetch.rejected, (state, { error }) => {
				error.message
					? (state.errorMessage = error.message)
					: (state.errorMessage = "fetch error");
				state.user = null;
				state.isLoaded = true;
			});
		builder
		.addCase(updateUserData.fulfilled, (state, { payload }) => {
				state.user = payload.user;
				state.isLoaded = true;

		})
		.addCase(updateUserData.rejected, (state, { error }) => {
			error.message
				? (state.errorMessage = error.message)
				: (state.errorMessage = "fetch error");
			state.user = null;
			state.isLoaded = true;
		});
	},
});

export const { resetLoaded } = authSlice.actions;

import { createSlice } from "@reduxjs/toolkit";
import { postLoginFetch, postPasswordForgotFetch, postPasswordResetFetch, postRegisterFetch } from "../../utils/requests";

export const authSlice = createSlice({
	name: "auth",

	initialState: {
		isAuth: false,
		data: {
			email: "",
			password: "",
			code: "",
			name: "",
		},

	},
	reducers: {
		setUserData: {
			reducer: (state, { payload }) => {
				return {...state, data: {...state.data, ...payload}}
			},
		},
	},
	extraReducers: {
		[postPasswordResetFetch.fulfilled]: (state, { payload }) => {
			if (payload?.success) {
				console.log('success successful')
			}
		},
		[postPasswordForgotFetch.fulfilled]: (state, { payload }) => {
			if (payload?.success) {
				console.log('changed sended')
			}
		},

		[postRegisterFetch.fulfilled]: (state, { payload }) => {
			if (payload?.success) {
				state.data = payload.user
				state.isAuth = true
			}
		},
		[postLoginFetch.fulfilled]: (state, { payload }) => {
			if (payload?.success) {
				state.data = payload.user
				state.isAuth = true
			}
		},
	},
});

export const { setUserData } = authSlice.actions;

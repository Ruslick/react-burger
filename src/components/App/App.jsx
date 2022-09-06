import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import {
	ConstructorPage,
	LoginPage,
	ResetPasswordPage,
	RegisterPage,
	ForgotPasswordPage,
} from "../../pages";
import ProfilePage from "../../pages/Profile/ProfilePage";
import Layout from "../Layout/Layout";

function App() {
	return (
		<BrowserRouter>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<ConstructorPage />} />
					<Route path="login" element={<LoginPage />} />
					<Route path="register" element={<RegisterPage />} />
					<Route path="forgot-password" element={<ForgotPasswordPage />} />
					<Route path="reset-password" element={<ResetPasswordPage />} />
					<Route path="profile" element={<ProfilePage />} />
				</Route>
				<Route path="*" element={<div>404</div>} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;

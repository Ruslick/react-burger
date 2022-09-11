import React from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import {
	ConstructorPage,
	LoginPage,
	ResetPasswordPage,
	RegisterPage,
	ForgotPasswordPage,
} from "../../pages";
import OrderHistory from "../../pages/OrederHistory/OrderHistory";
import ProfilePage from "../../pages/Profile/ProfilePage";
import OrderDetails from "../BurgerConstructor/OrderDetails/OrderDetails";
import Layout from "../Layout/Layout";
import ProtectedRoute from "../hocs/ProtectedRoute/ProtectedRoute";
import IngredientDetails from "../BurgerIngredients/IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";

function App() {
	const location = useLocation();
	const background = location.state?.from;
	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="" element={<ConstructorPage />}>
						{background && (
							<Route
								path="order-details"
								element={
									<ProtectedRoute redirectTo="/login">
										<Modal>
											<OrderDetails />
										</Modal>
									</ProtectedRoute>
								}
							></Route>
						)}

						{background && (
							<Route
								path="ingridient/:id"
								element={
									<Modal title="Детали ингредиента">
										<IngredientDetails />
									</Modal>
								}
							></Route>
						)}
					</Route>

					<Route path="ingridient/:id" element={<IngredientDetails />}></Route>

					<Route
						path="register"
						element={
							<ProtectedRoute redirectTo={"/"} mustAuth={false}>
								<RegisterPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="forgot-password"
						element={
							<ProtectedRoute redirectTo={"/"} mustAuth={false}>
								<ForgotPasswordPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="reset-password"
						element={
							<ProtectedRoute redirectTo={"/"} mustAuth={false}>
								<ResetPasswordPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="profile"
						element={
							<ProtectedRoute redirectTo={"/login"}>
								<ProfilePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="profile/orders"
						element={
							<ProtectedRoute redirectTo={"/login"}>
								<OrderHistory />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/login"
						element={
							<ProtectedRoute redirectTo={"/"} mustAuth={false}>
								<LoginPage />
							</ProtectedRoute>
						}
					/>
				</Route>
				<Route path="*" element={<div>404</div>} />
			</Routes>
		</>
	);
}

export default App;

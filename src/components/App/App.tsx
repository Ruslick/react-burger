import React, { useEffect } from "react";
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
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
import {Layout} from "../Layout/Layout";
import IngredientDetails from "../BurgerIngredients/IngredientDetails/IngredientDetails";
import Modal from "../Modal/Modal";
import { useDispatch } from "react-redux";
import { getIngridientsFetch } from "../../services/requests";
import { ProtectedRoute } from "../hocs/ProtectedRoute/ProtectedRoute";
import { ILocation } from "../../utils/types";

function App() {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(getIngridientsFetch() as any);
	}, [dispatch]);

	const locationState = location.state as ILocation | undefined;
	const background = locationState?.from;

	const closeModalHandler = () => {
		navigate(-1);
	};

	return (
		<>
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route path="" element={<ConstructorPage />}>
						{background && (
							<Route
								path="order-details"
								element={
									<ProtectedRoute>
										<Modal onClose={closeModalHandler}>
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
									<Modal title="Детали ингредиента" onClose={closeModalHandler}>
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
							<ProtectedRoute mustAuth={false}>
								<RegisterPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="forgot-password"
						element={
							<ProtectedRoute mustAuth={false}>
								<ForgotPasswordPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="reset-password"
						element={
							<ProtectedRoute mustAuth={false}>
								<ResetPasswordPage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="profile"
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}
					/>
					<Route
						path="profile/orders"
						element={
							<ProtectedRoute>
								<OrderHistory />
							</ProtectedRoute>
						}
					/>
					<Route
						path="/login"
						element={
							<ProtectedRoute mustAuth={false}>
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

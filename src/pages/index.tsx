import React, { useEffect } from 'react'
import { useAppDispatch, useAppSelector } from "../services";
import { getIngridientsFetch } from '../services/requests';
import { ILocation } from '../utils/types';
import { Routes, Route, useLocation, useNavigate } from "react-router-dom";
import RegisterPage from './Register/RegisterPage';
import ForgotPasswordPage from './ForgotPassword/ForgotPasswordPage';
import ResetPasswordPage from './ResetPassword/ResetPasswordPage';
import LoginPage from './Login/LoginPage';
import { Layout } from '../components/Layout/Layout';
import ConstructorPage from './Constructor/ConstructorPage';
import { ProtectedRoute } from '../components/hocs/ProtectedRoute/ProtectedRoute';
import Modal from '../components/Modal/Modal';
import OrderDetails from '../components/BurgerConstructor/OrderDetails/OrderDetails';
import IngredientDetails from '../components/BurgerIngredients/IngredientDetails/IngredientDetails';
import ProfilePage from './Profile/ProfilePage';
import ProfileForm from '../components/ProfileForm/ProfileForm';
import UserOrders from './UserOrders/UserOrders';
import { FeedPage } from './Feed/FeedPage';
import { FeedIdPage } from './FeedId/FeedIdPage';
import { OrderInfo } from '../components/OrderInfo/OrderInfo';





function AppRoutes() {
	const location = useLocation();
	const navigate = useNavigate();
	const dispatch = useAppDispatch();

	useEffect(() => {
		dispatch(getIngridientsFetch());
	}, [dispatch]);

	const locationState = location.state as ILocation | undefined;
	const background = locationState?.from;

	const currentOrder = useAppSelector(store => store.orderSlice.currentOrder)

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
										<Modal onClose={closeModalHandler} padding='var(--x30) var(--x25)'>
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

					{!background && <Route path="ingridient/:id" element={<IngredientDetails />} />}  

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

					{/*  */}

					<Route
						path="profile"
						element={
							<ProtectedRoute>
								<ProfilePage />
							</ProtectedRoute>
						}
					>
						<Route path="" element={<ProfileForm />} />
						<Route path="orders" element={<UserOrders />}> 
						{background && <Route path=":id" element={<Modal title={"#" + currentOrder} onClose={closeModalHandler}><OrderInfo modal forUser /></Modal>}/>}
						</Route>
					</Route>
					{!background && <Route path="/profile/orders/:id" element={<OrderInfo forUser />}/>}
					
					{/*  */}

					<Route
						path="/login"
						element={
							<ProtectedRoute mustAuth={false}>
								<LoginPage />
							</ProtectedRoute>
						}
					/>
					<Route path="/feed" element={<FeedPage />} >
						{background && <Route path="/feed/:id" element={
							<Modal title={"#" + currentOrder} onClose={closeModalHandler}><OrderInfo modal /></Modal>
						} />}
					</Route>
					{!background && <Route path="/feed/:id" element={<FeedIdPage />} />}

				</Route>
				<Route path="*" element={<div>404</div>} />
			</Routes>
		</>
	);
}

export default AppRoutes;
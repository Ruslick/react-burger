import React from "react";
import {
	Button,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AdditionalAction from "../../components/ui/AdditionalAction/AdditionalAction";
import AuthTemplate from "../../components/AuthTemplate/AuthTemplate";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { ResetPasswordSchema } from "../../utils/validateSchemas";
import { postPasswordResetFetch } from "../../services/requests";
import { Navigate, useLocation } from "react-router-dom";
import PasswordInput from "../../components/ui/PasswordInput/PasswordInput";
import { ILocation } from "../../utils/types";

function ResetPasswordPage() {
	const dispatch = useDispatch();
	const reseted = useSelector<any, any>(
		(store) => store.authSlice.resetPasswordStatus === "reseted"
	);
	const {
		handleChange,
		handleSubmit,
		handleBlur,
		values,
		isValid,
		dirty,
		errors,
		touched,
	} = useFormik({
		initialValues: {
			password: "",
			token: "",
		},
		onSubmit(values) {
			dispatch(postPasswordResetFetch(values) as any);
		},
		validationSchema: ResetPasswordSchema,
	});

	const inputs = [
		<PasswordInput
			key="password"
			error={touched.password && !!errors.password}
			errorText={errors.password}
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.password}
			placeholder="Введите новый пароль"
		/>,
		<Input
			key="token"
			type="text"
			name="token"
			error={touched.token && !!errors.token}
			errorText={errors.token}
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.token}
			placeholder="Введите код из письма"
		/>,
	];

	const additionalActions = [
		<AdditionalAction
			description="Вспомнили пароль?"
			linkText="Войти"
			to="/login"
			key="entrance"
		/>,
	];
	const location = useLocation();
	const locationState = location.state as ILocation | undefined
	if (locationState?.from !== "/forgot-password") {
		return <Navigate to="/" replace />;
	}

	return reseted ? (
		<Navigate to="/login" replace />
	) : (
		<AuthTemplate
			title="Восстановление пароля"
			inputs={inputs}
			additionActions={additionalActions}
			button={<Button disabled={!isValid || !dirty}>Сохранить</Button>}
			onSubmit={handleSubmit}
		/>
	);
}

export default ResetPasswordPage;

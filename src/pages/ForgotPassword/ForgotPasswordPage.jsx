import React, { useMemo } from "react";
import {
	Button,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AdditionalAction from "../../components/ui/AdditionalAction/AdditionalAction";
import AuthTemplate from "../../components/AuthTemplate/AuthTemplate";
import { useDispatch, useSelector } from "react-redux";
import { postPasswordForgotFetch } from "../../services/requests";
import { useFormik } from "formik";
import { ForgotPasswordSchema } from "../../utils/validateSchemas";
import NavigateWithState from "../../components/hocs/NavigateWithState/NavigateWithState";

function ForgotPasswordPage() {
	const dispatch = useDispatch();
	const sended = useSelector(
		(store) => store.authSlice.resetPasswordStatus === "sended"
	);

	const {
		handleChange,
		handleSubmit,
		handleBlur,
		values,
		isValid,
		dirty,
		errors,
	} = useFormik({
		initialValues: {
			email: "",
		},
		onSubmit(values) {
			dispatch(postPasswordForgotFetch(values));
		},
		validationSchema: ForgotPasswordSchema,
	});

	const inputs = useMemo(
		() => [
			<Input
				key="email"
				type="email"
				name="email"
				error={!!errors.email}
				errorText={errors.email}
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.email}
				placeholder="Укажите Email"
			/>,
		],
		[errors.email, handleBlur, handleChange, values.email]
	);

	const additionActions = useMemo(
		() => [
			<AdditionalAction
				description="Вспомнили пароль?"
				linkText="Войти"
				to="/login"
				key="entrance"
			/>,
		],
		[]
	);

	return sended ? (
		<NavigateWithState to="/reset-password" />
	) : (
		<AuthTemplate
			id="forgotPasswordForm"
			title="Восстановление пароля"
			onSubmit={handleSubmit}
			inputs={inputs}
			button={<Button disabled={!isValid || !dirty}>Восстановить</Button>}
			additionActions={additionActions}
		/>
	);
}

export default ForgotPasswordPage;

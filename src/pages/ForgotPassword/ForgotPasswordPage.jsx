import React from "react";
import {
	Button,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AdditionalAction from "../../components/ui/AdditionalAction/AdditionalAction";
import AuthTemplate from "../../components/AuthTemplate/AuthTemplate";
import { useDispatch } from "react-redux";
import { postPasswordForgotFetch } from "../../utils/requests";
import { useFormik } from "formik";
import { setUserData } from "../../services/slices/authSlice";
import { ForgotPasswordSchema } from "../../utils/validateSchemas";

function ForgotPasswordPage() {
	const dispatch = useDispatch();


	const { handleChange, handleSubmit, handleBlur, values, isValid, dirty, errors } = useFormik({
		initialValues: {
			email: "",
		},
		onSubmit(values) {
			dispatch(postPasswordForgotFetch(values));
			dispatch(setUserData(values))
		},
		validationSchema: ForgotPasswordSchema
	});


	const inputs = [
		<Input
			key="email"
			type="email"
			name="email"
			error={!!errors.email}
			errorText={errors.email}
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.email}
			placeholder='Укажите Email'
		/>,
	];

	console.log(isValid)

	return (
		<AuthTemplate
			id="forgotPasswordForm"
			title="Восстановление пароля"
			onSubmit={handleSubmit}
			inputs={inputs}
			button={<Button disabled={!isValid || !dirty}>Восстановить</Button>}
			additionActions={[
				<AdditionalAction
					description="Вспомнили пароль?"
					linkText="Войти"
					to="/login"
					key="entrance"
				/>,
			]}
		/>
	);
}

export default ForgotPasswordPage;

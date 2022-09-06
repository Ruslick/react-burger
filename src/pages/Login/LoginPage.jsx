import React from "react";
import {
	Button,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AdditionalAction from "../../components/ui/AdditionalAction/AdditionalAction";
import AuthTemplate from "../../components/AuthTemplate/AuthTemplate";
import { useDispatch} from "react-redux";
import { useFormik } from "formik";
import { LoginSchema } from "../../utils/validateSchemas";
import { postLoginFetch } from "../../utils/requests";

function LoginPage() {
	const dispatch = useDispatch();

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
			email: "",
			password: "",
		},
		onSubmit(values) {
			dispatch(postLoginFetch(values));
		},
		validationSchema: LoginSchema,
	});

	const inputs = [
		<Input
			key="email"
			type="email"
			name="email"
			error={touched.email && !!errors.email}
			errorText={errors.email}
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.email}
			placeholder="E-mail"
		/>,
		<Input
			key="password"
			type="password"
			name="password"
			error={touched.password && !!errors.password}
			errorText={errors.password}
			onChange={handleChange}
			onBlur={handleBlur}
			value={values.password}
			placeholder="Пароль"
		/>,
	];
	return (
		<AuthTemplate
			title="Вход"
			onSubmit={handleSubmit}
			inputs={inputs}
			button={<Button disabled={!isValid || !dirty}>Войти</Button>}
			additionActions={[
				<AdditionalAction
					linkText="Зарегистрироваться"
					to="/register"
					description="Вы — новый пользователь?"
					key="register"
				/>,

				<AdditionalAction
					linkText="Восстановить пароль"
					to="/forgot-password"
					description="Забыли пароль?"
					key="forgot"
				/>,
			]}
		/>
	);
}

export default LoginPage;

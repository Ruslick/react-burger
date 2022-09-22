import React, { useMemo } from "react";
import {
	Button,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AdditionalAction from "../../components/ui/AdditionalAction/AdditionalAction";
import AuthTemplate from "../../components/AuthTemplate/AuthTemplate";
import { useFormik } from "formik";
import { LoginSchema } from "../../utils/validateSchemas";
import useAuth from "../../hooks/useAuth";
import NavigateToPrev from "../../components/hocs/NavigateToPrev/NavigateToPrev";
import PasswordInput from "../../components/ui/PasswordInput/PasswordInput";

function LoginPage() {
	const Auth = useAuth();

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
		async onSubmit(values) {
			Auth.login(values);
		},
		validationSchema: LoginSchema,
	});

	const inputs = useMemo(
		() => [
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
			<PasswordInput
				key="password"
				error={touched.password && !!errors.password}
				errorText={errors.password}
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.password}
				placeholder="Пароль"
			/>,
		],
		[
			errors.email,
			errors.password,
			handleBlur,
			handleChange,
			touched.email,
			touched.password,
			values.email,
			values.password,
		]
	);

	const additionActions = useMemo(
		() => [
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
		],
		[]
	);
	return Auth.succsess ? (
		<NavigateToPrev />
	) : (
		<AuthTemplate
			title="Вход"
			onSubmit={handleSubmit}
			inputs={inputs}
			button={<Button disabled={!isValid || !dirty}>Войти</Button>}
			additionActions={additionActions}
		/>
	);
}

export default LoginPage;

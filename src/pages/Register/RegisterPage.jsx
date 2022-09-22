import React, { useMemo } from "react";
import {
	Button,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AdditionalAction from "../../components/ui/AdditionalAction/AdditionalAction";
import AuthTemplate from "../../components/AuthTemplate/AuthTemplate";
import { useFormik } from "formik";
import { RegisterSchema } from "../../utils/validateSchemas";
import useAuth from "../../hooks/useAuth";
import NavigateToPrev from "../../components/hocs/NavigateToPrev/NavigateToPrev";
import PasswordInput from "../../components/ui/PasswordInput/PasswordInput";

function RegisterPage() {
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
			name: "",
			email: "",
			password: "",
		},
		onSubmit(values) {
			Auth.register(values);
		},
		validationSchema: RegisterSchema,
	});

	const inputs = useMemo(
		() => [
			<Input
				key="name"
				type="text"
				name="name"
				error={touched.name && !!errors.name}
				errorText={errors.name}
				onChange={handleChange}
				onBlur={handleBlur}
				value={values.name}
				placeholder="Имя"
			/>,
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
			errors.name,
			errors.password,
			handleBlur,
			handleChange,
			touched.email,
			touched.name,
			touched.password,
			values.email,
			values.name,
			values.password,
		]
	);
	const additionalActions = useMemo(
		() => [
			<AdditionalAction
				description="Уже зарегистрированы?"
				linkText="Войти"
				to="/login"
				key="entrance"
			/>,
		],
		[]
	);
	return Auth.succsess ? (
		<NavigateToPrev />
	) : (
		<AuthTemplate
			title="Регистрация"
			inputs={inputs}
			additionActions={additionalActions}
			button={<Button disabled={!isValid || !dirty}>Зарегистрироваться</Button>}
			onSubmit={handleSubmit}
		/>
	);
}

export default RegisterPage;

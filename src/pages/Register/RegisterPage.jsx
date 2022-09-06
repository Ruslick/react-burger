import React from "react";
import {
	Button,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";

import AdditionalAction from "../../components/ui/AdditionalAction/AdditionalAction";
import AuthTemplate from "../../components/AuthTemplate/AuthTemplate";
import { useDispatch } from "react-redux";
import { useFormik } from "formik";
import { RegisterSchema } from "../../utils/validateSchemas";
import { postRegisterFetch } from "../../utils/requests";

function RegisterPage() {
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
			name: "",
			email: "",
			password: "",
		},
		onSubmit(values) {
			dispatch(postRegisterFetch(values));
		},
		validationSchema: RegisterSchema,
	});

	const inputs = [
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
	const additionalActions = [
		<AdditionalAction
			description="Уже зарегистрированы?"
			linkText="Войти"
			to="/login"
			key="entrance"
		/>,
	];
	return (
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

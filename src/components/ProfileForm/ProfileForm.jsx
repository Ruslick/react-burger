import {
	Button,
	Input,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

import { updateUserData } from "../../utils/requests";
import { RegisterSchema } from "../../utils/validateSchemas";
import PasswordInput from "../ui/PasswordInput/PasswordInput";
import style from "./ProfileForm.module.css";

function ProfileForm() {
	const dispatch = useDispatch();
	const [unlockedInput, setUnlockedInput] = useState(null);
	const userData = useSelector((store) => store.authSlice.user || {});

	let initialValues = { email: "", name: "", password: "", ...userData };

	const {
		handleChange,
		handleSubmit,
		handleBlur,
		values,
		errors,
		touched,
		dirty,
		setValues,
		resetForm,
	} = useFormik({
		initialValues,
		onBlur: () => {
			setUnlockedInput(null);
		},
		onSubmit(values) {
			const editedValuesArray = Object.entries(values).filter(
				(v) => v[1] !== initialValues[v[0]]
			);
			const editedValues = Object.fromEntries(editedValuesArray);
			dispatch(updateUserData(editedValues));
			resetForm();
		},

		validationSchema: RegisterSchema,
	});
	const iconClickHandle = async (e) => {
		const input = e.currentTarget.previousSibling;
		await setUnlockedInput(input.name);
		input.click();
	};

	const onBlurHandle = (e) => {
		handleBlur(e);
		setUnlockedInput(null);
	};

	const cancelHandle = () => {
		resetForm();
	};

	useEffect(() => {
		resetForm({ values: initialValues });
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [userData]);

	const inputs = [
		<Input
			key="name"
			type="text"
			name="name"
			error={touched.name && !!errors.name}
			errorText={errors.name}
			onChange={handleChange}
			onBlur={onBlurHandle}
			value={values.name}
			placeholder="Имя"
			icon="EditIcon"
			disabled={unlockedInput !== "name"}
			onIconClick={iconClickHandle}
		/>,
		<Input
			key="email"
			type="email"
			name="email"
			error={touched.email && !!errors.email}
			errorText={errors.email}
			onChange={handleChange}
			onBlur={onBlurHandle}
			value={values.email}
			disabled={unlockedInput !== "email"}
			onIconClick={iconClickHandle}
			placeholder="E-mail"
			icon="EditIcon"
		/>,
		<PasswordInput
			key="password"
			error={touched.password && !!errors.password}
			errorText={errors.password}
			onChange={handleChange}
			onBlur={onBlurHandle}
			onFocus={() => {
				setValues((values) => ({ ...values, password: "" }), false);
			}}
			value={values.password}
			placeholder="Введите новый пароль"
		/>,
	];

	return (
		<form className={style.form} onSubmit={handleSubmit}>
			{inputs}
			<div style={{ display: dirty ? "initial" : "none" }}>
				<Button htmlType="button" type="button" onClick={cancelHandle}>
					Отмена
				</Button>
				<Button htmlType="submit">Сохранить</Button>
			</div>
		</form>
	);
}

export default ProfileForm;

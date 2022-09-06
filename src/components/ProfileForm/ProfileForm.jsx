import { Input } from "@ya.praktikum/react-developer-burger-ui-components";
import { useFormik } from "formik";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { changeUserData } from "../../utils/requests";
import { RegisterSchema } from "../../utils/validateSchemas";
import style from "./ProfileForm.module.css";

function ProfileForm() {
	const dispatch = useDispatch();
	const [unlockedInput, setUnlockedInput] = useState(null);

	const { name, email, password } = useSelector(
		(store) => store.authSlice.data
	);

	const { handleChange, handleSubmit, handleBlur, values, errors, touched } =
		useFormik({
			initialValues: {
				name,
				email,
				password,
			},
			onBlur: () => {
				console.log("blur");
				setUnlockedInput(null);
			},

			validationSchema: RegisterSchema,
		});
	const iconClickHandle = async (e) => {
		const input = e.currentTarget.previousSibling;
		await setUnlockedInput(input.name);
		input.focus();
	};

	const onBlurHandle = (e) => {
		handleBlur(e);
		setUnlockedInput(null);
		dispatch(changeUserData({ [e.target.name]: e.target.value }));
	};

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
		<Input
			key="password"
			type="password"
			name="password"
			error={touched.password && !!errors.password}
			errorText={errors.password}
			onChange={handleChange}
			onBlur={onBlurHandle}
			value={values.password}
			disabled={unlockedInput !== "password"}
			onIconClick={iconClickHandle}
			placeholder="Пароль"
			icon="EditIcon"
		/>,
	];

	return (
		<form className={style.form} onSubmit={handleSubmit}>
			{inputs}
		</form>
	);
}

export default ProfileForm;

import { string, object } from "yup";

const email = string()
	.email("Некорректный e-mail")
	.required("Поле обязательно к заполнению");
const password = string();

const token = string()
	.required("Поле обязательно к заполнению")
	.length(36, "Пример : 6c768ecf-6b63-4bcf-bfe9-31061ae9f0cc");

const name = string().required("Поле обязательно к заполнению");

export const ForgotPasswordSchema = object().shape({
	email,
});

export const ResetPasswordSchema = object().shape({
	password,
	token,
});

export const LoginSchema = object().shape({
	email,
	password,
});

export const RegisterSchema = object().shape({
	name,
	email,
	password,
});

import { string, object} from "yup";

const email = string()
	.email("Некорректный e-mail")
	.required("Поле обязательно к заполнению");
const password = string()
	.min(6, "Минимум 6 символов")
	.required("Поле обязательно к заполнению");

const token = string()
	.length(6, "Код состоит из 6 символов")
	.required("Поле обязательно к заполнению");

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


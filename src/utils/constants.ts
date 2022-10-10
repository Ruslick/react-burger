const URL = "https://norma.nomoreparties.space";
const SOCKET_URL = 'wss://norma.nomoreparties.space'


export const INGRIDIENTS_URL = `${URL}/api/ingredients`;
export const ORDERS_URL = `${URL}/api/orders`;

export const REGISTER_URL = `${URL}/api/auth/register`;
export const LOGIN_URL = `${URL}/api/auth/login`;
export const LOGUOT_URL = `${URL}/api/auth/logout`;
export const UPDATE_TOKEN_URL = `${URL}/api/auth/token`;
export const USER_DATA_URL = `${URL}/api/auth/user`;


export const PASSWORD_FORGOT_URL = `${URL}/api/password-reset`;
export const PASSWORD_RESET_URL = `${URL}/api/password-reset/reset`;

export const ALL_ORDERS_SOCKET_URL = `${SOCKET_URL}/orders/all`
export const USER_ORDERS_SOCKET_URL = `${SOCKET_URL}/orders`
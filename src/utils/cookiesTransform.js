export const getCookie = (desiredCookie) => {
	const cookies = document.cookie.split("; ");
	return cookies.find((c) => c.startsWith(desiredCookie))?.split("=")[1];
};

export const removeCookie = (deletableCookie) => {
	document.cookie = `${deletableCookie}=""; max-age=0`;
	return deletableCookie;
};

export const saveTokens = ({ accessToken, refreshToken }) => {
	if (accessToken && refreshToken) {
		document.cookie = `token=${accessToken.split("Bearer ")[1]}`;
		document.cookie = `refreshToken=${refreshToken} `;
	}
};

export const removeTokens = async () => {
	removeCookie("token");
	removeCookie("refreshToken");
};

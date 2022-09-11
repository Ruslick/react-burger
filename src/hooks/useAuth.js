import { useDispatch, useSelector } from "react-redux";
import {
	postLoginFetch,
	postLogoutFetch,
	postRegisterFetch,
} from "../services/requests";

function useAuth() {
	const dispatch = useDispatch();
	const { isLoaded, user } = useSelector((store) => {
		return store.authSlice;
	});
	class Auth {
		static succsess = user;
		static isLoaded = isLoaded;
		static login(data) {
			dispatch(postLoginFetch(data));
		}
		static register(data) {
			dispatch(postRegisterFetch(data));
		}
		static logout() {
			dispatch(postLogoutFetch());
		}
	}
	return Auth;
}

export default useAuth;

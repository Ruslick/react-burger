import { useAppDispatch, useAppSelector } from "../services";
import {
	postLoginFetch,
	postLogoutFetch,
	postRegisterFetch,
} from "../services/requests";

function useAuth() {
	const dispatch = useAppDispatch();
	const { isLoaded, user } = useAppSelector((store) => {
		return store.authSlice;
	});
	class Auth {
		static succsess = user;
		static isLoaded = isLoaded;
		
		static login(data: object) {
			dispatch(postLoginFetch(data));
		}
		static register(data: object) {
			dispatch(postRegisterFetch(data));
		}
		static logout() {
			dispatch(postLogoutFetch());
		}
	}
	return Auth;
}

export default useAuth;

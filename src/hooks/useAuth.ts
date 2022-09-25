import { useDispatch, useSelector } from "react-redux";
import {
	postLoginFetch,
	postLogoutFetch,
	postRegisterFetch,
} from "../services/requests";

function useAuth() {
	const dispatch = useDispatch();
	const { isLoaded, user } = useSelector<any, any>((store) => {
		return store.authSlice;
	});
	class Auth {
		static succsess = user;
		static isLoaded = isLoaded;
		static login(data: object) {
			dispatch(postLoginFetch(data) as any);
		}
		static register(data: object) {
			dispatch(postRegisterFetch(data) as any);
		}
		static logout() {
			dispatch(postLogoutFetch() as any);
		}
	}
	return Auth;
}

export default useAuth;

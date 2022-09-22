import { useDispatch, useSelector } from "react-redux";
import { getUsersFetch } from "../services/requests";
import { resetLoaded } from "../services/slices/authSlice";

function useCheckAuth() {
	const dispatch = useDispatch();
	const { isLoaded, user } = useSelector((store) => store.authSlice);
	const checkAuth = () => {
		dispatch(getUsersFetch());
	};
	const doResetLoaded = () => {
		dispatch(resetLoaded());
	};

	return { isLoaded, user, checkAuth, doResetLoaded };
}

export default useCheckAuth;

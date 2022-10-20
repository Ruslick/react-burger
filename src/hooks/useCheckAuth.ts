import { useAppDispatch, useAppSelector } from "../services";
import { getUsersFetch } from "../services/requests";
import { resetLoaded } from "../services/slices/authSlice";

function useCheckAuth() {
	const dispatch = useAppDispatch();
	const { isLoaded, user } = useAppSelector((store) => store.authSlice);
	const checkAuth: VoidFunction = () => {
		dispatch(getUsersFetch());
	};
	const doResetLoaded: VoidFunction = () => {
		dispatch(resetLoaded());
	};

	return { isLoaded, user, checkAuth, doResetLoaded };
}

export default useCheckAuth;

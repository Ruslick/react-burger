import { useDispatch, useSelector } from "react-redux";
import { getUsersFetch } from "../services/requests";
import { resetLoaded } from "../services/slices/authSlice";

function useCheckAuth() {
	const dispatch = useDispatch();
	const { isLoaded, user } = useSelector<any, any>((store) => store.authSlice);
	const checkAuth = () => {
		dispatch(getUsersFetch() as any);
	};
	const doResetLoaded = () => {
		dispatch(resetLoaded(null) as any );
	};

	return { isLoaded, user, checkAuth, doResetLoaded };
}

export default useCheckAuth;
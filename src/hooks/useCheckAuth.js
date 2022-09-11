import { useDispatch, useSelector } from "react-redux";
import { getUsersFetch } from "../services/requests";

function useCheckAuth() {
	const dispatch = useDispatch();
	const { isLoaded, user } = useSelector((store) => store.authSlice);
	const checkAuth = () => {
		dispatch(getUsersFetch());
	};

	return { isLoaded, user, checkAuth };
}

export default useCheckAuth;

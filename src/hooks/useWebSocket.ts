import { useAppDispatch } from "../services";
import { connectWs, disconnectWs } from "../services/slices/sockerSlice";

export const useWebsocket = () => {
	const dispatch = useAppDispatch();
	const service = {
		connect: (url: string) => {
			dispatch(connectWs(url));
		},
		disconnect: () => {
			dispatch(disconnectWs());
		},
	};
	return service;
};

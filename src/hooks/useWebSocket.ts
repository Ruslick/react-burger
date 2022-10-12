import { useAppDispatch } from "../services";
import { connectWs, disconnectWs } from "../services/slices/socketsSlice";

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

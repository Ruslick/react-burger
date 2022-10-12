import { Middleware } from "redux";
import { TWsActions } from "../utils/types";


let socket: null | WebSocket = null;

export const webSocketMiddleware = ({
	closeWs,
	errorWs,
	messageWs,
	openWs,
	disconnectWs,
	connectWs
}: TWsActions): Middleware =>
	(store) => (next) => (action) => {
		switch (action.type) {
			case connectWs(null).type:
				if (socket !== null) break;
				socket = new WebSocket(action.payload);
				socket.onopen = () => {
					store.dispatch(openWs());
				};

				socket.onerror = () => {
					store.dispatch(errorWs());
				};

				socket.onmessage = (event: MessageEvent) => {
					store.dispatch(messageWs(JSON.parse(event.data)));
				};

				socket.onclose = () => {
					store.dispatch(closeWs());
				};

				break;
			case disconnectWs().type:
				socket?.close();
				socket = null;
				break;
		}
		next(action);
	};


import { Middleware, MiddlewareAPI } from "redux";
import { useAppDispatch } from ".";
import { disconnectWs, errorWs, messageWs, openWs } from "./slices/socketsSlice";
let socket: null | WebSocket = null;

const onClose = (store: MiddlewareAPI) => () => {
	store.dispatch(disconnectWs());
};

const onMessage = (store: MiddlewareAPI) => (event: MessageEvent) => {
	store.dispatch(messageWs(JSON.parse(event.data)));
};

const onError = (store: MiddlewareAPI) => () => {
	store.dispatch(errorWs());
};


const onOpen = (store: MiddlewareAPI) => () => {
	store.dispatch(openWs());
};

export const webSocketMiddleware: Middleware = (store) => (next) => (action) => {
		switch (action.type) {
			case "WS_CONNECT":
				if (socket !== null) break
				socket = new WebSocket(action.payload);
				socket.onopen = onOpen(store)
				socket.onerror = onError(store)
				socket.onmessage = onMessage(store);
				socket.onclose = onClose(store);
				break;
			case "WS_DISCONNECT":
				socket?.close();
				socket = null
				break;
		}
		next(action);
	};

export const useWebsocket = () => {
	const dispatch = useAppDispatch();
	const service = {
		connect: (url: string) => {
			dispatch({ type: "WS_CONNECT", payload: url });
		},
		disconnect: () => {
			dispatch({ type: "WS_DISCONNECT" });
		},
	};
	return service;
};

import { Provider } from "react-redux";
import { HashRouter } from "react-router-dom";
import AppRoutes from "../../pages";
import { store } from "../../services";

export const App = () => {
	return (
		<Provider store={store}>
			<HashRouter>
				<AppRoutes />
			</HashRouter>
		</Provider>
	);
};

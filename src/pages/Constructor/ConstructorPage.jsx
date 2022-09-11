import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from "./ConstructorPage.module.css";

import BurgerIngridients from "../../components/BurgerIngredients/BurgerIngridients";
import BurgerConstructor from "../../components/BurgerConstructor/BurgerConstructor";
import { getIngridientsFetch } from "../../utils/requests";
import Loading from "../../components/statuses/Loading/Loading";
import Failed from "../../components/statuses/Failed/Failed";
import { Outlet } from "react-router-dom";

function ConstructorPage() {
	const dispatch = useDispatch();

	const { status, error } = useSelector((state) => state.ingridientsSlice);

	useEffect(() => {
		dispatch(getIngridientsFetch());
	}, [dispatch]);

	const content = useMemo(() => {
		if (status === "loading") {
			return <Loading />;
		}
		if (status === "failed") {
			return <Failed />;
		}

		if (status === "received") {
			return (
				<>
					<DndProvider backend={HTML5Backend}>
						<BurgerIngridients />
						<BurgerConstructor />
					</DndProvider>
					<Outlet />
				</>
			);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [error, status]);

	return <section className={styles.wrapper}>{content}</section>;
}

export default ConstructorPage;

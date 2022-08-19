/////////////
import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

import styles from "./App.module.css";

import { getIngridientsFetch } from "../../utils/getIngridientsRequest";

import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";

function App() {
	const dispatch = useDispatch();

	const { status, error } = useSelector((state) => state.ingridientsSlice);

	useEffect(() => {
		dispatch(getIngridientsFetch());
	}, [dispatch]);

	const content = useMemo(() => {
		if (status === "loading") {
			return <p className="text text_type_main-large mt-10">{"Загрузка..."}</p>;
		}
		if (status === "failed") {
			console.warn(error);
			return (
				<p className="text text_type_main-large mt-10">
					{"Упс произошла ошибка :("}
				</p>
			);
		}

		if (status === "received") {
			return (
				<>
					<DndProvider backend={HTML5Backend}>
						<BurgerIngridients />
						<BurgerConstructor />
					</DndProvider>
				</>
			);
		}
	}, [error, status]);

	return (
		<>
			<AppHeader />
			<div className="container">
				<section className={styles.wrapper}>{content}</section>
			</div>
		</>
	);
}

export default App;

import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import IngridientsContextApi from "../../utils/IngridientsContextApi";
import { getIngridients } from "../../utils/requests";
import { useEffect, useState } from "react";

function App() {
	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	useEffect(() => {
		getIngridients()
			.then((response) => {
				setData(response);
			})
			.catch((e) => {
				console.warn(e);
			})
			.finally(() => {
				setIsLoading(false);
			});
	}, []);
	return isLoading ? (
		<h1>{"Loading..."}</h1>
	) : !data ? (
		<h1>{"Упс произошла ошибка :("}</h1>
	) : (
		<IngridientsContextApi.Provider value={{ data }}>
			<AppHeader />
			<div className="container">
				<section className={styles.wrapper}>
					<>
						<BurgerIngridients />
						<BurgerConstructor />
					</>
				</section>
			</div>
		</IngridientsContextApi.Provider>
	);
}

export default App;

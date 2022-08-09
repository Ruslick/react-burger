import React from "react";
import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
import data from "../../utils/data";

function App() {
	return (
		<>
			<AppHeader />
			<div className="container">
				<section className={styles.wrapper}>
					<BurgerIngridients ingridients={data} />
					<BurgerConstructor />
				</section>
			</div>
		</>
	);
}

export default App;

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./Tabs.module.css";

function BurgerIngridientsTabs() {
	const [current, setCurrent] = React.useState("bun");
	return (
		<div className={styles.wrapper + " mb-10"}>
			<Tab value="bun" active={current === "bun"} onClick={setCurrent}>
				Булки
			</Tab>
			<Tab value="sauce" active={current === "sauce"} onClick={setCurrent}>
				Соусы
			</Tab>
			<Tab value="main" active={current === "main"} onClick={setCurrent}>
				Начинки
			</Tab>
		</div>
	);
}

export default BurgerIngridientsTabs;

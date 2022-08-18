import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./Tabs.module.css";
import PropTypes from "prop-types";

function BurgerIngridientsTabs({ selectedCategoria, setSelectedCategoria }) {
	return (
		<div className={styles.wrapper + " mb-10"}>
			<Tab
				value="bun"
				active={selectedCategoria === "bun"}
				onClick={setSelectedCategoria}
			>
				Булки
			</Tab>
			<Tab
				value="sauce"
				active={selectedCategoria === "sauce"}
				onClick={setSelectedCategoria}
			>
				Соусы
			</Tab>
			<Tab
				value="main"
				active={selectedCategoria === "main"}
				onClick={setSelectedCategoria}
			>
				Начинки
			</Tab>
		</div>
	);
}

BurgerIngridientsTabs.propTypes = {
	selectedCategoria: PropTypes.string.isRequired,
	setSelectedCategoria: PropTypes.func.isRequired,
};

export default BurgerIngridientsTabs;

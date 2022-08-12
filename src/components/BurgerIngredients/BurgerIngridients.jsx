import React from "react";
import Tabs from "../ui/Tabs/Tabs";
import styles from "./BurgerIngridients.module.css";
import PropTypes from "prop-types";
import IngridientsList from "./IngridientsList/IngridientsList";

function BurgerIngridients({ data, ...props }) {
	return (
		<section>
			<div className='mt-10 mb-5'>
				<p className="text text_type_main-large">Соберите бургер</p>
			</div>
			<Tabs />
			<ul
				className={`${styles.list} scroll`}
				style={{ height: window.innerHeight / 2 }}
			>
				<IngridientsList ingridients={data} type="bun">
					Булки
				</IngridientsList>
				<IngridientsList ingridients={data} type="sauce">
					Cоусы
				</IngridientsList>
				<IngridientsList ingridients={data} type="main">
					Начинки
				</IngridientsList>
			</ul>
		</section>
	);
}

BurgerIngridients.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerIngridients;

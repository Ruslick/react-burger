import {
	Counter,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import PropTypes from "prop-types";
import styles from "./Ingridient.module.css";
import IngredientDetails from "../IngredientDetails/IngredientDetails";

import { ingridientShape } from "../../../utils/types";

function Ingridient({ ingridient, count, ...props }) {
	const { name, image, price } = ingridient;
	const [isDisplayed, setIsDisplayed] = useState(false);

	return (
		<>
			<li
				className={styles.item}
				onClick={() => {
					setIsDisplayed(true);
				}}
			>
				<div className={styles.counter}>
					{count ? <Counter count={count} size="default" /> : null}
				</div>
				<img src={image} alt={name} className="mr-4 mb-4" />
				<div className={styles.price + " mt-1 mb-1"}>
					<p className="text text_type_digits-default">{price + "\u00A0"}</p>
					<CurrencyIcon />
				</div>

				<p className="text text_type_main-small">{name}</p>
			</li>
			{isDisplayed && (
				<IngredientDetails
					ingridient={ingridient}
					onClose={() => {
						setIsDisplayed(false);
					}}
				/>
			)}
		</>
	);
}

// проверка типов ингридиента
Ingridient.propTypes = {
	ingridient: PropTypes.shape(ingridientShape).isRequired,
	count: PropTypes.number.isRequired,
};

export default Ingridient;

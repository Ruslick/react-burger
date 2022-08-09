import {
	Counter,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";
import styles from "./Ingridient.module.css";
import { ingridientShape } from "../../../utils/types";

function Ingridient({ ingridient, count, ...props }) {
	const { name, image, price } = ingridient;
	return (
		<li className={styles.item}>
			<div className={styles.counter}>
				{count ? <Counter count={count} size="default" /> : null}
			</div>
			<img src={image} alt={name} className={styles.image} />
			<div className={styles.price}>
				<p className="text text_type_digits-default">{price + "\u00A0"}</p>
				<CurrencyIcon />
			</div>

			<p className="text text_type_main-small">{name}</p>
		</li>
	);
}

// проверка типов ингридиента
Ingridient.propTypes = {
	ingridient: PropTypes.shape(ingridientShape),
};

export default Ingridient;

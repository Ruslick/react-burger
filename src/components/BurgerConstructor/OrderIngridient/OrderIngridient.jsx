import {
	ConstructorElement,
	DragIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./OrderIngridient.module.css";
import PropTypes from "prop-types";
import { ingridientShape } from "../../../utils/types";

function OrderIngridient({ ingridient, isLocked, type }) {
	const { name, price, image } = ingridient;
	const postfixName =
		type === "top"
			? `${name} (верх)`
			: type === "bottom"
			? `${name} (низ)`
			: name;

	return (
		<div className={styles.constructorElement}>
			{!isLocked ? (
				<div className={styles.iconWrapper}>
					<DragIcon type="primary" />
				</div>
			) : (
				<div className={styles.iconWrapper}></div>
			)}
			<ConstructorElement
				type={type}
				isLocked={isLocked}
				text={postfixName}
				price={price}
				thumbnail={image}
			/>
		</div>
	);
}

// Проверка типов ингридиета
OrderIngridient.propTypes = {
	ingridient: PropTypes.shape(ingridientShape),
	type: PropTypes.string,
	isLocked: PropTypes.bool,
};

export default OrderIngridient;

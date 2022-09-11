import {
	Counter,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import PropTypes from "prop-types";
import styles from "./Ingridient.module.css";

import { ingridientShape } from "../../../utils/types";
import { useDispatch, useSelector } from "react-redux";
import { useDrag } from "react-dnd";
import { setCurrentIngridient } from "../../../services/slices/currentIngridientSlice";

function Ingridient({ ingridient }) {
	const { name, image, price } = ingridient;

	const dispatch = useDispatch();

	const currentBun = useSelector((state) => state.orderSlice.currentBun);
	const canDrag = ingridient.type === "bun" || currentBun;

	const [, dragItem] = useDrag({
		type: "ingridient",
		item: ingridient,
		canDrag() {
			return canDrag;
		},
	});

	const qty = useSelector(
		(state) =>
			state.orderSlice.orderIngridients.filter(
				(orderIngridient) => orderIngridient._id === ingridient._id
			).length
	);
	const clinkHandle = () => {
		dispatch(setCurrentIngridient({ ...ingridient }));
	};

	return (
		<>
			<li
				className={styles.item}
				style={{ opacity: canDrag ? 1 : 0.5 }}
				onClick={clinkHandle}
				ref={dragItem}
			>
				<div className={styles.counter}>
					{qty ? <Counter count={qty} size="default" /> : null}
				</div>
				<img src={image} alt={name} className="mr-4 mb-4" />
				<div className={styles.price + " mt-1 mb-1"}>
					<p className="text text_type_digits-default">{price + "\u00A0"}</p>
					<CurrencyIcon />
				</div>
				<p className="text text_type_main-small">{name}</p>
			</li>
		</>
	);
}

Ingridient.propTypes = {
	ingridient: PropTypes.shape(ingridientShape).isRequired,
};

export default Ingridient;

import React, { FC, useMemo } from "react";
import { Link, useLocation } from "react-router-dom";
import { useDrag } from "react-dnd";

import styles from "./Ingridient.module.css";
import { IIngridient } from "../../../utils/types/index";

import {
	Counter,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { useAppSelector } from "../../../services";

const Ingridient: FC<{ ingridient: IIngridient }> = ({ ingridient }) => {
	const { name, image, price, _id } = ingridient;

	const location = useLocation();

	const { currentBun, orderIngridients } = useAppSelector(
		(state) => state.orderSlice
	);

	const qty = useMemo(
		() =>
			orderIngridients.filter(
				(orderIngridient: IIngridient) => orderIngridient._id === ingridient._id
			).length,
		[ingridient, orderIngridients]
	);

	const canDrag = ingridient.type === "bun" || currentBun;

	const [, dragItem] = useDrag({
		type: "ingridient",
		item: ingridient,
	});
	return (
		<li style={{ opacity: canDrag ? 1 : 0.5 }} ref={canDrag && dragItem}>
			<Link
				className={styles.item}
				to={`/ingridient/${_id}`}
				state={{ from: location.pathname }}
			>
				<div className={styles.counter}>
					{qty ? <Counter count={qty} size="default" /> : null}
				</div>
				<img src={image} alt={name} className="mr-4 mb-4" />
				<div className={styles.price + " mt-1 mb-1"}>
					<p className="text text_type_digits-default">{price + "\u00A0"}</p>
					<CurrencyIcon type="primary" />
				</div>
				<p className="text text_type_main-small">{name}</p>
			</Link>
		</li>
	);
};

export default Ingridient;

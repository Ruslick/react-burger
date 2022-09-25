import React from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useDrag } from "react-dnd";

import styles from "./Ingridient.module.css";
import { IIngridient } from "../../../utils/types/index";

import {
	Counter,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function Ingridient({ ingridient }: {ingridient: IIngridient}) {
	const { name, image, price, _id } = ingridient;
	const navigate = useNavigate();
	const location = useLocation()

	const currentBun = useSelector<any, any>((state) => state.orderSlice.currentBun);
	const qty = useSelector<any, any>(
		(state) =>
			state.orderSlice.orderIngridients.filter(
				(orderIngridient: IIngridient) => orderIngridient._id === ingridient._id
			).length
	);
	const canDrag = ingridient.type === "bun" || currentBun;

	const [, dragItem] = useDrag({
		type: "ingridient",
		item: ingridient,
		canDrag() {
			return canDrag;
		},
	});


	const clinkHandle = () => {
		navigate(`/ingridient/${_id}`, {state: {from: location.pathname}});
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
					<CurrencyIcon type="primary" />
				</div>
				<p className="text text_type_main-small">{name}</p>
			</li>
		</>
	);
}


export default Ingridient;

import React, { ReactElement, useCallback, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useDrop } from "react-dnd";

import OrderIngridient from "../OrderIngridient/OrderIngridient";

import styles from "./Order.module.css";

import {
	addOrderIngridient,
	switchBun,
	updateOrderIngridients,
} from "../../../services/slices/orderSlice";

import { IIngridient } from "../../../utils/types";

function Order() {
	const dispatch = useDispatch();
	const { currentBun, orderIngridients } = useSelector<any, any>(
		(state) => state.orderSlice
	);
	const [, ingridientDropTarget] = useDrop({
		accept: "ingridient",
		drop(item: IIngridient) {
			item.type === "bun"
				? dispatch(switchBun(item))
				: dispatch(addOrderIngridient(item));
		},
	});

	const moveCard = useCallback(
		(dragIndex, hoverIndex) => {
			const dragIngridient = orderIngridients[dragIndex];
			const newOrderIngridients = [...orderIngridients];

			newOrderIngridients.splice(dragIndex, 1);
			newOrderIngridients.splice(hoverIndex, 0, dragIngridient);

			dispatch(updateOrderIngridients({ newOrderIngridients }));
		},
		[orderIngridients, dispatch]
	);

	const mappedIngridients = useMemo(() => {
		return orderIngridients
			.map((ingridient: IIngridient, index: number) => (
				<OrderIngridient
					ingridient={ingridient}
					key={ingridient._number}
					index={index}
					moveCard={moveCard}
				/>
			))
			.filter((i: ReactElement) => {
				return i.props.ingridient.type !== "bun";
			});
	}, [moveCard, orderIngridients]);

	return (
		<section
			className={styles.wrapper}
			style={{ height: window.innerHeight / 2 }}
			ref={ingridientDropTarget}
		>
			{!orderIngridients.length ? (
				<p className={`${styles.placeholder} text text_type_main-large`}>
					Выберите булку...
				</p>
			) : (
				<>
					<OrderIngridient
						ingridient={currentBun}
						position={"top"}
						isLocked={true}
						moveCard={moveCard}
					/>
					<div className={styles.list + " scroll"}>
						{!mappedIngridients.length ? (
							<p
								className={`${styles.placeholder} text text_type_main-large mt-10 mb-10`}
							>
								Выберите ингридиент...
							</p>
						) : (
							<>{mappedIngridients}</>
						)}
					</div>
					<OrderIngridient
						ingridient={currentBun}
						position={"bottom"}
						isLocked={true}
						moveCard={moveCard}
					/>
				</>
			)}
		</section>
	);
}

export default Order;

import React, { useContext, useEffect } from "react";
import styles from "./Order.module.css";
import ingridientsContextApi from "../../../utils/ingridientsContextApi";
import orderContext from "../../../utils/orderContext";
import OrderIngridient from "../OrderIngridient/OrderIngridient";


function Order() {
	const { data } = useContext(ingridientsContextApi);
	const testData = data.filter((ingridient) => {
		if (ingridient.type === "bun") return false;
		return true;
	});

	const { orderState, orderDispatch } = useContext(orderContext);
	useEffect(
		() => {

			orderDispatch({ setOrderIngridients: testData, setBun: data[0] });
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const ingridients =
		orderState.orderIngridients &&
		orderState.orderIngridients
			.filter((ingridient) => {
				if (ingridient.type === "bun") return false;
				return true;
			})
			.map((ingridient, index) => {
				return (
					<OrderIngridient ingridient={ingridient} key={index} />
				);
			});

	return orderState.orderIngridients ? (
		<section
			className={styles.wrapper + " mt-25"}
			style={{ height: window.innerHeight / 2 }}
		>
			<OrderIngridient
				ingridient={orderState.bun}
				type={"top"}
				isLocked={true}
			/>
			<div className={styles.list + " scroll"}>{ingridients}</div>
			<OrderIngridient
				ingridient={orderState.bun}
				type={"bottom"}
				isLocked={true}
			/>
		</section>
	) : (
		<div>выберите булку...</div>
	);
}

export default Order;

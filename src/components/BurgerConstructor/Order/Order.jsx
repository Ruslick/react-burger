import React, { useContext, useEffect, useMemo } from "react";
import styles from "./Order.module.css";
import IngridientsContextApi from "../../../utils/IngridientsContextApi";
import OrderContext from "../../../utils/OrderContext";
import OrderIngridient from "../OrderIngridient/OrderIngridient";

function Order() {
	const { data } = useContext(IngridientsContextApi);
	const testData = useMemo(() => {
		return data.filter((ingridient) => {
			if (ingridient.type === "bun") return false;
			return true;
		});
	}, [data]);
	const { orderState, orderDispatch } = useContext(OrderContext);
	useEffect(
		() => {
			orderDispatch({ setOrderIngridients: testData, setBun: data[0] });
		},
		// eslint-disable-next-line react-hooks/exhaustive-deps
		[]
	);

	const ingridients = useMemo(() => {
		return (
			orderState.orderIngridients &&
			orderState.orderIngridients
				.filter((ingridient) => {
					if (ingridient.type === "bun") return false;
					return true;
				})
				.map((ingridient, index) => {
					return <OrderIngridient ingridient={ingridient} key={index} />;
				})
		);
	}, [orderState.orderIngridients]);

	return !orderState.orderIngridients ? (
		<div>выберите булку...</div>
	) : (
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
	);
}

export default Order;

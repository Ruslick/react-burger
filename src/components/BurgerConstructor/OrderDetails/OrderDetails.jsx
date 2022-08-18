import React, { useContext, useEffect, useState } from "react";
import done from "../../../images/done.svg";
import styles from "./OrderDetails.module.css";
import OrderContext from "../../../utils/OrderContext";
import { postOrder } from "../../../utils/requests";

export default function OrderDetails() {
	const { orderState } = useContext(OrderContext);

	const [isLoading, setIsLoading] = useState(true);
	const [data, setData] = useState(null);
	useEffect(() => {
		postOrder(orderState.orderIngridients)
			.then((response) => {
				setData(response);
			})
			.catch((e) => {
				console.warn(e);
			})
			.finally(() => {
				setIsLoading(false);
			});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return isLoading ? (
		<div className={styles.content + " pt-4 pr-30 pb-30 pl-30"}>
			<h1>{"Подождите..."}</h1>
		</div>
	) : !data ? (
		<div className={styles.content + " pt-4 pr-30 pb-30 pl-30"}>
			<h1 h1>{"Упс... Кажеться произошла ошибка:( "}</h1>
			<h1 h1>{"Пожалуйста перезагрузите страницу "}</h1>
		</div>
	) : (
		<div className={styles.content + " pt-4 pr-30 pb-30 pl-30"}>
			<p className={styles.digits + " text text_type_digits-large"}>
				{data.order.number}
			</p>
			<p className="text mt-8">идентификатор заказа</p>
			<img className={styles.done + " mt-15"} src={done} alt="done..." />
			<p className="text mt-15">Ваш заказ начали готовить</p>
			<p className="text text_color_inactive mt-2">
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
}

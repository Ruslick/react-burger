import React, { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./OrderDetails.module.css";


import done from "../../../images/done.svg";
import { postOrderFetch } from "../../../utils/requests";

export default function OrderDetails() {
	const dispatch = useDispatch();
	useEffect(() => {
		dispatch(postOrderFetch());
	}, [dispatch]);
	const { status, order } = useSelector((state) => state.orderSlice);

	const getContent = useCallback(() => {
		if (status === "notSended" || status === "loading") {
			return <h1>{"Подождите..."}</h1>;
		}
		if (status === "failed") {
			return (
				<>
					<p className="text text_type_main-large">{"Упс... Кажеться произошла ошибка:( "}</p>
					<p className="text text_type_main-large">{"Пожалуйста перезагрузите страницу "}</p>
				</>
			);
		}
		if (status === "sended") {
			return (
				<>
					<p className={styles.digits + " text text_type_digits-large"}>
						{order.number}
					</p>
					<p className="text mt-8">идентификатор заказа</p>

					<img className={styles.done + " mt-15"} src={done} alt="done..." />
					<p className="text mt-15">Ваш заказ начали готовить</p>
					<p className="text text_color_inactive mt-2">
						Дождитесь готовности на орбитальной станции
					</p>
				</>
			);
		}
	}, [status, order.number]);

	return (
		<div className={styles.content + " pt-4 pr-30 pb-30 pl-30"}>
			{getContent()}
		</div>
	);
}

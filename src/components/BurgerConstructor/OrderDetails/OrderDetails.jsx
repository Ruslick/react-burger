import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import styles from "./OrderDetails.module.css";

import done from "../../../images/done.svg";
import { postOrderFetch } from "../../../utils/requests";
import { Navigate } from "react-router-dom";
import { resetOrder } from "../../../services/slices/orderSlice";
import Loading from "../../statuses/Loading/Loading";

export default function OrderDetails() {
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(postOrderFetch());
		return () => {
			dispatch(resetOrder());
		};
	}, [dispatch]);

	const { order, status } = useSelector((state) => state.orderSlice);

	if (status === "loading") {
		return (
			<div className={styles.content + " pt-4 pr-30 pb-30 pl-30"}>
				<Loading />
			</div>
		);
	}

	if (status === "failed") {
		return <Navigate to="/" replace />;
	}

	return (
		<div className={styles.content + " pt-4 pr-30 pb-30 pl-30"}>
			<h1 className={styles.digits + " text text_type_digits-large"}>
				{order.number}
			</h1>
			<p className="text mt-8">идентификатор заказа</p>
			<img className={styles.done + " mt-15"} src={done} alt="done..." />
			<p className="text mt-15">Ваш заказ начали готовить</p>
			<p className="text text_color_inactive mt-2">
				Дождитесь готовности на орбитальной станции
			</p>
		</div>
	);
}

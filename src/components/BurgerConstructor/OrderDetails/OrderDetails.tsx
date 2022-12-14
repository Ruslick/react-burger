import React, { useEffect } from "react";

import styles from "./OrderDetails.module.css";

import done from "../../../images/done.svg";
import { Navigate } from "react-router-dom";
import { resetOrder } from "../../../services/slices/orderSlice";
import Loading from "../../statuses/Loading/Loading";
import { postOrderFetch } from "../../../services/requests";
import { useAppDispatch, useAppSelector } from "../../../services";


export default function OrderDetails() {
	const dispatch = useAppDispatch();
	useEffect(() => {
		dispatch(postOrderFetch());
		return () => {
			dispatch(resetOrder());
		};
	}, [dispatch]);

	const { order, status } = useAppSelector((state) => state.orderSlice);


 
	if (status === "failed") {
		return <Navigate to="/" replace />;
	}

	if (status === "received") {
		return (
			<div className={styles.content + " pt-4 mr-15 mb-15 ml-15"}>
				<h1 className={"text text_type_digits-large shadow"}>
					{order?.number}
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
	return (
			<Loading />
	);

}

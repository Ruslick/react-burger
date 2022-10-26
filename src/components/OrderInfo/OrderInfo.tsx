import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useWebsocket } from "../../hooks/useWebSocket";
import { useAppDispatch, useAppSelector } from "../../services";
import { setCurrentOrder } from "../../services/slices/orderSlice";
import {
	getFullOrderIngridients,
	getIngridientsWithCount,
} from "../../utils";
import {
	ALL_ORDERS_SOCKET_URL,
	USER_ORDERS_SOCKET_URL,
} from "../../utils/constants";
import { getCookie } from "../../utils/cookiesTransform";
import { IIngridientWithCount } from "../../utils/types";
import { CustomDate } from "../CustomDate/CustomDate";
import Loading from "../statuses/Loading/Loading";
import { IngridientWithCount } from "./IngridientWithCount";

import styles from "./OrderInfo.module.css";

export const OrderInfo: React.FC<{
	modal?: boolean;
	forUser?: boolean;
}> = ({ modal = false, forUser = false }) => {
	const orderId = useParams().id;

	const [orderName, setOrderName] = useState<number | null>(null);
	const { isConnected, socketData } = useAppSelector(
		(store) => store.socketSlice
	);

	const appIngridients = useAppSelector(
		(store) => store.ingridientsSlice.ingridients
	);
	const appStatus = useAppSelector((store) => store.ingridientsSlice.status);
	const currentOrder = useAppSelector((store) => store.orderSlice.currentOrder);
	const dispatch = useAppDispatch();

	const { connect, disconnect } = useWebsocket();

	useEffect(() => {
		if (!currentOrder && orderName) dispatch(setCurrentOrder(orderName));
	});
	useEffect(() => {
		let url;
		if (forUser) url = `${USER_ORDERS_SOCKET_URL}?token=${getCookie("token")}`;
		else url = ALL_ORDERS_SOCKET_URL;
		if (!modal) {
			connect(url);

			return () => {
				disconnect();
				dispatch(setCurrentOrder(undefined));
			};
		}

		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);
	if (appStatus === "received" && isConnected && socketData && appIngridients) {
		const order = socketData.orders.find((o) => orderId === o._id);

		if (!order) return <div>Заказ не найден</div>;
		if (!orderName) setOrderName(order.number);
		const fullIngridients = getFullOrderIngridients(
			order.ingredients,
			appIngridients
		);
		const { ingridientsWithCount, totalPrice } =
			getIngridientsWithCount(fullIngridients);

		const orderNumber = modal ? null : (
			<p className={`text text_type_digits-medium ${styles.number}`}>
				#{order.number}
			</p>
		);

		return (
			<div className={styles.wrapper}>
				{orderNumber}
				<p className={`text text_type_main-medium ${styles.title}`}>
					{order.name}
				</p>
				<p
					className={`text text_type_main-default text_color_success ${styles.status}`}
				>
					{order.status === "done" ? "Выполнен" : "Готовится"}
				</p>
				<p className={`text text_type_main-medium ${styles.composition}`}>
					Состав:
				</p>
				<ul className={`${styles.ingridients} scroll`}>
					{ingridientsWithCount.map((i: IIngridientWithCount, index) => (
						<IngridientWithCount key={index} ingridientWithCount={i} />
					))}
				</ul>
				<div className={styles.footer}>
					<CustomDate dateString={order.createdAt} />
					<div className={styles.totalPrice}>
						<span className="text text_type_digits-default">
							{totalPrice}&nbsp;
						</span>
						<CurrencyIcon type="primary" />
					</div>
				</div>
			</div>
		);
	}

	return <Loading />;
};

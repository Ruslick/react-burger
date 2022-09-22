import React from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";

import styles from "./OrderInfo.module.css";
import {
	Button,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

function OrderInfo() {
	const location = useLocation();
	const totalPrice = useSelector((state) => state.orderSlice.totalPrice);
	return (
		<>
			<section className={styles.orderInfo + " mt-10"}>
				<div className={styles.price}>
					<p className="text text_type_digits-medium">{totalPrice}</p>
					<CurrencyIcon type="primary" />
				</div>
				<Link to="/order-details" state={{ from: location.pathname }}>
					<Button type="primary" size="large">
						Оформить заказ
					</Button>
				</Link>
			</section>
		</>
	);
}

export default OrderInfo;

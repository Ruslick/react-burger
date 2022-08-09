import {
	Button,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./OrderInfo.module.css";

function OrderInfo() {
	return (
		<section className={styles.orderInfo}>
			<div className={styles.price}>
				<p className="text text_type_digits-medium">214124</p>
				<CurrencyIcon type="primary" />
			</div>
			<div className={styles.button}>
				<Button type="primary" size="large">
					Оформить заказ
				</Button>
			</div>
		</section>
	);
}

export default OrderInfo;

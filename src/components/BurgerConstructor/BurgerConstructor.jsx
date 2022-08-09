import React from "react";
import Order from "./Order/Order";
import OrderInfo from "./OrderInfo/OrderInfo";
import styles from "./BurgerConstructor.module.css";

function BurgerConstructor() {
	return (
		<div className={styles.wrapper}>
			<Order />
			<OrderInfo />
		</div>
	);
}

export default BurgerConstructor;

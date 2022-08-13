import {
	Button,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useState } from "react";
import OrderDetails from "../OrderDetails/OrderDetails";
import styles from "./OrderInfo.module.css";

function OrderInfo() {

	const [isDisplayed, setIsDisplayed] = useState(false)
	return (
		<>
			<section className={styles.orderInfo + " mt-10"}>
				<div className={styles.price}>
					<p className="text text_type_digits-medium">214124</p>
					<CurrencyIcon type="primary" />
				</div>
				<Button type="primary" size="large" onClick={() => setIsDisplayed(true)}>
					Оформить заказ
				</Button>
			</section>ç
			{isDisplayed && <OrderDetails onClose={() => setIsDisplayed(false)}/>}
		</>
	);
}

export default OrderInfo;

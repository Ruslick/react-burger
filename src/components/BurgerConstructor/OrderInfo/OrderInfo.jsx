import {
	Button,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import styles from "./OrderInfo.module.css";
import PropTypes from "prop-types";

function OrderInfo({ openModal }) {
	return (
		<>
			<section className={styles.orderInfo + " mt-10"}>
				<div className={styles.price}>
					<p className="text text_type_digits-medium">214124</p>
					<CurrencyIcon type="primary" />
				</div>
				<Button type="primary" size="large" onClick={openModal}>
					Оформить заказ
				</Button>
			</section>
		</>
	);
}
OrderInfo.propTypes = {
	openModal: PropTypes.func.isRequired,
};

export default OrderInfo;

import {
	Button,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useContext } from "react";
import styles from "./OrderInfo.module.css";
import PropTypes from "prop-types";
import orderContext from "../../../utils/orderContext";

function OrderInfo({ openModal }) {
	const { orderState } = useContext(orderContext);
	return (
		<>
			<section className={styles.orderInfo + " mt-10"}>
				<div className={styles.price}>
					<p className="text text_type_digits-medium">
						{orderState.totalPrice}
					</p>
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

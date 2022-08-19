import {
	Button,
	CurrencyIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { openModal } from "../../../services/slices/orderSlice";
import styles from "./OrderInfo.module.css";

function OrderInfo() {
	const dispatch = useDispatch();
	const totalPrice = useSelector((state) => state.orderSlice.totalPrice);

	return (
		<>
			<section className={styles.orderInfo + " mt-10"}>
				<div className={styles.price}>
					<p className="text text_type_digits-medium">{totalPrice}</p>
					<CurrencyIcon type="primary" />
				</div>
				<Button
					type="primary"
					size="large"
					onClick={() => dispatch(openModal())}
				>
					Оформить заказ
				</Button>
			</section>
		</>
	);
}

export default OrderInfo;

import React from "react";
import done from "../../../images/done.svg";
import styles from "./OrderDetails.module.css";

export default function OrderDetails() {
	return (
		<div className={styles.wrapper}>
			<div className={styles.content + " pt-4 pr-30 pb-30 pl-30"}>
				<p className={styles.digits + " text text_type_digits-large"}>
					1241412
				</p>
				<p className="text mt-8">идентификатор заказа</p>
				<img className={styles.done + " mt-15"} src={done} alt="done..." />
				<p className="text mt-15">Ваш заказ начали готовить</p>
				<p className="text text_color_inactive mt-2">
					Дождитесь готовности на орбитальной станции
				</p>
			</div>
		</div>
	);
}

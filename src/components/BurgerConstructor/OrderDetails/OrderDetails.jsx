import React from "react";
import Modal from "../../Modal/Modal";
import done from "../../../images/done.svg";
import styles from "./OrderDetails.module.css";
import CloseButton from "../../ui/CloseButton/CloseButton";
import PropTypes from "prop-types";

export default function OrderDetails({ onClose }) {
	return (
		<Modal onClose={onClose}>
			<div className={styles.wrapper}>
				<div className={styles.button}>
					<CloseButton onClick={onClose} />
				</div>
				<div className={styles.content + " p-30"}>
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
		</Modal>
	);
}

OrderDetails.propTypes = {
	onClose: PropTypes.func.isRequired,
};

import React from "react";
import styles from "../Modal.module.css";
import PropTypes from "prop-types";

function ModalOverlay({ children, onClose }) {
	function clickHandler(e) {
		if (e.target.id === "ModalOverlay") {
			onClose();
		}
	}

	return (
		<div
			id="ModalOverlay"
			className={styles.modalOverlay}
			onClick={clickHandler}
		>
			{children}
		</div>
	);
}

ModalOverlay.propTypes = {
	children: PropTypes.element.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default ModalOverlay;

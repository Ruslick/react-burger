import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";

function Modal({ children, onClose }) {
	useEffect(() => {
		const keyHandler = (e) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", keyHandler);
		return () => {
			document.removeEventListener("keydown", keyHandler);
		};
	}, [onClose]);

	return createPortal(
		<ModalOverlay onClose={onClose}>
			<div className={styles.modal}>{children}</div>
		</ModalOverlay>,
		document.getElementById("modal")
	);
}

Modal.propTypes = {
	children: PropTypes.element.isRequired,
	onClose: PropTypes.func.isRequired,
};

export default Modal;

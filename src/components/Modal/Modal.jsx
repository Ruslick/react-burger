import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import CloseButton from "../ui/CloseButton/CloseButton";

function Modal({ title, children, onClose }) {
	useEffect(() => {
		const keyHandler = (e) => {
			if (e.key === "Escape") onClose();
		};
		document.addEventListener("keydown", keyHandler);
		return () => {
			document.removeEventListener("keydown", keyHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return createPortal(
		<ModalOverlay onClose={onClose}>
			<div className={styles.modal}>
				<section className={styles.modelHeader + " mt-10 mr-10 ml-10"}>
					{title && <p className="text text_type_main-large">{title}</p>}
					<CloseButton onClick={onClose}></CloseButton>
				</section>
				{children}
			</div>
		</ModalOverlay>,
		document.getElementById("modal")
	);
}

Modal.propTypes = {
	children: PropTypes.element.isRequired,
	title: PropTypes.string,
	onClose: PropTypes.func,
};

export default Modal;

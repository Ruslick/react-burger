import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import CloseButton from "../ui/CloseButton/CloseButton";

function Modal({ isOpen, title, children, onClose }) {
	useEffect(() => {
		const keyHandler = (e) => {
			if (e.key === "Escape") onClose();
		};
		if (isOpen) {
			document.addEventListener("keydown", keyHandler);
			return () => {
				document.removeEventListener("keydown", keyHandler);
			};
		}
	}, [isOpen, onClose]);

	return createPortal(
		<ModalOverlay onClose={onClose}>
			<div className={styles.modal}>
				<div className={styles.modelHeader + " mt-10 mr-10 ml-10"}>
					{title && <p className="text text_type_main-large">{title}</p>}
					<CloseButton onClick={onClose}></CloseButton>
				</div>
				{children}
			</div>
		</ModalOverlay>,
		document.getElementById("modal")
	);
}

Modal.propTypes = {
	children: PropTypes.element.isRequired,
	onClose: PropTypes.func.isRequired,
	title: PropTypes.string,
	isOpen: PropTypes.bool.isRequired,
};

export default Modal;

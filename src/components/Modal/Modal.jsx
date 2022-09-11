import React, { useEffect } from "react";
import styles from "./Modal.module.css";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import PropTypes from "prop-types";
import { createPortal } from "react-dom";
import CloseButton from "../ui/CloseButton/CloseButton";
import { useNavigate } from "react-router-dom";

function Modal({ title, children }) {
	const navigate = useNavigate();
	const closeHandler = () => {
		navigate(-1);
	};
	useEffect(() => {
		const keyHandler = (e) => {
			if (e.key === "Escape") closeHandler();
		};
		document.addEventListener("keydown", keyHandler);
		return () => {
			document.removeEventListener("keydown", keyHandler);
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return createPortal(
		<ModalOverlay onClose={closeHandler}>
			<div className={styles.modal}>
				<section className={styles.modelHeader + " mt-10 mr-10 ml-10"}>
					{title && <p className="text text_type_main-large">{title}</p>}
					<CloseButton onClick={closeHandler}></CloseButton>
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
};

export default Modal;

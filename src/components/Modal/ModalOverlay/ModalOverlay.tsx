import React, {  FC, SyntheticEvent } from "react";
import styles from "../Modal.module.css";

const ModalOverlay:FC<{onClose: () => void}> = ({ children, onClose }) =>  {
	function clickHandler(e: SyntheticEvent) {
		const target = e.target as HTMLDivElement
		if ((target.id) === "ModalOverlay") {
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

export default ModalOverlay;

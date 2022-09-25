import React, { FC,useEffect } from "react";
import styles from "./Modal.module.css";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import { createPortal } from "react-dom";
import { CloseButton } from "../ui/CloseButton/CloseButton";

const Modal: FC<{title?: string, onClose: () => void}> = ({ title, children, onClose }) =>  {
	useEffect(() => {
		const keyHandler = (e: KeyboardEventInit) => {
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
		document.getElementById("modal") as HTMLElement
	);
}
export default Modal;

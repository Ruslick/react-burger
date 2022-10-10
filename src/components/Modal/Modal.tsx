import React, { FC,useEffect } from "react";
import styles from "./Modal.module.css";
import ModalOverlay from "./ModalOverlay/ModalOverlay";
import { createPortal } from "react-dom";
import { CloseButton } from "../ui/CloseButton/CloseButton";
import { IModalProps } from "../../utils/types";

const Modal: FC<IModalProps> = ({ title, children, onClose, padding = 'var(--x10)' }) =>  {
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
		<ModalOverlay  onClose={onClose}>
			<div className={styles.modal}>
				<section className={styles.modelHeader}>
					{<p className="text text_type_main-large">{title}</p>}
					<CloseButton onClick={onClose}></CloseButton>
				</section>
				{children}
			</div>
		</ModalOverlay>,
		document.getElementById("modal") as HTMLElement
	);
}
export default Modal;

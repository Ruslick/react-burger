import React from "react";
import { createPortal } from "react-dom";
import ModalOverlay from "../../Modal/ModalOverlay/ModalOverlay";

function Failed() {
	return createPortal(
		<ModalOverlay onClose={() => {}}>
			<p className="text">Произошла ошибка, пожалуйста перезагрузите страницу :(</p>
		</ModalOverlay>,
		document.getElementById("loader") as HTMLElement
	);
}

export default Failed;

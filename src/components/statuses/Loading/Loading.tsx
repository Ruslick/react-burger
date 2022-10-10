import React from 'react'
import { createPortal } from 'react-dom';
import ModalOverlay from '../../Modal/ModalOverlay/ModalOverlay';

import styles from "./Loading.module.css"

function Loading() {
  return createPortal(
		<ModalOverlay  onClose={() => {}}>
			<p className={styles.loader}></p>
		</ModalOverlay>,
		document.getElementById("loader") as HTMLElement
	);
}

export default Loading
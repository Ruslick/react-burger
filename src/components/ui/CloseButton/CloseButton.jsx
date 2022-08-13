import React, { useState } from "react";
import PropTypes from "prop-types";
import { CloseIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import styles from "./CloseButton.module.css";

export default function CloseButton({ onClick }) {
	const [isHovered, setIsHovered] = useState(false);

	return (
		<button
			className={styles.button}
			onClick={onClick}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<CloseIcon type={isHovered ? "secondary" : "primary"} />
		</button>
	);
}

CloseButton.propTypes = {
	onClick: PropTypes.func.isRequired,
};

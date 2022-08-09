import styles from "./NavLink.module.css";
import PropTypes from "prop-types";
import React from "react";

function NavLink({ children, icon, active }) {
	return active ? (
		<a href="/" className={styles.link}>
			{React.createElement(icon, { type: "primary" })}
			<p className={`text text_type_main-default ${styles.text} active`}>
				{children}
			</p>
		</a>
	) : (
		<a href="/" className={styles.link}>
			{React.createElement(icon, { type: "secondary" })}
			<p className={`text text_type_main-default ${styles.text}`}>{children}</p>
		</a>
	);
}

NavLink.propTypes = {
	children: PropTypes.string.isRequired,
	icon: PropTypes.func.isRequired,
	// active: PropTypes.bolean,
};

export default NavLink;

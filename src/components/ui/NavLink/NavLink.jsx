import styles from "./NavLink.module.css";
import PropTypes from "prop-types";
import React from "react";

function NavLink({ children, icon, active }) {
	return active ? (
		<a href="/" className={styles.link + " p-5"}>
			{React.createElement(icon, { type: "primary" })}
			<p className={`text text_type_main-default `}>{children}</p>
		</a>
	) : (
		<a href="/" className={styles.link + " p-5"}>
			{React.createElement(icon, { type: "secondary" })}
			<p className={`text text_type_main-default text_color_inactive`}>
				{children}
			</p>
		</a>
	);
}

NavLink.propTypes = {
	children: PropTypes.string.isRequired,
	icon: PropTypes.func.isRequired,
	active: PropTypes.bool,
};

export default NavLink;

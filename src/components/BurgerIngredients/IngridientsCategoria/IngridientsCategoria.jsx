import React, { useContext } from "react";
import styles from "./IngridientsCategoria.module.css";
import PropTypes from "prop-types";
import Ingridient from "../Ingridient/Ingridient";
import ingridientsContextApi from "../../../utils/ingridientsContextApi";

function IngridientsCategoria({ type, children, openModal }) {
	const { data } = useContext(ingridientsContextApi);

	return (
		<li className={styles.section}>
			<p className="text text_type_main-medium">{children}</p>
			<ul className={styles.list + " mt-6 mb-6 mr-4 ml-4"}>
				{data
					.filter((ingridient) => (ingridient.type === type ? true : false))
					.map((ingridient) => (
						<Ingridient
							key={ingridient._id}
							ingridient={ingridient}
							count={1}
							openModal={openModal}
						/>
					))}
			</ul>
		</li>
	);
}

IngridientsCategoria.propTypes = {
	type: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
	openModal: PropTypes.func.isRequired,
};

export default IngridientsCategoria;

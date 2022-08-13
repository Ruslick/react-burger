import React from "react";
import styles from "./IngridientsList.module.css";
import PropTypes from "prop-types";
import Ingridient from "../Ingridient/Ingridient";

function IngridientsList({ ingridients, type, children, ...props }) {
	return (
		<li className={styles.section}>
			<p className="text text_type_main-medium">{children}</p>
			<ul className={styles.list + " mt-6 mb-6 mr-4 ml-4"}>
				{ingridients
					// распределение ингридинтов по типу (булки в булках, начинки в начинках)
					.filter((ingridient) => (ingridient.type === type ? true : false))

					.map((ingridient) => (
						<Ingridient
							key={ingridient._id}
							ingridient={ingridient}
							count={1}
						/>
					))}
			</ul>
		</li>
	);
}

IngridientsList.propTypes = {
	ingridients: PropTypes.arrayOf(PropTypes.object).isRequired,
	type: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
};

export default IngridientsList;

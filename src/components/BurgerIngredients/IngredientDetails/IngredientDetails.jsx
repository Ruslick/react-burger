import React from "react";
import styles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";
import { ingridientShape } from "../../../utils/types";

function IngredientDetails({ ingridient }) {
	const { name, image_large, calories, carbohydrates, fat, proteins } =
		ingridient;

	return (
		<div className={styles.wrapper}>
			<img src={image_large} alt={name} />
			<p className={styles.name + " text_type_main-medium mt-4"}>{name}</p>
			<div className={styles.properties + " mt-8 mb-15"}>
				<p className="text text_type_main-small">
					Калории,ккал <br />
					{calories}
				</p>
				<p className="text text_type_main-small">
					Белки, г <br />
					{proteins}
				</p>
				<p className="text text_type_main-small">
					Жиры, г <br />
					{fat}
				</p>
				<p className="text text_type_main-small">
					Углеводы, г <br />
					{carbohydrates}
				</p>
			</div>
		</div>
	);
}

IngredientDetails.propTypes = {
	ingridient: PropTypes.shape(ingridientShape).isRequired,
};

export default IngredientDetails;

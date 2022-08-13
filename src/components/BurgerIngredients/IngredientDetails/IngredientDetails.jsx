import React from "react";
import Modal from "../../Modal/Modal";
import styles from "./IngredientDetails.module.css";
import PropTypes from "prop-types";
import CloseButton from "../../ui/CloseButton/CloseButton";
import { ingridientShape } from "../../../utils/types";

function IngredientDetails({ ingridient, onClose }) {
	const { name, image_large, calories, carbohydrates, fat, proteins } =
		ingridient;
	console.log(ingridient);
	return (
		<Modal onClose={onClose}>
			<div className={styles.wrapper}>
				<div className={styles.modelHeader + " mt-10 mr-10 ml-10"}>
					<p className="text text_type_main-large">Детали ингридиента</p>
					<CloseButton onClick={onClose}></CloseButton>
				</div>
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
		</Modal>
	);
}

IngredientDetails.propTypes = {
	ingridient: PropTypes.shape(ingridientShape).isRequired,
	onClose: PropTypes.func.isRequired,
};

export default IngredientDetails;

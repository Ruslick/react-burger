import React, { useState } from "react";
import Tabs from "../ui/Tabs/Tabs";
import styles from "./BurgerIngridients.module.css";
import PropTypes from "prop-types";
import IngridientsList from "./IngridientsList/IngridientsList";
import Modal from "../Modal/Modal";
import IngredientDetails from "./IngredientDetails/IngredientDetails";

function BurgerIngridients({ data }) {
	const [isOpenedModal, setIsOpenedModal] = useState(false);
	const [ingridient, setIngridient] = useState(null);

	const openModal = (ingridientData) => {
		setIngridient(ingridientData);
		setIsOpenedModal(true);
	};

	const closeModal = () => {
		setIsOpenedModal(false);
	};

	return (
		<>
			<section>
				<div className="mt-10 mb-5">
					<p className="text text_type_main-large">Соберите бургер</p>
				</div>
				<Tabs />
				<ul className={`${styles.list} scroll`}>
					<IngridientsList ingridients={data} type="bun" openModal={openModal}>
						Булки
					</IngridientsList>
					<IngridientsList
						ingridients={data}
						type="sauce"
						openModal={openModal}
					>
						Cоусы
					</IngridientsList>
					<IngridientsList ingridients={data} type="main" openModal={openModal}>
						Начинки
					</IngridientsList>
				</ul>
			</section>
			{isOpenedModal && (
				<Modal
					isOpen={isOpenedModal}
					onClose={closeModal}
					title="Детали ингридиента"
				>
					<IngredientDetails ingridient={ingridient} />
				</Modal>
			)}
		</>
	);
}

BurgerIngridients.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerIngridients;

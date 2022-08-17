import React, { useState } from "react";
import Tabs from "../ui/Tabs/Tabs";
import styles from "./BurgerIngridients.module.css";
import Modal from "../Modal/Modal";
import IngredientDetails from "./IngredientDetails/IngredientDetails";
import IngridientsCategoria from "./IngridientsCategoria/IngridientsCategoria";

function BurgerIngridients() {
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
					<IngridientsCategoria type="bun" openModal={openModal}>
						Булки
					</IngridientsCategoria>
					<IngridientsCategoria type="sauce" openModal={openModal}>
						Cоусы
					</IngridientsCategoria>
					<IngridientsCategoria type="main" openModal={openModal}>
						Начинки
					</IngridientsCategoria>
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

export default BurgerIngridients;

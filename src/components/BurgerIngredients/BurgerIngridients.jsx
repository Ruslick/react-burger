import React, { useRef, useState } from "react";
import Tabs from "../ui/Tabs/Tabs";
import styles from "./BurgerIngridients.module.css";
import Modal from "../Modal/Modal";
import IngredientDetails from "./IngredientDetails/IngredientDetails";
import IngridientsCategoria from "./IngridientsCategoria/IngridientsCategoria";

import { useDispatch, useSelector } from "react-redux";
import { removeCurrentIngridient } from "../../services/slices/currentIngridientSlice";
function BurgerIngridients() {
	const dispatch = useDispatch();

	const currentIngridient = useSelector(
		(state) => state.currentIngridientSlice.currentIngridient
	);
	const ingridientsCategorias = useSelector(
		(state) => state.categoriaSlice.ingridientsCategorias
	);
	const ref = useRef();

	const [scrollPosition, setScrollPosition] = useState(0);
	return (
		<>
			<section>
				<div className="mt-10 mb-5">
					<p className="text text_type_main-large">Соберите бургер</p>
				</div>
				<Tabs />
				<ul
					className={`${styles.list} scroll`}
					onScroll={(e) => {
						setScrollPosition(e.target.scrollTop + e.target.offsetTop);
					}}
					ref={ref}
				>
					{ingridientsCategorias.map((c) => (
						<IngridientsCategoria
							key={c.type}
							type={c.type}
							scrollPosition={scrollPosition}
						>
							{c.name}
						</IngridientsCategoria>
					))}
				</ul>
			</section>
			{!!currentIngridient && (
				<Modal
					onClose={() => dispatch(removeCurrentIngridient())}
					title="Детали ингридиента"
				>
					<IngredientDetails ingridient={currentIngridient} />
				</Modal>
			)}
		</>
	);
}

export default BurgerIngridients;

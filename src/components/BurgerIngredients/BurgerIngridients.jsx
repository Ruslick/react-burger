import React, { useRef, useState } from "react";
import Tabs from "../ui/Tabs/Tabs";
import styles from "./BurgerIngridients.module.css";
import IngridientsCategoria from "./IngridientsCategoria/IngridientsCategoria";

import { useSelector } from "react-redux";
function BurgerIngridients() {
	const ingridientsCategorias = useSelector(
		(state) => state.categoriaSlice.ingridientsCategorias
	);
	const ref = useRef();

	const [scrollPosition, setScrollPosition] = useState(0);
	return (
		<>
			<section>
				<div className={`${styles.title} mt-10 mb-5`}>
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
		</>
	);
}

export default BurgerIngridients;

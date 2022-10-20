import React, { LegacyRef, SyntheticEvent, useRef, useState } from "react";
import Tabs from "../ui/Tabs/Tabs";
import styles from "./BurgerIngridients.module.css";
import IngridientsCategoria from "./IngridientsCategoria/IngridientsCategoria";

import { useAppSelector } from "../../services";

function BurgerIngridients() {
	const ingridientsCategorias = useAppSelector(
		(state) => state.categoriaSlice.ingridientsCategorias
	);
	const ref = useRef<HTMLUListElement>();

	const [scrollPosition, setScrollPosition] = useState(0);
	return (
		<section>
			<div className={`${styles.title} mt-10 mb-5`}>
				<p className="text text_type_main-large">Соберите бургер</p>
			</div>
			<Tabs />
			<ul
				className={`${styles.list} scroll`}
				onScroll={(e: SyntheticEvent) => {
					const target: { scrollTop: number; offsetTop: number } =
						e.target as any;
					setScrollPosition(target.scrollTop + target.offsetTop);
				}}
				ref={ref as LegacyRef<HTMLUListElement>}
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
	);
}

export default BurgerIngridients;

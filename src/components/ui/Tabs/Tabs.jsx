import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import styles from "./Tabs.module.css";
import { useDispatch, useSelector } from "react-redux";
import { selectTab } from "../../../services/slices/categoriaSlice";

function BurgerIngridientsTabs() {
	const dispatch = useDispatch();

	const activeCategoria = useSelector(
		(state) => state.categoriaSlice.activeCategoria
	);

	const ingridientsCategorias = useSelector(
		(state) => state.categoriaSlice.ingridientsCategorias
	);

	const tabs = useMemo(
		() =>
			ingridientsCategorias.map((c) => {
				const selectCategoria = (categoria) => {
					dispatch(selectTab(categoria));
				};
				return (
					<a key={c.type} href={`#${c.type}`} className={styles.anchor}>
						<Tab
							value={c.type}
							active={activeCategoria === c.type}
							onClick={selectCategoria}
						>
							{c.name}
						</Tab>
					</a>
				);
			}),
		[activeCategoria, dispatch, ingridientsCategorias]
	);

	return <div className={styles.wrapper + " mb-10"}>{tabs}</div>;
}

export default BurgerIngridientsTabs;

import { Tab } from "@ya.praktikum/react-developer-burger-ui-components";
import React, { useMemo } from "react";
import styles from "./Tabs.module.css";
import { selectTab } from "../../../services/slices/categoriaSlice";
import { useAppDispatch, useAppSelector } from "../../../services";

function BurgerIngridientsTabs() {
	const dispatch = useAppDispatch();

	const {ingridientsCategorias, activeCategoria} = useAppSelector(
		(state) => state.categoriaSlice
	);

	const tabs = useMemo(
		() =>
			ingridientsCategorias.map((c) => {
				const selectCategoria = (categoria: string): void => {
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

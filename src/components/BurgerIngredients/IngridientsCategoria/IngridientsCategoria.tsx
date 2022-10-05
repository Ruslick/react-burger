import React, { FC, useEffect, useMemo, useRef } from "react";
import styles from "./IngridientsCategoria.module.css";
import Ingridient from "../Ingridient/Ingridient";
import { useDispatch, useSelector } from "react-redux";
import { selectTab } from "../../../services/slices/categoriaSlice";
import { IIngridient, IIngridientsCategoriaProps } from "../../../utils/types";

const IngridientsCategoria: FC<IIngridientsCategoriaProps> = ({
	type,
	children,
	scrollPosition,
}) => {
	const dispatch = useDispatch();
	
	const ingridients = useSelector<any, any>(
		(state) => state.ingridientsSlice.ingridients
	);

	const currentElementRef = useRef<HTMLLIElement>();
	useEffect(() => {
		if (!currentElementRef.current) return;
		const topPosition = currentElementRef.current.offsetTop;
		const bottomPosition =
			currentElementRef.current.offsetTop +
			currentElementRef.current.offsetHeight;
		if (topPosition <= scrollPosition && scrollPosition <= bottomPosition) {
			dispatch(selectTab(type));
		}
	}, [dispatch, scrollPosition, type]);

	const ingridientsByType = useMemo(() => {
		return (
			ingridients &&
			ingridients
				.filter((ingridient: IIngridient) => ingridient.type === type)
				.map((ingridient: IIngridient) => (
					<Ingridient key={ingridient._id} ingridient={ingridient} />
				))
		);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [ingridients]);

	return (
		<li
			className={styles.section}
			id={type}
			ref={currentElementRef as React.LegacyRef<HTMLLIElement>}
		>
			<p className="text text_type_main-medium">{children}</p>
			<ul className={styles.list + " mt-6 mb-6 mr-4 ml-4"}>
				{ingridientsByType}
			</ul>
		</li>
	);
};

export default IngridientsCategoria;

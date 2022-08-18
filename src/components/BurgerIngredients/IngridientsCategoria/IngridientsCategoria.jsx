import React, { useContext, useEffect, useMemo, useRef } from "react";
import styles from "./IngridientsCategoria.module.css";
import PropTypes from "prop-types";
import Ingridient from "../Ingridient/Ingridient";
import IngridientsContextApi from "../../../utils/IngridientsContextApi";

function IngridientsCategoria({
	selectedCategoria,
	type,
	children,
	openModal,
}) {
	const { data } = useContext(IngridientsContextApi);
	const ingridientsByType = useMemo(() => {
		return (
			data &&
			data
				.filter((ingridient) => (ingridient.type === type ? true : false))
				.map((ingridient) => (
					<Ingridient
						key={ingridient._id}
						ingridient={ingridient}
						count={1}
						openModal={openModal}
					/>
				))
		);
	}, [data, type, openModal]);

	const categoriaRef = useRef(null);
	useEffect(() => {
		if (selectedCategoria === type) {
			categoriaRef.current.scrollIntoView({ behavior: "smooth" });
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [selectedCategoria]);

	return (
		<li ref={categoriaRef} className={styles.section}>
			<p className="text text_type_main-medium">{children}</p>
			<ul className={styles.list + " mt-6 mb-6 mr-4 ml-4"}>
				{ingridientsByType}
			</ul>
		</li>
	);
}

IngridientsCategoria.propTypes = {
	type: PropTypes.string.isRequired,
	children: PropTypes.string.isRequired,
	openModal: PropTypes.func.isRequired,
	selectedCategoria: PropTypes.string.isRequired,
};

export default IngridientsCategoria;

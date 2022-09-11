import React, { useMemo } from "react";
import styles from "./IngredientDetails.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import Loading from "../../statuses/Loading/Loading";
import { getIngridientsFetch } from "../../../utils/requests";

function IngredientDetails() {
	const dispatch = useDispatch();
	const { id } = useParams();
	const { ingridients, status } = useSelector(
		(store) => store.ingridientsSlice
	);

	const ingridient = useMemo(
		() => ingridients.find((i) => i._id === id),
		[id, ingridients]
	);

	if (status === "idle") {
		dispatch(getIngridientsFetch());
		return null;
	}
	if (status === "loading") {
		return <Loading />;
	}
	if (status === "received") {
		const { name, image_large, calories, carbohydrates, fat, proteins } =
			ingridient;

		return (
			<div className={styles.wrapper}>
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
		);
	}
}

export default IngredientDetails;

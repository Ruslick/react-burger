import React from "react";
import { IIngridient } from "../../utils/types";
import styles from "./ImageWithBorder.module.css";
export const ImageWithBorder: React.FC<{
	ingridient: IIngridient;
}> = ({ ingridient }) => {
	const { _id, image_mobile, name } = ingridient;
	return (
		<img className={styles.image} key={_id} src={image_mobile} alt={name} />
	);
};

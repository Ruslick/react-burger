import { CurrencyIcon } from "@ya.praktikum/react-developer-burger-ui-components";
import React from "react";
import { Link } from "react-router-dom";
import { IIngridientWithCount } from "../../../utils";
import { ImageWithBorder } from "../../ImageWithBorder/ImageWithBorder";

import styles from "../OrderInfo.module.css";

export const IngridientWithCount: React.FC<{
	ingridientWithCount: IIngridientWithCount;
}> = ({ ingridientWithCount }) => {
	const { count, ingridient } = ingridientWithCount;
	return (
		<ol>
			<Link className={styles.ingridient} to={`/ingridient/${ingridient._id}`}>
				<section className={styles.leftSide}>
					<ImageWithBorder ingridient={ingridient} />
					<span>{ingridient.name}</span>
				</section>
				<section className={styles.rightSide}>
					<span className="text text_type_digits-default">
						{count} x {ingridient.price}&nbsp;
					</span>
					<CurrencyIcon type="primary" />
				</section>
			</Link>
		</ol>
	);
};

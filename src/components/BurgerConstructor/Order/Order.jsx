import React from "react";
import styles from "./Order.module.css";
import OrderIngridient from "./OrderIngridient/OrderIngridient";
import data from "../../../utils/data.js";

function Order() {
	// позже она будет в пропах
	// выбраная булочка

	return (
		<section
			className={styles.wrapper}
			style={{ height: window.innerHeight / 2 }}
		>
			<OrderIngridient
				// позже она будет в пропах
				// выбраная булочка
				ingridient={data[0]}
				type={"top"}
				isLocked={true}
			/>
			<div className={`${styles.list} scroll`}>
				{data
        .filter(ingridient => {
          if (ingridient.type ==='bun') return false;
          return true
        })
        .map((ingridient) => {
					return (
						<OrderIngridient ingridient={ingridient} key={ingridient._id} />
					);
				})}
			</div>
			<OrderIngridient
				// позже она будет в пропах
				// выбраная булочка
				ingridient={data[0]}
				type={"bottom"}
				isLocked={true}
			/>
		</section>
	);
}

export default Order;

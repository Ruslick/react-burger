import React from "react";
import styles from "./Order.module.css";
import OrderIngridient from "./OrderIngridient/OrderIngridient";
import PropTypes from "prop-types";
function Order({ data }) {
	return (
		<section
			className={styles.wrapper + " mt-25"}
			style={{ height: window.innerHeight / 2 }}
		>
			<OrderIngridient
				// позже она будет в пропах
				// выбраная булочка
				ingridient={data[0]}
				type={"top"}
				isLocked={true}
			/>
			<div className={styles.list + " scroll"}>
				{data
					.filter((ingridient) => {
						if (ingridient.type === "bun") return false;
						return true;
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

Order.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};
export default Order;

import React from "react";
import Order from "./Order/Order";
import OrderInfo from "./OrderInfo/OrderInfo";
import PropTypes from "prop-types";

function BurgerConstructor({ data }) {
	return (
		<div className="pr-4 pl-4">
			<Order data={data} />
			<OrderInfo />
		</div>
	);
}

BurgerConstructor.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerConstructor;

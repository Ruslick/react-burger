import React from "react";
import Order from "./Order/Order";
import OrderInfo from "./OrderInfo/OrderInfo";
import { useSelector } from "react-redux";

function BurgerConstructor() {
	const ingridientsCount = useSelector<any, any>(
		(state) => state.orderSlice.orderIngridients.length 
	);

	return (
		<>
			<div className="pr-4 pl-4">
				<Order />
				{ingridientsCount > 2 && <OrderInfo />}
			</div>
		</>
	);
}

export default BurgerConstructor;

import React from "react";
import { useAppSelector } from "../../services";
import Order from "./Order/Order";
import OrderInfo from "./OrderInfo/OrderInfo";

function BurgerConstructor() {
	const ingridientsCount = useAppSelector(
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

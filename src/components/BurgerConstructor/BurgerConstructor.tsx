import React from "react";
import { useAppSelector } from "../../services";
import Order from "./Order/Order";
import OrderFooter from "./OrderFooter/OrderFooter";

function BurgerConstructor() {
	const ingridientsCount = useAppSelector(
		(state) => state.orderSlice.orderIngridients.length 
	);

	return (
		<>
			<div className="pr-4 pl-4">
				<Order />
				{ingridientsCount > 2 && <OrderFooter />}
			</div>
		</>
	);
}

export default BurgerConstructor;

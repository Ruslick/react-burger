import React from "react";
import Order from "./Order/Order";
import OrderInfo from "./OrderInfo/OrderInfo";

function BurgerConstructor({data}) {
	return (
		<div className='pr-4 pl-4'>
			<Order data={data}/>
			<OrderInfo />
		</div>
	);
}

export default BurgerConstructor;

import React, { useReducer, useState } from "react";
import Order from "./Order/Order";
import OrderInfo from "./OrderInfo/OrderInfo";
import OrderDetails from "./OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import OrderContext from "../../utils/OrderContext";
import reducer from "../../utils/reducerBurgerConstructor";

function BurgerConstructor() {
	const [isOpenedModal, setIsOpenedModal] = useState(false);

	const openModal = () => {
		setIsOpenedModal(true);
	};

	const closeModal = () => {
		setIsOpenedModal(false);
	};

	const initialOrderState = {
		orderIngridients: null,
		totalPrice: null,
		bun: null,
	};

	const [orderState, orderDispatch] = useReducer(reducer, initialOrderState);

	return (
		<OrderContext.Provider value={{ orderState, orderDispatch }}>
			<div className="pr-4 pl-4">
				<Order />
				{orderState.orderIngridients && <OrderInfo openModal={openModal} />}
			</div>
			{isOpenedModal && (
				<Modal isOpen={isOpenedModal} onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</OrderContext.Provider>
	);
}

export default BurgerConstructor;

import React from "react";
import Order from "./Order/Order";
import OrderInfo from "./OrderInfo/OrderInfo";
import OrderDetails from "./OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";
import { useDispatch, useSelector } from "react-redux";
import { closeModal } from "../../services/slices/orderSlice";

function BurgerConstructor() {
	const dispatch = useDispatch();
	const isOpenedModal = useSelector((state) => state.orderSlice.isOpenedModal);
	const ingridientsCount = useSelector(
		(state) => state.orderSlice.orderIngridients.length + 1
	);
	const closeHandle = () => dispatch(closeModal());

	return (
		<>
			<div className="pr-4 pl-4">
				<Order />
				{ingridientsCount > 3 && <OrderInfo />}
			</div>
			{isOpenedModal && (
				<Modal onClose={closeHandle}>
					<OrderDetails />
				</Modal>
			)}
		</>
	);
}

export default BurgerConstructor;

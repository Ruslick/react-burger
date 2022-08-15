import React, { useState } from "react";
import Order from "./Order/Order";
import OrderInfo from "./OrderInfo/OrderInfo";
import PropTypes from "prop-types";
import OrderDetails from "./OrderDetails/OrderDetails";
import Modal from "../Modal/Modal";

function BurgerConstructor({ data }) {
	const [isOpenedModal, setIsOpenedModal] = useState(false);

	const openModal = () => {
		setIsOpenedModal(true);
	};

	const closeModal = () => {
		setIsOpenedModal(false);
	};

	return (
		<>
			<div className="pr-4 pl-4">
				<Order data={data} />
				<OrderInfo openModal={openModal} />
			</div>
			{isOpenedModal && (
				<Modal isOpen={isOpenedModal} onClose={closeModal}>
					<OrderDetails />
				</Modal>
			)}
		</>
	);
}

BurgerConstructor.propTypes = {
	data: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default BurgerConstructor;

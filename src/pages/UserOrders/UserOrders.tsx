// import React from "react";

import { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { OrderPreview } from "../../components/OrderPreview/OrderPreview";
import Loading from "../../components/statuses/Loading/Loading";
import { useWebsocket } from "../../hooks/useWebSocket";
import { useAppSelector } from "../../services";
import { USER_ORDERS_SOCKET_URL } from "../../utils/constants";
import { getCookie } from "../../utils/cookiesTransform";

import styles from "./UserOrdersPage.module.css";

function UserOrders() {
	const { status } = useAppSelector((state) => state.ingridientsSlice);
	const location = useLocation()


	const { connect, disconnect } = useWebsocket();
	useEffect(() => {
		connect(`${USER_ORDERS_SOCKET_URL}?token=${getCookie("token")}`);

		return () => {
			disconnect()
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	const { isConnected, socketData } = useAppSelector((store) => store.socketSlice);

	if (isConnected && socketData && status === "received") {
		const content = socketData.orders.map((order) => {
			return (
				<Link key={order.number} state={{from: location.pathname}} to={`/profile/orders/${order._id}`}>
					<OrderPreview key={order.number} order={order} status={order.status} />
				</Link>
			);
		});
				
				return <ul className={`scroll ${styles.contentList}`}>{content}<Outlet /></ul>;
	}

	return <Loading />;
}

export default UserOrders;

import React, { useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import { OrderPreview } from "../../components/OrderPreview/OrderPreview";
import { Stats } from "../../components/Stats/Stats";
import Loading from "../../components/statuses/Loading/Loading";
import { useWebsocket } from "../../hooks/useWebSocket";
import { useAppSelector } from "../../services";
import { ALL_ORDERS_SOCKET_URL } from "../../utils/constants";
import styles from "./FeedPage.module.css";

export const FeedPage = () => {
	const { isConnected, socketData } = useAppSelector(
		(store) => store.socketSlice
	);
	const appStatus = useAppSelector((store) => store.ingridientsSlice.status);

	const { connect, disconnect } = useWebsocket();

	const location = useLocation()

	useEffect(() => {
		connect(ALL_ORDERS_SOCKET_URL);
		connect(ALL_ORDERS_SOCKET_URL);
		return () => {
			disconnect();
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	if (isConnected && socketData && appStatus) {
		return (
			<div className={styles.wrapper}>
				<ul className={`${styles.globalOrders} scroll`}>
					{socketData.orders.map((o) => (
						<Link state={{from: location.pathname}} to={`/feed/${o._id}`} key={o.number}>
							<OrderPreview order={o} />
						</Link>
					))}
				</ul>

				<Stats data={socketData} />
				<Outlet />
			</div>
		);
	}
	return <Loading />;
};

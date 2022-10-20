import React from "react";
import { OrderInfo } from "../../components/OrderInfo/OrderInfo";

import styles from './FeedIdPage.module.css'

export const FeedIdPage = () => {

	return (
		<div className={styles.wrapper}>
			<OrderInfo />
		</div>
	);
};

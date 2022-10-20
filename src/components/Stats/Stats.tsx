import React, { useMemo } from "react";
import { IWSData } from "../../utils/types";
import styles from "./Stats.module.css";

export const Stats: React.FC<{ data: IWSData }> = ({ data }) => {
	const readiness = useMemo(
		() =>
			data.orders.reduce(
				(prev, cur) => ({
					...prev,
					[cur.status]: [cur.number, ...prev[cur.status as keyof typeof prev]],
				}),
				{ done: [], pending: [], created: [] }
			),
		[data.orders]
	);
	return (
		<section className={styles.ordersStats}>
			<div className={styles.readiness}>
				<section className={styles.readinessSection}>
					<span className="text text_type_main-medium">Готовы:</span>
					<ul className={styles.readinessList}>
						{readiness.done.map((n) => (
							<li
								key={n}
								className="text text_type_digits-default text_color_success"
							>
								{n}
							</li>
						))}
					</ul>
				</section>
				<section className={styles.readinessSection}>
					<span className="text text_type_main-medium">В работе:</span>
					<ul>
						{readiness.pending.map((n) => (
							<li key={n} className="text text_type_digits-default">
								{n}
							</li>
						))}
					</ul>
				</section>
			</div>
			<div>
				<p className="text text_type_main-medium">Выполнено за все время:</p>
				<p className="text text_type_digits-large shadow">{data.total}</p>
			</div>
			<div>
				<p className="text text_type_main-medium">Выполнено за сегодня:</p>
				<p className="text text_type_digits-large shadow">{data.totalToday}</p>
			</div>
		</section>
	);
};

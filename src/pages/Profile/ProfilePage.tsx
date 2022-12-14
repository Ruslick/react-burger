import React from "react";
import { NavLink, Outlet } from "react-router-dom";
import useAuth from "../../hooks/useAuth";

import style from "./ProfilePage.module.css";

function ProfilePage() {
	const Auth = useAuth();

	const classNameHandle = ({ isActive }: { isActive: boolean }): string => {
		const colorClass = isActive ? `text_color_primary` : `text_color_inactive`;
		return `${colorClass} ${style.link} text text_type_main-medium mt-1 mb-1 `;
	};

	const logoutHandler: VoidFunction = () => {
		Auth.logout();
	};

	return (
		<div className={style.wrapper}>
			<aside className={style.aside}>
				<NavLink className={classNameHandle} to="/profile" end>
					Профиль
				</NavLink>
				<NavLink className={classNameHandle} to="/profile/orders">
					История
				</NavLink>
				<p
					className={`${style.link} text text_type_main-medium mt-1 mb-1 text_color_inactive`}
					onClick={logoutHandler}
				>
					Выход
				</p>
				<span className="text text_type_main-small text_color_inactive mt-20">
					В этом разделе вы можете изменить свои персональные данные
				</span>
			</aside>
			<main>
				<Outlet />
			</main>
		</div>
	);
}

export default ProfilePage;

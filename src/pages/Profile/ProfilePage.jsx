import React from "react";
import { NavLink } from "react-router-dom";
import ProfileForm from "../../components/ProfileForm/ProfileForm";
import style from "./ProfilePage.module.css";

function ProfilePage() {
	const classNameHandle = ({ isActive }) => {
		const colorClass = isActive ? `text_color_primary` : `text_color_inactive`;
		return `${colorClass} ${style.link} text text_type_main-medium mt-1 mb-1 `;
	};

	return (
		<div className={style.wrapper + " mt-30"}>
			<aside className={style.aside}>
				<NavLink className={classNameHandle} to="/profile">
					Профиль
				</NavLink>
				<NavLink className={classNameHandle} to="/orders">
					История
				</NavLink>
				<NavLink className={classNameHandle} to="/profile/orders/:id">
					Выход
				</NavLink>
				<span className="text text_type_main-small text_color_inactive mt-20">
					В этом разделе вы можете изменить свои персональные данные
				</span>
			</aside>
			<main>
				<ProfileForm />
			</main>
		</div>
	);
}

export default ProfilePage;

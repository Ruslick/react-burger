import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { NavLink } from "react-router-dom";

import styles from "./AppHeader.module.css";

function AppHeader() {
	const classNameHandle = ({ isActive }) => {
		let color = `${
			isActive ? `${styles.link} text_color_primary` : `${styles.activeLink} text_color_inactive`
		}`
		return `${color} ${styles.link} text text_type_main-small p-5`;
	};



	return (
		<header className={styles.wrapper + " mt-10 mr-10 ml-10"}>
			<div className="container">
				<section className={styles.header + " pt-4 pb-4"}>
					<div className={styles.leftMenu}>
						<NavLink id="constructor" className={classNameHandle} to={"/"}>
							<BurgerIcon />
							<span>Конструктор</span>
						</NavLink>
						<NavLink id="orders" className={classNameHandle} to={"/tape"}>
							<ListIcon />
							<span>Лента заказов</span>
						</NavLink>
					</div>
					<div className={styles.logo}>
						<Logo />
					</div>
					<div className={styles.rightMenu}>
						<NavLink id="profile" className={classNameHandle} to={"/profile"}>
							<ProfileIcon />
							<span>Личный кабинет</span>
						</NavLink>
					</div>
				</section>
			</div>
		</header>
	);
}

export default AppHeader;

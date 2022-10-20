import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";
import { Link, NavLink } from "react-router-dom";

import styles from "./AppHeader.module.css";

function AppHeader() {
	const classNameHandle = ({ isActive }: { isActive: boolean }) => {
		let color = `${
			isActive
				? `${styles.link} text_color_primary`
				: `${styles.activeLink} text_color_inactive`
		}`;
		return `${color} ${styles.link} text text_type_main-small p-5`;
	};

	return (
		<header className={styles.wrapper + " mt-10 mr-10 ml-10 mb-25"}>
			<div className="container">
				<section className={styles.header + " pt-4 pb-4"}>
					<div className={styles.leftMenu}>
						<NavLink id="constructor" className={classNameHandle} to={"/"}>
							<BurgerIcon type="primary" />
							<span>Конструктор</span>
						</NavLink>
						<NavLink id="orders" className={classNameHandle} to={"/feed"}>
							<ListIcon type="primary" />
							<span>Лента заказов</span>
						</NavLink>
					</div>
					<Link to="/" className={styles.logo}>
						<Logo />
					</Link>
					<div className={styles.rightMenu}>
						<NavLink id="profile" className={classNameHandle} to={"/profile"}>
							<ProfileIcon type="primary" />
							<span>Личный кабинет</span>
						</NavLink>
					</div>
				</section>
			</div>
		</header>
	);
}

export default AppHeader;

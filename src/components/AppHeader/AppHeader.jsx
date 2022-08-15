import {
	Logo,
	BurgerIcon,
	ListIcon,
	ProfileIcon,
} from "@ya.praktikum/react-developer-burger-ui-components";

import styles from "./AppHeader.module.css";
import NavLink from "../ui/NavLink/NavLink.jsx";

function AppHeader() {
	return (
		<header className={styles.wrapper + " mt-10 mr-10 ml-10"}>
			<div className="container">
				<section className={styles.header + " pt-4 pb-4"}>
					<div className={styles.leftMenu}>
						<NavLink active icon={BurgerIcon}>
							Конструктор
						</NavLink>
						<NavLink icon={ListIcon}>Лента заказов</NavLink>
					</div>
					<div className={styles.logo}>
						<Logo />
					</div>
					<div className={styles.rightMenu}>
						<NavLink icon={ProfileIcon}>Личный кабинет</NavLink>
					</div>
				</section>
			</div>
		</header>
	);
}

export default AppHeader;

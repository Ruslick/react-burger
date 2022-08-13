import styles from "./App.module.css";
import AppHeader from "../AppHeader/AppHeader";
import BurgerIngridients from "../BurgerIngredients/BurgerIngridients";
import BurgerConstructor from "../BurgerConstructor/BurgerConstructor";
// import data from "../../utils/data";
import useIngredientsFetch from "../../hooks/useIngredientsFetch";
import { URL } from "../../utils/constants";

function App() {
	const { data, error } = useIngredientsFetch(URL);
	if (error) {
		console.log(error);
		return <h1>{"Произошла ошибка :("}</h1>;
	}
	return (
		<>
			<AppHeader />
			<div className="container">
				<section className={styles.wrapper}>
					{data ? (
						<>
							<BurgerIngridients data={data} />
							<BurgerConstructor data={data} />
						</>
					) : (
						<div>loading...</div>
					)}
				</section>
			</div>
		</>
	);
}

export default App;

import { IIngridient, IIngridientWithCount } from "./types";

export const calcTotalPrice = (ingridients: IIngridient[]) =>
	ingridients.reduce((prev, cur) => (prev += cur.price), 0);

export const getFullOrderIngridients = (
	ingredients: string[],
	fullIngridients: IIngridient[]
) => {
	return ingredients.map((i) => {
		if (!i) return null;
		const fullIngridient = fullIngridients.find((globalIngridient) => {
			return globalIngridient._id === i;
		});
		if (!fullIngridient) throw new Error(`ingrident is not found: ${i}`);
		return fullIngridient;
	}) as IIngridient[];
};

export const getIngridientsWithCount = (fullIngridients: IIngridient[]) => {
	let totalPrice = 0;
	const ingridientsWithCount = fullIngridients.reduce(
		(prev: { [name: string]: IIngridientWithCount }, cur: IIngridient) => {
			// считает общую сумму ингридиентов
			// eslint-disable-next-line react-hooks/exhaustive-deps
			totalPrice += cur.price;
			//
			return (prev[cur._id])
				? {
						...prev,
						[cur._id]: { ...prev[cur._id], count: prev[cur._id].count + 1 },
				  }
				: { ...prev, [cur._id]: { ingridient: cur, count: 1 } };
		},
		{}
	);
	return {
		ingridientsWithCount: Object.values(ingridientsWithCount),
		totalPrice,
	};
};

export const getDayMessage = (orderDate: Date, dateNow: Date): string => {
	const daysPast = Math.round(
		(dateNow.valueOf() - orderDate.valueOf()) / 1000 / 3600 / 24
	);

	const hours = orderDate.getHours();

	const minutesWithoutZero = orderDate.getMinutes();

	const minutes =
		minutesWithoutZero < 10
			? "0" + minutesWithoutZero.toString()
			: minutesWithoutZero.toString();

	if (daysPast === 0) return `Сегодня, ${hours}:${minutes}`;
	if (daysPast === 1) return `Вчера, ${hours}:${minutes}`;

	let dayMessage = "дней";
	let daysCopy = daysPast;
	daysCopy %= 100;
	if (daysCopy >= 5 && daysCopy <= 20) {
		dayMessage = "дней";
	}
	daysCopy %= 10;
	if (daysCopy === 1) {
		dayMessage = "день";
	}
	if (daysCopy >= 2 && daysCopy <= 4) {
		dayMessage = "дня";
	}

	return `${daysPast} ${dayMessage} назад, ${hours}:${minutes}`;
};

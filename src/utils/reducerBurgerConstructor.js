export default function reducer(state, action) {
	let accState = { ...state };

	// Устанавливаем булку и добовляем 2 таких булки в общие ингридиенты
	if (action.setBun) {
		const filtredOrderIngridients = accState.orderIngridients
			? accState.orderIngridients.filter((ingridient) => {
					if (ingridient.type === "bun") return false;
					return true;
			  })
			: [];
		accState = {
			...accState,
			orderIngridients: [
				...filtredOrderIngridients,
				{ ...action.setBun },
				{ ...action.setBun },
			],
			bun: action.setBun,
		};
	}

	// Добавляем ингридиенты
	if (action.setOrderIngridients) {
		accState = {
			...accState,
			orderIngridients: [
				...accState.orderIngridients,
				...action.setOrderIngridients,
			],
		};
	}

	// Вычисляем стоимость
	const totalPrice = accState.orderIngridients
		? accState.orderIngridients.reduce((prev, cur) => {
				return (prev += cur.price);
		  }, 0)
		: 0;

	return { ...accState, totalPrice };
}

import { useState, useEffect } from "react";

const useIngredientsFetch = (url) => {
	const [response, setResponse] = useState({ error: false, data: null });

	useEffect(() => {
		async function doFetch(url) {
			try {
				const res = await fetch(url);
				if (res.ok) {
					const json = await res.json();
					setResponse({ ...response, data: json.data });
				}
			} catch (e) {
				setResponse({ ...response, error: e });
			}
		}
		doFetch(url);
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [url]);
	return response;
};

export default useIngredientsFetch;

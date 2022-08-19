const error = new Error("Fetch error");

const requestToUrl = (url, options) => {
	return fetch(url, options)
		.then((res) => {
			if (res.ok) {
				return res.json();
			}
			throw error;
		})
		.then((responseData) => {
			if (responseData.success) {
				return responseData;
			}
			throw error;
		});
};



export { requestToUrl };

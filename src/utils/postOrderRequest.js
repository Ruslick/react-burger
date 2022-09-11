import { createAsyncThunk } from "@reduxjs/toolkit";
import { ORDERS_URL } from "./constants";
import { requestToUrl } from "./requests";

export const postOrderFetch = createAsyncThunk(
	"ingridients/postOrderFetch",
	async (_, { getState }) => {
		const orderIds = JSON.stringify({
			ingredients: getState().orderSlice.orderIngridients.map(
				(ingridient) => ingridient._id
			),
		});

		const options = {
      method: "POST",
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: orderIds
		};

		return await requestToUrl(
			ORDERS_URL,
			options
		)
	}
);
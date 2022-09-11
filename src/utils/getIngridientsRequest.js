import { createAsyncThunk } from "@reduxjs/toolkit"
import { INGRIDIENTS_URL } from "./constants"
import { requestToUrl } from "./requests"

export const getIngridientsFetch = createAsyncThunk(
  "ingridients/getIngridientsFetch", 
  async () => {
    return await requestToUrl(INGRIDIENTS_URL)
    .then((requestData) => requestData.data)
  })
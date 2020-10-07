import axios from "axios";
import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants/productConstants";

export const listProducts = () => async (dispatch) => {
  try {
    //set inital state and axios req
    dispatch({ type: PRODUCT_LIST_REQUEST });
    //get productsList JSON from API
    const { data } = await axios.get("/api/products");
    //set productList state in the store to the data we got from API
    dispatch({
      type: PRODUCT_LIST_SUCCESS,
      payload: data,
    });
  } catch (error) {
    //set payload to check for the generic error message and for the custom error message from errorHandler middleware
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.response.data.message
          ? error.response.data.message
          : error.message,
    });
  }
};

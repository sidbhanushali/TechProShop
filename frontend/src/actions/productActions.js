import axios from "axios";

import {
  PRODUCT_LIST_FAIL,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_REQUEST,
} from "../constants/productConstants";

//this action does what our useEffect does in the component
//think of these functions as action creators

//redux thunx (in our store) allows us to add a function after another function:
export const listProducts = () => async (dispatch) => {
  try {
    //set inital state with product list dispatch
    dispatch({ type: PRODUCT_LIST_REQUEST });
    //get productsList JSON from API
    const { data } = await axios.get("/api/products");
    //set productList state in the store to the data we got from API
    dispatch({ type: PRODUCT_LIST_SUCCESS, payload: data });
  } catch (error) {
    //set payload to check for the generic error message and for the custom error message from errorHandler middleware
    dispatch({
      type: PRODUCT_LIST_FAIL,
      payload:
        error.response && error.resonse.data.message
          ? error.resonse.data.message
          : error.message,
    });
  }
};

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
} from "../constants/productConstants.js";

//product list reducer -- handles the state for the product list on the homepage

//reducer takes in 2 things : the inital state and the action which we will create. We will dispatch an action to the reducer
export const productListReducer = (state = { products: [] }, action) => {
  //switch statement to evaluate the "type" in the action object
  switch (action.type) {
    //making the request
    case PRODUCT_LIST_REQUEST:
      return { loading: true, products: [] };

    //product list success - successful response
    case PRODUCT_LIST_SUCCESS:
      return { loading: false, products: action.payload };

    //product list fails -
    case PRODUCT_LIST_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

import {
  PRODUCT_LIST_REQUEST,
  PRODUCT_LIST_SUCCESS,
  PRODUCT_LIST_FAIL,
  PRODUCT_DETAILS_REQUEST,
  PRODUCT_DETAILS_SUCCESS,
  PRODUCT_DETAILS_FAIL,
  PRODUCT_DELETE_REQUEST,
  PRODUCT_DELETE_SUCCESS,
  PRODUCT_DELETE_FAIL,
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

// PRODUCT DETAILS REDUCER
export const productDetailsReducer = (
  state = { product: { reviews: [] } },
  action
) => {
  //switch statement to evaluate the "type" in the action object
  switch (action.type) {
    //making the request ->
    case PRODUCT_DETAILS_REQUEST:
      return { loading: true, ...state };

    //product DETAIL success - successful response
    case PRODUCT_DETAILS_SUCCESS:
      return { loading: false, product: action.payload };

    //product DETAIL fails -
    case PRODUCT_DETAILS_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

export const productDeleteReducer = (state = {}, action) => {
  switch (action.type) {
    case PRODUCT_DELETE_REQUEST:
      return { loading: true };
    case PRODUCT_DELETE_SUCCESS:
      //set success value to true bc nothings returning from server
      return { loading: false, success: true };
    case PRODUCT_DELETE_FAIL:
      return { loading: false, error: action.payload };
    default:
      return state;
  }
};

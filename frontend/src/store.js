import { createStore, combineReducers, applyMiddleware } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "redux-devtools-extension";
//reducers
import {
  productListReducer,
  productDetailReducer,
} from "./reducers/productReducers.js";

const reducer = combineReducers({
  productList: productListReducer,
  productDetails: productDetailReducer,
});

//loaded when redux initally loads
const initialState = {};

const middleware = [thunk];

const store = createStore(
  reducer,
  initialState,
  composeWithDevTools(applyMiddleware(...middleware))
);

export default store;

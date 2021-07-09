import {
  GET_PRODUCTS_FAIL,
  GET_PRODUCTS_REQUEST,
  GET_PRODUCTS_SUCCESS,
} from "../constants/productConstants";

export const getProductsAction = (data) => (dispatch) => {
  try {
    dispatch({ type: GET_PRODUCTS_REQUEST });
    const products = data;
    dispatch({ type: GET_PRODUCTS_SUCCESS, payload: products });
  } catch (error) {
    console.log(error.message);
    dispatch({
      type: GET_PRODUCTS_FAIL,
      payload: error.message,
    });
  }
};

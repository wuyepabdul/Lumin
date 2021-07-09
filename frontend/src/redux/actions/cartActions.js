import {
  ADD_TO_CART,
  CHANGE_CURRENCY,
  CHANGE_QUANTITY,
  REMOVE_FROM_CART,
} from "../constants/cartConstants";
import exchangeratesapi from "@ittkm/exchangeratesapi";

const API_KEY = process.env.REACT_APP_API_KEY;

export const addToCartAction = (product) => async (dispatch, getState) => {
  try {
    const cartItems = getState().cart.cartItems.slice();
    let alreadyExist = false;
    cartItems.forEach((item) => {
      if (item.id === product.id) {
        alreadyExist = true;
      }
    });

    if (alreadyExist) {
      const selectProduct = cartItems.find((item) => item.id === product.id);
      const itemIndex = cartItems.indexOf(selectProduct);
      const value = cartItems[itemIndex];
      value.qty = value.qty + 1;

      dispatch({ type: ADD_TO_CART, payload: { cartItems } });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } else {
      cartItems.push({ ...product });
    }
    dispatch({ type: ADD_TO_CART, payload: { cartItems } });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.log(error.message);
  }
};

export const removeFromCartAction = (product) => async (dispatch, getState) => {
  try {
    const cartItems = getState()
      .cart.cartItems.slice()
      .filter((item) => item.id !== product.id);

    dispatch({ type: REMOVE_FROM_CART, payload: { cartItems } });
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  } catch (error) {
    console.log(error.message);
  }
};

export const changeQuantityAction =
  (product, quantity) => (dispatch, getState) => {
    try {
      const cartItems = getState().cart.cartItems.slice();
      const selectProduct = cartItems.find((item) => item.id === product.id);
      const itemIndex = cartItems.indexOf(selectProduct);
      const value = cartItems[itemIndex];
      value.qty = quantity;

      dispatch({ type: CHANGE_QUANTITY, payload: { cartItems } });
      dispatch({ type: ADD_TO_CART, payload: { cartItems } });
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    } catch (error) {
      console.log(error.message);
    }
  };

export const changeCurrencyAction =
  (toCurrency) => async (dispatch, getState) => {
    try {
      const api = new exchangeratesapi(API_KEY);
      const cartItems = getState().cart.cartItems.slice();

      cartItems.forEach((item) => {
        const convertParameters = {
          base: "NGN",
          from: "NGN",
          to: `${toCurrency}`,
          amount: item.price,
        };

        api.convert(convertParameters).then((response) => {
          console.log("response", response);
          item.convertedPrice = response.result;
          item.convertedCurrency = response.query.to;
          dispatch({ type: ADD_TO_CART, payload: { cartItems } });
          dispatch({ type: CHANGE_CURRENCY, payload: { cartItems } });
          localStorage.setItem("cartItems", JSON.stringify(cartItems));
        });
      });
    } catch (error) {
      console.log(error.message);
    }
  };

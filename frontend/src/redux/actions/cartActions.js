import {
  ADD_TO_CART,
  CHANGE_QUANTITY,
  REMOVE_FROM_CART,
} from "../constants/cartConstants";

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

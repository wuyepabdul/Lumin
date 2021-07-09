import {
  ADD_TO_CART,
  CHANGE_CURRENCY,
  DECREASE_QUANTITY,
  GET_TOTALS,
  INCREASE_QUANTITY,
  REMOVE_FROM_CART,
} from "../constants/cartConstants";

export const cartReducer = (state = { cartItems: [] }, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      return { cartItems: action.payload.cartItems };

    case REMOVE_FROM_CART:
      return { cartItems: action.payload.cartItems };

    case INCREASE_QUANTITY:
      return { cartItems: action.payload.cartItems };

    case DECREASE_QUANTITY:
      return { cartItems: action.payload.cartItems };

    case GET_TOTALS:
      return { cartItems: action.payload.cartItems };

    case CHANGE_CURRENCY:
      return { cartItems: action.payload.cartItems };

    default:
      return state;
  }
};

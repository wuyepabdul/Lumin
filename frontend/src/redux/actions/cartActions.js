import { ADD_TO_CART, REMOVE_FROM_CART } from "../constants/cartConstants";

export const addToCartAction = (product) => async (dispatch, getState) => {
  try {
    dispatch({
      type: ADD_TO_CART,
      payload: product,
    });

    localStorage.setItem("cartItems", JSON.stringify(product));
  } catch (error) {
    console.log("addToCartAction Error,", error.message);
  }
};

/* export const removeItemFromCartAction =(productId) =>(dispatch,getState)=>{
try {
  
} catch (error) {
  
}
} */

export const removeFromCartAction =
  (productId) => async (dispatch, getState) => {
    try {
      const cartItems = getState().cartItems;
      console.log(typeof cartItems);
      const filteredItems = cartItems.filter((item) => item.id !== productId);
      dispatch({ type: REMOVE_FROM_CART, payload: filteredItems });
      localStorage.setItem("cartItems", JSON.stringify(filteredItems));
    } catch (error) {
      console.log("removeFromCartAction Error", error.message);
    }
  };

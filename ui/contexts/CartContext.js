import React, { createContext, useReducer, useEffect, useContext } from "react";

const CartContext = createContext();

// Functions for the shopping cart
const reducer = (cart, action) => {
  const item = action.item;
  switch (action.type) {
    case "ADD_ITEM":
      var addExist = cart.find((cart) => cart.id === action.item.id);
      if (addExist) {
        return cart.map((x) =>
          x.id === item.id ? { ...addExist, qty: addExist.qty + 1 } : x
        );
      } else {
        return [...cart, { ...item, qty: 1 }];
      }
    case "SUBTRACT_ITEM":
      var removeExist = cart.find((cart) => cart.id === action.item.id);
      if (removeExist.qty === 1) {
        return cart.filter((x) => x.id !== item.id);
      } else {
        return cart.map((x) =>
          x.id === item.id ? { ...removeExist, qty: removeExist.qty - 1 } : x
        );
      }
    case "REMOVE_ITEM":
      return cart.filter((x) => x.id !== item.id);
    case "ADD_ADDRESS":
      return cart;

    case "INIT":
      return action.value;
    case "CLEAR_CART":
      return [];
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

// Handle all Cart functions in a handy provider. initalized in _app.js
export const CartProvider = ({ children }) => {
  const [cart, cartDispatch] = useReducer(reducer, []);
  useEffect(() => {
    const localCart = JSON.parse(localStorage.getItem("cart"));
    if (localCart && localCart.length > 0) {
      cartDispatch({
        type: "INIT",
        value: JSON.parse(localStorage.getItem("cart")),
      });
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  }, [cart]);

  return (
    // <CartDispatchContext.Provider value={dispatch}>
    <CartContext.Provider value={{ cart, cartDispatch }}>
      {children}
    </CartContext.Provider>
  );
};

// Export the context for easy use in pages & components
export const useCartContext = () => useContext(CartContext);

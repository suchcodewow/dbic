import { createContext, useReducer, useEffect } from "react";
import { CartReducer } from "contexts/CartReducer";

const CartContext = createContext();

export const CartProvider = ({ props }) => {
  const [cart, dispatch] = useReducer(CartReducer, [], () => {
    const localData = localStorage.getItem("cart");
    return localData ? JSON.parse(localData) : [];
  });
  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);
  return (
    <CartContext.Provider value={{ cart, dispatch }}>
      {props.children}
    </CartContext.Provider>
  );
};

export default CartProvider;

import { createContext, useReducer, useMemo, useContext } from "react";

const CartContext = createContext();
const CartDispatchContext = createContext();

const reducer = (state, action) => {
  const item = action.item;
  switch (action.type) {
    case "ADD_ITEM":
      const addExist = state.find((state) => state.id === action.item.id);
      if (addExist) {
        return state.map((x) =>
          x.id === item.id ? { ...addExist, qty: addExist.qty + 1 } : x
        );
      } else {
        return [...state, { ...item, qty: 1 }];
      }
    case "SUBTRACT_ITEM":
      const removeExist = state.find((state) => state.id === action.item.id);
      if (removeExist.qty === 1) {
        return state.filter((x) => x.id !== item.id);
      } else {
        return state.map((x) =>
          x.id === item.id ? { ...removeExist, qty: (removeExist.qty = 1) } : x
        );
      }
    case "REMOVE_ITEM":
      return state.filter((x) => x.id !== item.id);
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};
export const CartProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, []);

  return (
    <CartDispatchContext.Provider value={dispatch}>
      <CartContext.Provider value={state}>{children}</CartContext.Provider>
    </CartDispatchContext.Provider>
  );
};

export const useCartContext = () => useContext(CartContext);
export const useCartDispatchContext = () => useContext(CartDispatchContext);

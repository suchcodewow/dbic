export const initialState = [];

export const CartReducer = (state, action) => {
  switch (action.type) {
    case "ADD_ITEM":
      console.log(state);
      return state;
    //   const exist = state.find((state) => state.id === action.item.id);
    //   if (exist) {

    //   }
    //   const onAdd = (product) => {
    //     const exist = cartItems.find((x) => x.id === product.id);
    //     if (exist) {
    //       setCartItems(
    //         cartItems.map((x) =>
    //           x.id === product.id ? { ...exist, qty: exist.qty + 1 } : x
    //         )
    //       );
    //     } else {
    //       setCartItems([...cartItems, { ...product, qty: 1 }]);
    //     }
    //   };
    //   return [
    //     ...state,
    //     {
    //       title: action.book.title,
    //       author: action.book.author,
    //       id: uuid(),
    //     },
    //   ];
    // case "REMOVE_ITEM":
    //   return state.filter((book) => book.id !== action.id);
    // case "REDUCE_ITEM":
    //   // add option to lower quantiy
    //   return state.filter((book) => book.id !== action.id);
    default:
      return state;
  }
};

import React, { createContext, useReducer, useEffect, useContext } from "react";

const UserContext = createContext();

// User related functions
const reducer = (user, action) => {
  const item = action.item;
  switch (action.type) {
    case "LOGIN":
      const addExist = user.find((user) => user.id === action.item.id);
      if (addExist) {
        return user.map((x) =>
          x.id === item.id ? { ...addExist, qty: addExist.qty + 1 } : x
        );
      } else {
        return [...user, { ...item, qty: 1 }];
      }
    case "LOGOUT":
      const removeExist = user.find((user) => user.id === action.item.id);
      if (removeExist.qty === 1) {
        return user.filter((x) => x.id !== item.id);
      } else {
        return user.map((x) =>
          x.id === item.id ? { ...removeExist, qty: removeExist.qty - 1 } : x
        );
      }
    case "INIT":
      return action.value;
    default:
      throw new Error(`Unknown action: ${action.type}`);
  }
};

// Handle all user functions in a handy provider. initalized in _app.js
export const userProvider = ({ children }) => {
  const [user, userDispatch] = useReducer(reducer, []);
  useEffect(() => {
    const localuser = JSON.parse(localStorage.getItem("user"));
    if (localuser && localuser.length > 0) {
      userDispatch({
        type: "INIT",
        value: JSON.parse(localStorage.getItem("user")),
      });
    }
  }, []);
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("user", JSON.stringify(user));
    }
  }, [user]);
  return (
    // <userDispatchContext.Provider value={dispatch}>
    <UserContext.Provider value={{ user, userDispatch }}>
      {children}
    </UserContext.Provider>
  );
};

// Export the context for easy use in pages & components
export const useUserContext = () => useContext(UserContext);
